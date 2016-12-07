var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

var users = [
    {"_id":"10c06b27-d8ee-4435-9cee-0a2a838ca14a","username":"Marta","password":"deserunt","following":["cc707c95-f1e3-4caf-906d-f9dd1f394b99","953ee40c-77d3-46cc-8258-fc815c9b1f90","ac59f830-e8f7-4764-8efd-764d99c7c4f4","ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22","ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22","ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22"]},
    {"_id":"ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22","username":"Butler","password":"consequat","following":["10c06b27-d8ee-4435-9cee-0a2a838ca14a","c28dd406-3595-42f6-8e36-15d4cd495293"]},
    {"_id":"5e07631e-3974-47f8-a89c-bb41ce1e0e3d","username":"Young","password":"excepteur","following":["cf462068-e996-4bf5-8395-c77b6df6ae3e","10c06b27-d8ee-4435-9cee-0a2a838ca14a","ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22"]},
    {"_id":"cf462068-e996-4bf5-8395-c77b6df6ae3e","username":"Sargent","password":"nulla","following":["740b0aa3-7b00-4eeb-9c5b-7a302b63fec5","c28dd406-3595-42f6-8e36-15d4cd495293","953ee40c-77d3-46cc-8258-fc815c9b1f90","ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22"]},
    {"_id":"b328d5c3-8cab-4c6f-b027-39ad9138dbf0","username":"Munoz","password":"incididunt","following":["b328d5c3-8cab-4c6f-b027-39ad9138dbf0","953ee40c-77d3-46cc-8258-fc815c9b1f90","740b0aa3-7b00-4eeb-9c5b-7a302b63fec5","953ee40c-77d3-46cc-8258-fc815c9b1f90","953ee40c-77d3-46cc-8258-fc815c9b1f90","c28dd406-3595-42f6-8e36-15d4cd495293","b328d5c3-8cab-4c6f-b027-39ad9138dbf0"]},
    {"_id":"953ee40c-77d3-46cc-8258-fc815c9b1f90","username":"Mcclain","password":"voluptate","following":["c28dd406-3595-42f6-8e36-15d4cd495293","b328d5c3-8cab-4c6f-b027-39ad9138dbf0","953ee40c-77d3-46cc-8258-fc815c9b1f90","c28dd406-3595-42f6-8e36-15d4cd495293","953ee40c-77d3-46cc-8258-fc815c9b1f90","5e07631e-3974-47f8-a89c-bb41ce1e0e3d","ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22"]},
    {"_id":"cc707c95-f1e3-4caf-906d-f9dd1f394b99","username":"Reyna","password":"ut","following":["ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22","5e07631e-3974-47f8-a89c-bb41ce1e0e3d","b328d5c3-8cab-4c6f-b027-39ad9138dbf0","ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22","b328d5c3-8cab-4c6f-b027-39ad9138dbf0","5e07631e-3974-47f8-a89c-bb41ce1e0e3d"]},
    {"_id":"740b0aa3-7b00-4eeb-9c5b-7a302b63fec5","username":"Margo","password":"consequat","following":["10c06b27-d8ee-4435-9cee-0a2a838ca14a","ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22","10c06b27-d8ee-4435-9cee-0a2a838ca14a","10c06b27-d8ee-4435-9cee-0a2a838ca14a","10c06b27-d8ee-4435-9cee-0a2a838ca14a","cc707c95-f1e3-4caf-906d-f9dd1f394b99","b328d5c3-8cab-4c6f-b027-39ad9138dbf0"]},
    {"_id":"ac59f830-e8f7-4764-8efd-764d99c7c4f4","username":"Dalton","password":"est","following":["b328d5c3-8cab-4c6f-b027-39ad9138dbf0","740b0aa3-7b00-4eeb-9c5b-7a302b63fec5","c28dd406-3595-42f6-8e36-15d4cd495293","c28dd406-3595-42f6-8e36-15d4cd495293","10c06b27-d8ee-4435-9cee-0a2a838ca14a"]},
    {"_id":"c28dd406-3595-42f6-8e36-15d4cd495293","username":"Lottie","password":"amet","following":["ff2b41b9-e1d8-4594-9aa3-c1dda30b0d22","ac59f830-e8f7-4764-8efd-764d99c7c4f4","cc707c95-f1e3-4caf-906d-f9dd1f394b99"]}
];

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-with, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use('/', express.static(path.resolve('../public')));
app.use('/', express.static(path.resolve('../public/html/')));

app.listen(8000, function () {
   console.log("Listening on port 8000");
});

app.get('/users', function (req, res) {
    res.send(users);
});

app.get('/users/:userId', function (req, res) {
    let result = users.filter(function(user) {
        return user._id == req.params["userId"];
    });
    res.send(result);
});