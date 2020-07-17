module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()){
            return next();
        }
        console.log("You need to be logged in to see this page");
        // maybe redirect?
    }
}