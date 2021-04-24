const express = require("express")

const app = express()
const mocklayer = require("./routes/layer")
const config = require('./config.js');


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
/**
 * ideally api,httpd should be separated as a microservice, 
 * implementing this only for simplicity 
 */
app
    .use("/", mocklayer) // truelayer does not seem to callback outside of root
    .use("/api", mocklayer)
    .listen(config.sys.port, () => {console.log("[Serving API]")})
	
