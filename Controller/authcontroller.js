const axios = require("axios");
const url ="https://community-open-weather-map.p.rapidapi.com/weather?q=Arizona,chandler&units=imperial";
const searchUrl ="https://community-open-weather-map.p.rapidapi.com/weather?";

const myClient = axios.create({
    headers: {
        "X-RapidAPI-Key": "e89c8b4048msh7a83ed0664561ccp13897ajsnec08593a9e93",
        "X-RapidAPI-Host": "community-open-weather-map.p.rapidapi.com"
    }
})

exports.sucess = function(req,res, next) {
    res.send("welcome")
}

exports.fail = function(req, res, next) {
    res.status(401).send("unauthorized")
}

exports.logout = function(req,res, next) {
   req.session.destroy();
   req.sessionStore.sessions[req.headers.test] = null;
   res.send("logged out")
}

exports.home = function(req, res, next) {
    
        myClient.get(url).then(response => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json(response.data)
        }).catch(err => {

            res.status(400).json({message: "something went wrong"});
        });

}

exports.search = function(req, res, next) {
    let active = (req.sessionStore.sessions[req.headers.test] != null)
    res.send(`are you logged in ${active}`);
}

exports.check = function(req, res, next) {
    const authenticated = (req.sessionStore.sessions[req.headers.test] != null);

    res.status(200).json({
        authenticated
    });
};