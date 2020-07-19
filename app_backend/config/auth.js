module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        console.log("You need to be logged in to see this page");
        res.json({ errorMessage: "You need to be logged in to see this page" });
        // res.redirect('http://localhost:3000/?#/home_page');
        // maybe redirect?
    }
}