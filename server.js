const express = require('express');

// init App
const app = express();

// Bodyparser
// app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Routes
app.use('/', require('./routes/portfolio-routes'));



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}.`));