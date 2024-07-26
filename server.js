const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();
require('./src/config/sequelize');

// Set the port number
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.static(__dirname))
app.use(bodyParser.json())

app.listen(PORT,() =>{
  console.log('server run on port ' + PORT)
})