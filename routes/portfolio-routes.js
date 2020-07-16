const express = require('express');
const router = express.Router();

router.get('/login', (req, res)=>{
    console.log('Get Request for portfolios');
    res.json({ message: "Test123" });
})

router.post('/signup', (req, res) => {
    const {email, first_name, last_name, password1, password2} = req.body;

    // make sure all fields are entered
    if (
        !email || !first_name || !last_name || !password1 || !password2
    ){
        return res.json({ message: "Please enter all fields" });
    }
    
    if (password1 !== password2){
        return res.json({ message: "Passwords do not match." });
    }

    res.json({ message: `Sucessfully logged in. Welcome, ${first_name}` });


})



module.exports = router; 