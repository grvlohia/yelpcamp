var express = require('express'),
    router = express.Router(),
    User = require("../models/user"),
    passport = require('passport');

// root route
router.get('/', (req, res) => {
    // console.log(res.locals);
    res.render('landing');
});


// ============================================================================
// AUTH ROUTES
// ============================================================================
router.get("/register", (req, res) => {
    res.render("register");
});

//handle sign up logic
router.post("/register", (req, res) => {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            req.flash("error", err.message);
            console.log(err);
            return res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, () => {
                req.flash("success", "Welcome to YelpCamp" + user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

// show login form
router.get("/login", (req, res) => {
    res.render("login");
});

// handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {
});

// logout route
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/campgrounds");
});

module.exports = router;