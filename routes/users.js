var express = require('express');
var router = express.Router();

var passport = require('passport'),
    LocalStrategy = require('passport-local');

var app = express();

var mongoose = require('mongoose/');

var Schema = mongoose.Schema;
var UserDetail = new Schema({
    username: String,
    password: String
}, {
    collection: 'userInfo'
});

var UserDetails = mongoose.model('userInfo', UserDetail);

passport.use(new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {
        UserDetails.findOne({
            'username': username,
        }, function(err, user) {
            if (err) { return done(err); }

            if (!user) {
                return done(null, false);
            }

            if (user.password != password) {
                return done(null, false);
            }

            return done(null, user);
        });
    });
}));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
