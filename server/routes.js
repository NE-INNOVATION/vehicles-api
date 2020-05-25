const express = require('express')
const bodyParser = require('body-parser')
const { route } = require('./api')
const dataStore = require('./data/dataStore')
const health = require('@cloudnative/health-connect')

const healthcheck = new health.HealthChecker()

module.exports = () => {
  
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
  app.use('/api', route)
  dataStore.createDbConnection()
  
  return app; 
}