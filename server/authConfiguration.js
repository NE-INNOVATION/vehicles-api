var ISSUER = process.env.ISSUER;
var CLIENT_ID = process.env.CLIENT_ID;

module.exports = {
  server: {
    oidc: {
      clientId: CLIENT_ID,
      issuer: ISSUER
    },
    assertClaims: {
      aud: 'api://default',
      cid: CLIENT_ID
    }
  }
};