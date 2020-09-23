/************************** Module ****************************/
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var cors = require("cors");
const jwt = require('jsonwebtoken');

/************************** MidlleWare ****************************/
app.use(express.urlencoded({ extended: false }));
// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });
// CORS middleware
app.use(cors());
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', '*');
  next();
}

app.use(allowCrossDomain)

/************************** connection mysql ****************************/
const connection = require('./src/database/mysql')
connection.connect();

/************************** Routes ****************************/
require("./src/routes/routes")(app, connection);

//connection.end();

app.listen(3000, function() {
  console.log("server listening on: http://localhost:3000/sign-up");
});
