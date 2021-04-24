const express = require("express")
const router = express.Router()

const fetch = require('node-fetch');
const request = require('request');

const async =  require('async');

const client_id = "sandbox-cons-f315b7"
const client_secret = "c9ca698e-ab6f-47c3-b38b-dc32e8e103c2"

const config = require('../config.js');


const isValidToken = (token)=>{
  // preseting conditions here for valid token; also could be used as a routine to renew token if neccessary 

  if (token=='null' || !token) {
    //console.log('here',token)
    return false
    }
  
  return true
}

router.get("/authorize", async(req,res)=>{
  console.log(config.app)
  base = (config.app.authURI
      .replace('{client_id}',config.app.client_id))
      .replace('{redirect_uri}',config.app.redirect)

      // authentication link
  return res.status(200).send({'status':1,'url':config.app.authURL+base})

});

router.get("/callback", async(req,res)=>{

    console.log('[Application]  Sending authentication request')

    var options = {
        'method': 'POST',
        'url': config.app.authURL+'connect/token',
        'headers': {
        },
        form: {
          'grant_type': 'authorization_code',
          'client_id': config.app.client_id,
          'client_secret': config.app.client_secret,
          'redirect_uri': config.app.redirect,
          'code': req.query.code
        }
      };

    console.log(options)
    request(options, function (error, response) {

      //console.log('[Application]  authentication response',response)

      if (error) {
        console.log('Error]',error,response.body)
        // // return res.redirect("/generrorpage.html")
      }

      let token = JSON.parse(response.body)

      console.log('[Application]  token received')

      if (token.error) {
        console.log('[Issue] ',token)
        // investigate: 
        // a few moments ago there was error on user but for some reason without changing anything 
        // issue is gone. 
        // return res.redirect('/generrorpage.html')
      } else {
        return res.redirect(config.app.httpd+"?access_token="+token.access_token)
      }
    
    });

});

router.get("/cards/transactions/:token/:id", async (req,res)=>{ 

  
  if ( !isValidToken(req.params.token)) {
    console.log('[Issue] Token invalid',req.params.token);
    // // return res.redirect("/generrorpage.html");
  }

  console.log('[Application]  query card transaction(s)',response)

  var request = require('request');

    var options = {
    'method': 'GET',
    'url': config.app.authURL+'data/v1/cards/'+req.params.id+'/transactions',
    'headers': {
        'Authorization': 'Bearer '+req.params.token
    }
    };

    request(options, function (error, response) {
        if (error) {
          console.log('[Error]',error)
          // // return res.redirect("/generrorpage.html")
        }
      
        try {
          let e = JSON.parse(response.body)
          console.log('[Application]  query card received')
          console.log(e.results)
          return res.status(200).send({'status':1,'results':e.results})  
        } catch(e) {
          console.log('[Issue]',e)
          return res.status(200).send({'status':0,'results':e})
        }

    });

})


router.get("/cards/:token", async (req,res)=>{ 
  
    if ( !isValidToken(req.params.token)) {
      console.log('[Issue] Token invalid',req.params.token);
      // // return res.redirect("/generrorpage.html");
    }

    console.log('[Application]  query card(s)')

    var request = require('request');
    var options = {
      'method': 'GET',
      'url': config.app.authURL+'data/v1/cards',
      'headers': {
        'Authorization': 'Bearer '+req.params.token
      }
    };

    console.log(' ...',options)

    request(options, function (error, response) {
      
      if (error) {
        console.log('[Error]',error)
        // // return res.redirect("/generrorpage.html")
      }
    
      try {
        let e = JSON.parse(response.body)

        console.log('[Application]  ... received')
        console.log(e.results)
        return res.status(200).send({'status':1,'results':e.results})

      } catch(e) {

        console.log('[Issue]',e)
        return res.status(200).send({'status':0,'results':{}})
      }

    });
    
})

module.exports = router

