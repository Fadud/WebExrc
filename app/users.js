let dataProvider = require("./dataProvider");
let users = [];
dataProvider.getUsers().then(response => users = response);

function isUserLoggedIn(req) {
    return req.session.loginUser != undefined;
}

function addUsersRoutes(app) {
    app.get('/users', function (req, res) {
        res.send(users);
    });
    app.get('/users/:userId', function (req, res) {
        let result = users.filter(function(user) {
            return user._id == req.params["userId"];
        });
        res.send(result);
    });

    app.get('/users/following/:userId', function (req, res) {
        let result = users.filter(function(user) {
            return isUserFollowsId(user, req.params["userId"]);
        });
        res.send(result);
    });

    app.put('/users/following', function (req, res) {
        if(isUserLoggedIn(req)) {
            users.forEach(function (user) {
                if (user._id == req.session.loginUser._id) {
                    let userToChangeFollow = req.body.userId;
                    let isUserBeingFollowed = isUserFollowsId(user, userToChangeFollow);
                    if (req.body.followState && !isUserBeingFollowed) {
                        user.following.push(userToChangeFollow);
                    } else if (!req.body.followState && isUserBeingFollowed) {
                        unfollowUser(user, userToChangeFollow);
                    }
                    req.session.loginUser = user;
                }
            });
            dataProvider.setUsers(users);
        }
        res.send();
    });

    app.post('/users', function(req, res) {
        let newUser = {
            _id: getNextId(),
            username: req.body.username,
            password: req.body.password,
            following: []
        };
        users.push(newUser);
        dataProvider.setUsers(users);
        res.send();
    });

    app.post('/login', function(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        let user = users.filter(function(currUser) {
            return (currUser.username == username && currUser.password == password);
        });
        if(user.length > 0) {
            req.session.loginUser = user[0];
            res.send(user[0]);
        } else {
            res.status(404).send("No user found");
        }
    });

    app.get('/login', function(req, res) {
        if(req.session.loginUser != undefined) {
            res.send(req.session.loginUser);
        } else {
            res.status(404).send("No logged user");
        }
    });
}

let isUserFollowsId = function (user, userID) {
    return user.following.indexOf(userID) != -1;
};

let unfollowUser = function(user, userId) {
    user.following.splice(user.following.indexOf(userId), 1);
};

let nextUserId = 1;
let getNextId = function() {
    return nextUserId++;
};

module.exports = {addUsersRoutes : addUsersRoutes};