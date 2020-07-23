const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { ensureAuthenticated } = require('../config/auth');

const Users = require('../models/Users');

// Registration

router.post('/SignUp', (req, res) => {
    const { email, password, password2, first_name, last_name } = req.body;
    // check all inputs are filled
    if (!email || !password || !password2 || !first_name || !last_name){
        res.json({ errorMessage: "Please enter all fields before submitting." });
    }

    // check if passwords are correct
    else if (password !== password2){
        res.json({ errorMessage: "Passwords do not match." });
    }
    
    else{
        Users.findOne({ email: email })
            .then((user) => {
                // check if email is already registered
                if (user){
                    return res.json({ errorMessage: "Error! That email is already in use." });
                }
                // good to create new account
                else{
                    const newUsers = new Users(
                        {
                            email,
                            password,
                            first_name,
                            last_name,
                            stocks: []
                        }
                    );
                    console.log(newUsers);
                    // encrypt password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUsers.password, salt, (err, hash) => {
                            if (err) {
                                console.log(err);
                            }
                            else{
                                newUsers.password = hash;
                                // Saving user w/encrypted password to db
                                newUsers.save()
                                    .catch(err => console.log(err));
                            }
                        });
                    })
                }
               
            })
    }

})

// Sign In

router.post('/SignIn', function(req, res, next) {
    // check if any fields are empty; return an error message
    const {email, password} = req.body;
    if (!email || !password){
        return res.json({ errorMessage: "You must enter an email and password." });
    }

    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.json({ errorMessage: "Wrong username and/or password." }); }
      req.logIn(user, function(err) {
        if (err) { return next(err); }        
      });
    })(req, res, next);
  });

// Log Out

router.get('/logout', (req, res) => {
    if (req.user){
        req.logout();
        console.log("You are logged out.");
        res.json({ message: "You are now logged out." });
    }
    else{
        console.log("You were never logged in the first place")
        res.json({ errorMessage: "You were never logged in the first place" });
    }
    
})

router.get('/isLoggedIn', (req, res) => {
    if (req.user){
        return res.json({ first_name: req.user.first_name });
    }
    return res.json({ first_name: "" });
})



module.exports = router;


