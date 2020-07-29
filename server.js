const express = require("express");
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const app = express();

// importing passport
require('./config/passport')(passport);


// init express-session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Body parser
app.use(express.json());

// Init MongoDB connection
const db = require('./config/mongokey').MongoKey;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/', require('./routes/users')); //Login/Sign Up Routes
app.use('/', require('./routes/portfolio')); // Portfolio Routes

const path = require('path');
// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));