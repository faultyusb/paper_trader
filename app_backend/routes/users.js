const express = require('express');
const router = express.Router();


router.get('/signup', (req, res)=>{
    res.json({ message: "Hello!" });
})

router.post('/signup', (req, res)=>{
    const { email, first_name, last_name } = req.body;
    console.log(email);
    res.json({ message: "Hello!" });
})



module.exports = router;