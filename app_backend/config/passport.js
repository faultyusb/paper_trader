const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Users = require('../models/Users');




module.exports = function(passport) {
    passport.use(
       new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
           // Find the user in the db
           Users.findOne({ email: email })
            .then(user => {
                // user doesn't exist
                if (!user){
                    return done(null, false, { message: "Email does not exist." });
                }

                // Verify password

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) {
                        console.log(err);
                    }
                    if (isMatch){
                        return done(null, user, { message: "Password credentials match!" });
                    }
                    else{
                        return done(null, false, { message: "Password does not match" });
                    }
                })

            })
            .catch(err => console.log(err));

        })
    );
    // sets session upon login
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err, user) {
          done(err, user);
        });
      });
}