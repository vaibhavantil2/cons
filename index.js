const express = require("express")

const app = express()
const mocklayer = require("./routes/layer")

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
/**
 * ideally api,httpd should be separated as a microservice, 
 * implementing this only for simplicity 
 */
app
    .use("/api", mocklayer)
	.use(express.static('public'))
	.listen(8080, () => {console.log("[Serving webpage]")})
	
