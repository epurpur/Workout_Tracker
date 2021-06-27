// Dependencies
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');


// Set up and connect to MongoDB with Mongoose extension. 
// Database is called 'workout'
// Database schema is in /models directory
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
// app.use(require('./routes/api.js'));
// app.use(require('./routes/view.js'));



app.listen(PORT, () =>{
    console.log(`App running on port ${PORT}!`);
});
