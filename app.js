const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('./middleware/error');
const bodyParser = require('body-parser');


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Importing the route
const profile = require("./routes/userRoute");

app.use("/", profile);

//middleware for error
app.use(errorHandler);

module.exports = app;