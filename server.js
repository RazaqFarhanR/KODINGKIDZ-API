const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();
require('./src/config/sequelize');

const publicRoute = require('./src/routes/public');
const adminRoute = require('./src/routes/admin');
const studentRoute = require('./src/routes/student');
const courseRoute = require('./src/routes/course');
const lessonRoute = require('./src/routes/lesson')
const authUser = require("./src/middleware/authUser");

// Set the port number
const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.static(__dirname))
app.use(bodyParser.json())

app.use('/api', publicRoute)
app.use('/api/admin', authUser, adminRoute)
app.use('/api/student', authUser, studentRoute)
app.use('/api/course', authUser, courseRoute)
app.use('/api/lesson', authUser, lessonRoute)

app.listen(PORT,() =>{
  console.log('server run on port ' + PORT)
})