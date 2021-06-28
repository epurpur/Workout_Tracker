// Dependencies
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');


// Setup Mongo database and Schema. Database is called 'workout'
// Running Mongoose on top of Mongo to create DB Schema
const db = require('./models');


mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout' , 
    {   
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true,
     useFindAndModify: false
    });


// Setup Express server
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(compression());


// Routes
app.use(require('./routes/apiRoutes.js'));
app.use(require('./routes/htmlRoutes.js'));


// Run server
app.listen(PORT, () =>{
    console.log(`Workout Tracker app running on port ${PORT}!`);
});
