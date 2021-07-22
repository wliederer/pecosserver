const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const session = require("express-session");
const myReqLogger = require("./Utilities/requestLogger");
const cors = require("cors");

app.use(cors());
//bodyparser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(myReqLogger);

//models
const db = require("./Models");
const { user } = require("./Models");
//passport
app.use(session(
    {
        name:"da-sesh",
        secret: "yo",
        resave: true,
        saveUninitialized: false,
        cookie: { secure: true }
    }));
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

//load passport strategies
require("./Config/passport")(passport, db.user);

//routes
const authRouter = require("./Routes/auth")(app, passport);

app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});

db.sequelize.sync().then((res) => {
    app.listen(port, () => {
        console.log(`App running on port ${port}...`);
    });
})
const port = process.env.PORT || 8080;

module.exports = app;