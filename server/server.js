const path = require('path');
const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');

const publicPath = path.join(__dirname,'..','public');
// const port = process.env.PORT || 3000;
// Create a new Express application
const app = express();

// Replace with your mongoLab URI
const MONGO_URI = 'mongodb://xxxxxxxxx';

// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose.Promise = global.Promise;

// Connect to the mongoDB instance and log a message
// on success or failure
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    url: MONGO_URI,
    autoReconnect: true
  })
}));

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  // res.sendFile(path.join(publicPath,'dist','index.html'));
  res.sendFile(path.join(publicPath,'index.html'));
  // console.log('publicPath', publicPath);
});

// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and
// a single bundle.js output of all of our client side Javascript

// comment out on Mar 7 2018 for production deployment
// const webpackMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
