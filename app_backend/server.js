const express = require("express");
const mongoose = require('mongoose');

const app = express();

// Body parser
app.use(express.json());

// Init MongoDB connection
// const db = require('./config/keys').MongoKey;
// mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(()=>console.log('MongoDO connected'))
//     .catch(err => console.log(err));


app.use('/', require('./routes/users'));




const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));