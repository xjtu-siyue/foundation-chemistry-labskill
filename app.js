var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/foundation-chemistry-labskill');
var session = require('express-session');
var routes = require('./routes/index');
var fs = require('fs');
var invitation_code = fs.readFileSync('./invitation.config');
var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'FCLSP_SECRET_KEY',
    key: 'SessionId',
    resave: false,
    saveUninitialized: true,
}));
app.use(function(req, res, next){
    req.body.theCode = invitation_code;
    next();
});
app.use('/', routes);
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;
