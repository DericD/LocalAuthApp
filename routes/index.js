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

router.get('/signup', function(req, res) {
    res.render('signup', { title: 'Express' });
});

router.get('/loginSuccess', function(req, res) {
    res.render('loginSuccess', { title: 'Express' });
});


router.get('/loginFailure', function(req, res) {
    res.render('loginFailure', { title: 'Express' });
});

router.post('/login',
    passport.authenticate('local-login', { successRedirect: '/loginSuccess',
                                     failureRedirect: '/loginFailure'
    })
);

router.post('/signup',
    passport.authenticate('local-signup', {successRedirect : '/',
                                           failureRedirect : '/signup'
}));

router.get('/profile', /*isLoggedIn,*/ function(req, res) {
    res.render('profile', {
        user : req.user
    });
});

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) {
        console.log('Test Worked');
        return next();
    }
    else {
        console.log('Test Failed!');
        res.redirect('/loginFailure');
    }
};

module.exports = router;
