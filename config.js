const sysport = 3000
const config = {
    sys: {
        port:sysport
    },
    live: {
      client_id: 'cons-f315b7',
      client_secret: '41af3630-0022-496e-b93d-bd4cee90d8c8',
      authURL: 'https://auth.truelayer.com/',
      authURI: '?response_type=code&client_id={client_id}&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri={redirect_uri}&providers=uk-ob-all%20uk-oauth-all',
      redirect: 'http://localhost:'+sysport+'/callback'
    },
    sandbox: {
        client_id: 'sandbox-cons-f315b7',
        client_secret: '41af3630-0022-496e-b93d-bd4cee90d8c8',
        authURL: 'https://auth.truelayer-sandbox.com/',
        authURI: '?response_type=code&client_id={client_id}&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri={redirect_uri}&providers=uk-ob-all%20uk-oauth-all',
        redirect: 'http://localhost:'+sysport+'/callback'
        //13.212.84.244
  
    },

};
config.app = config.live
module.exports = config;
