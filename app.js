const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const app = express();
var session = require('express-session')
const port = 3000;
const {createUser} = require('./controllers/user');
var User = require('./models/User.model');

var db =  'mongodb://localhost:27017/login-with-linkdin';

mongoose.connect(db, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }); 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

let SuccessData;
passport.use(new LinkedInStrategy({
  clientID: '81ebo5bnln4jke',
  clientSecret: 'IDvk2BERBh6c6FMw',
  callbackURL: "http://10.0.2.2:3000/auth/linkedin/callback",
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function(accessToken, refreshToken, profile, done) {
  // asynchronous verification, for effect...
  process.nextTick(function () {
    // To keep the example simple, the user's LinkedIn profile is returned to
    // represent the logged-in user. In a typical application, you would want
    // to associate the LinkedIn account with a user record in your database,
    // and return that user instead.
    SuccessData = profile
    return done(null, profile);
  });
}));


app.get('/auth/linkedin',
  passport.authenticate('linkedin', { state: 'SOME STATE'  }),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });


app.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

  app.get('/login', (req, res) => {
    res.send('Welcome to login url')
  });
  

app.get('/', (req, res) => {
  if(SuccessData !== null) {
    res.send(SuccessData)
  } else{
    res.send('Nahi Ho Payega Bhai')
  }
});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))


