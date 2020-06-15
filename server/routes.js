const express = require('express')
const bodyParser = require('body-parser')
const { route } = require('./api')
const dataStore = require('./data/dataStore')
const OktaJwtVerifier = require('@okta/jwt-verifier');
const config = require('./authConfiguration.js');
const health = require('@cloudnative/health-connect')

const healthcheck = new health.HealthChecker()

module.exports = () => {

  const authEnabled = process.env.AUTH_ENABLED;
  const oktaJwtVerifier = new OktaJwtVerifier({
    clientId: config.server.oidc.clientId,
    issuer: config.server.oidc.issuer,
    assertClaims: config.server.assertClaims
  })

  function authenticationRequired(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
      res.status(401);
      return next('Unauthorized');
    }

    const accessToken = match[1];
    const audience = config.server.assertClaims.aud;
    return oktaJwtVerifier.verifyAccessToken(accessToken, audience)
      .then((jwt) => {
        req.jwt = jwt;
        next();
      })
      .catch((err) => {
        res.status(401).send(err.message);
      });
  }

  const app = express()
  app.set('json-spaces', 2)
  app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  app.use('/live', health.LivenessEndpoint(healthcheck))
  app.use('/ready', health.ReadinessEndpoint(healthcheck))
  app.use('/health', health.HealthEndpoint(healthcheck))

  app.use(bodyParser.json())
  if (authEnabled) {
    app.use('/api', authenticationRequired, route)
  } else {
    app.use('/api', route)
  }
  dataStore.createDbConnection()

  return app;
}