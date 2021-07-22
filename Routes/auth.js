const authController = require("../Controller/authcontroller");

module.exports = function(app, passport) {
    app.post("/signup", passport.authenticate("local-signup"),function(req,res) {
        req.session.token = req.sessionID;
        res.send({"sessionID":req.sessionID,"user":req.user});
    });
    app.get("/success", authController.sucess);

    app.get("/fail", authController.fail);

    app.get("/logout", authController.logout);

    app.get("/checkAuthentication", authController.check);

    app.get("/home",authController.home);

    app.get("/search",isLoggedIn, authController.search);

    app.post("/signin", passport.authenticate("local-signin"),function(req,res) {
        req.session.token = req.sessionID;
        res.send({"sessionID":req.sessionID,"user":req.user});
    });

    function isLoggedIn(req, res, next) {
        if (req.sessionStore.sessions[req.headers.test] != null){
            return next();
        }else
        res.redirect("/fail")
    }
}