// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const apivideos = require('./routes/api/api.videos');
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.ifpkz.mongodb.net/testDB?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})  .catch((err)=>{
    console.error(`database connection error: ${err}`);
    process.exit();
});

// initialize express
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

// set up routes and routers
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use('/api/videos', apivideos);

// catch any remaining routing errors
app.use((req, res, next)=>{
    const err = new Error('Not Found' + req.url);
    err.status = 404;
    next(err);
});
module.exports = app;
