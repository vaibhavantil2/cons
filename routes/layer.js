const express = require("express")
const router = express.Router()

const fetch = require('node-fetch');
const request = require('request');

const async =  require('async');

const client_id = "sandbox-cons-f315b7"
const client_secret = "c9ca698e-ab6f-47c3-b38b-dc32e8e103c2"

router.get("/callback", async(req,res)=>{
    
    var options = {
        'method': 'POST',
        'url': 'https://auth.truelayer-sandbox.com/connect/token',
        'headers': {
        },
        form: {
          'grant_type': 'authorization_code',
          'client_id': client_id,
          'client_secret': client_secret,
          'redirect_uri': 'http://13.228.29.251:8080/api/callback',
          'code': req.query.code
        }

      };
    request(options, function (error, response) {
    
    if (error) throw new Error(error);
    let token = JSON.parse(response.body)

    console.log("callback",token)

    return res.redirect("/?access_token="+token.access_token)
    });

});
router.get("/cards/transactions/:token/:id", async (req,res)=>{ 

    var request = require('request');
    var options = {
    'method': 'GET',
    'url': 'https://api.truelayer-sandbox.com/data/v1/cards/'+req.params.id+'/transactions',
    'headers': {
        'Authorization': 'Bearer '+req.params.token
    }
    };
    request(options, function (error, response) {
    if (error) throw new Error(error);
      
        let e = JSON.parse(response.body)
        console.log(e.results)
        return res.status(200).send({'status':1,'results':e.results})

    });

})

router.get("/cards/:token", async (req,res)=>{ 

    var request = require('request');
    var options = {
      'method': 'GET',
      'url': 'https://api.truelayer-sandbox.com/data/v1/cards',
      'headers': {
        'Authorization': 'Bearer '+req.params.token
      }
    };

    request(options, function (error, response) {
      if (error) throw new Error(error);
      
      let e = JSON.parse(response.body)
      console.log(e.results)
      return res.status(200).send({'status':1,'results':e.results})

    });
    
})

module.exports = router

