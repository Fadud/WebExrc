let express = require('express');
let app = express();
let path = require("path");
let bodyParser = require("body-parser");
let users = require("./users");
let tweets = require("./tweets");
let session = require('express-session');

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    next();
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use('/', express.static(path.resolve('../public')));
app.use('/', express.static(path.resolve('../public/html/')));

app.listen(8000, function () {
   console.log("Listening on port 8000");
});

users.addUsersRoutes(app);
tweets.addTweetsRoutes(app);
