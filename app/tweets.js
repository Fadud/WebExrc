let dataProvider = require("./dataProvider");
let tweets = [];
dataProvider.getTweets().then(response => tweets = response);

function isUserBeingFollowed(user, userId) {
    return user.following.indexOf(userId) != -1;
}

function isUserLoggedIn(req) {
    return req.session.loginUser != undefined;
}

function addTweetsRoutes(app) {
    app.get('/tweets', function (req, res) {
        let results = [];
        if(isUserLoggedIn(req)) {
            results = tweets.filter(function (tweet) {
                return isUserBeingFollowed(req.session.loginUser, tweet.user) ||
                    req.session.loginUser._id == tweet.user;
            });
        }
        res.send(results);
    });

    app.get('/tweets/:userId', function (req, res) {
        let result = tweets.filter(function(tweet) {
            return tweet.user == req.params["userId"];
        });
        res.send(result);
    });

    app.post('/tweets', function (req, res) {
        if(isUserLoggedIn(req)) {
            let newTweet = {
                text: req.body.text.replace(/[<]/g, '&lt').replace(/[>]/g, '&gt'),
                user: req.session.loginUser._id
            };
            tweets.push(newTweet);
            dataProvider.setTweets(tweets);
        }
        res.send();
    });
}

module.exports = {addTweetsRoutes : addTweetsRoutes};
