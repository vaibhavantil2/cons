const sysport = 3000
const config = {
    sys: {
        port:sysport
    },
    live: {
      client_id: 'cons-f315b7',
      client_secret: '98f71940-a3f9-4683-b47c-9188e3e8bb9e',
      authURL: 'https://auth.truelayer.com/',
      authURI: '?response_type=code&client_id={client_id}&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri={redirect_uri}&providers=uk-ob-all%20uk-oauth-all',
      redirect: 'http://13.212.84.244:'+sysport+'/callback'
      //13.212.84.244
    },
    sandbox: {
        client_id: 'sandbox-cons-f315b7',
        client_secret: '98f71940-a3f9-4683-b47c-9188e3e8bb9e',
        authURL: 'https://auth.truelayer-sandbox.com/',
        authURI: '?response_type=code&client_id={client_id}&scope=info%20accounts%20balance%20cards%20transactions%20direct_debits%20standing_orders%20offline_access&redirect_uri={redirect_uri}&providers=uk-ob-all%20uk-oauth-all%20uk-cs-mock',
        redirect: 'http://localhost:'+sysport+'/callback'

  
    },

};
config.app = config.live
module.exports = config;
