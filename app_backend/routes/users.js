const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');

const Users = require('../models/Users');

// Registration

router.post('/SignUp', (req, res) => {
    const { email, password, password2, first_name, last_name } = req.body;
    // check all inputs are filled
    if (!email || !password || !password2 || !first_name || !last_name){
        res.json({ message: "Please enter all fields before submitting." });
    }

    // check if passwords are correct
    else if (password !== password2){
        res.json({ message: "Passwords do not match." });
    }
    
    else{
        Users.findOne({ email: email })
            .then((user) => {

                // check if email is already registered
                if (user){
                    return res.json({ message: "Error! That email is already in use." });
                }

                // good to create new account
                else{
                    const newUsers = new Users(
                        {
                            email,
                            password,
                            first_name,
                            last_name
                        }
                    );
                    console.log(newUsers);
                    res.send('Hello');

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

router.post('/SignIn', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home_page',
        failureRedirect: '/SignIn',
        message: "Failed to sign in"
    })(req, res, next);
})




module.exports = router;