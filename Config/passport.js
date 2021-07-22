module.exports = function (passport, user) {
    let User = user;
    let LocalStrategy = require("passport-local").Strategy;
    //serialize
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id).then(function (user) {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use("local-signin", new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    },
    function(req, username, password, done){
        let User = user;
        let isValidPassword = function(userpass, password) {
            return (userpass == password);
        }
        User.findOne({
            where: {
                username: username
            }
        }).then(function(user) {
            if(!user) {
                return done(null, false, {
                    message: "username does not exist"
                });
            }
            if(!isValidPassword(user.password, password)) {
                return done(null, false, {
                    message: "Incorrect password"
                });
            }
            let userinfo = user.get();
            return done(null, userinfo);
        }).catch(function(err) {
            console.log("error: ", err);
            return done(null, false, {
                message: "something went wrong with your signin"
            });
        });
    }
    ));

    passport.use("local-signup", new LocalStrategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
    },
        function (req, username, password, done) {
            User.findOne({
                where: {
                    username: username
                }
            }).then(function (user) {
                if (user) {
                    return done(null, false, {
                        message: "that username is already taken"
                    });
                } else {
                    let data = {
                        username: req.body.username,
                        password: req.body.password //im not hashing i know
                    };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    })
                }
            })
        }
    ))
}