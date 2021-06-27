// Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression")


// Port
const PORT = process.env.PORT || 3000;

// Initalize Express
const app = express();

// Require models folder for the database
const db = require("./models");

// Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(compression());

// Connect to DB with Mongoose
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout' , 
    { 
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
     useFindAndModify: false
});


// Routes
// app.use(require('./routes'));

// Start server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });