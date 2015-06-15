var express = require('express');
var router = express.Router();

var passport = require('passport'),
    LocalStrategy = require('passport-local');

var app = express();

var mongoose = require('mongoose/');

var Schema = mongoose.Schema;
var UserDetail = new Schema({
    name: String,
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date }, {
    collection: 'userInfo'
});

var UserDetails = mongoose.model('userInfo', UserDetail);

passport.use('local-signup', new LocalStrategy(function(req, username, password, done) {
        process.nextTick(function() {
            UserDetails.findOne({"username": username}, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (user) {
                    return done(null, false);
                } else {
                    var newUser = new UserDetails();

                    newUser.username = username;
                    newUser.password = password;
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser)
                    })
                }
            });
        });
}));

passport.use('local-login', new LocalStrategy(function(username, password, done) {
    process.nextTick(function() {
        UserDetails.findOne({'username': username}, function(err, user) {
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
