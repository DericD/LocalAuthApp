var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

var app = express();

var passport = require('passport'),
    LocalStrategy = require('passport-local');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Express' });
});

router.get('/loginSuccess', isLoggedIn, function(req, res) {
    res.render('loginSuccess', { title: 'Express' });
});


router.get('/loginFailure', function(req, res) {
    res.render('loginFailure', { title: 'Express' });
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/loginSuccess',
                                     failureRedirect: '/loginFailure'
    })
);

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/loginFailure');
}


//app.get('/loginFailure', function(req, res, next) {
//  res.send('Failed to Redirect');
//  console.log('Returning login failure');
//});

//app.get('/loginSuccess', function(req, res, next) {
//  res.send('Successfully authenticated');
//});

module.exports = router;
