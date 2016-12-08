window.addEventListener('load', onPageLoad, false);
var loggedUser;
function addTweetToHTML(tweet) {
    var newTweetElem = $(".tweetTemplate").clone();
    newTweetElem.removeClass("hidden");
    newTweetElem.removeClass("tweetTemplate");
    newTweetElem.replace("#name", tweet.username);
    newTweetElem.replace("#text", tweet.text);
    $("#tweetsContainer").appendChild(newTweetElem.get(0));
}

function publishTweet() {
    let tweetInput = $("#tweetInput");
    let tweetText = tweetInput.value();
    if(tweetText != "") {
        tweetText = tweetText.replace(/[<]/g,'&lt').replace(/[>]/g, '&gt');
        let newTweet = {
            username: loggedUser.username,
            text: tweetText
        };
        addTweetToHTML(newTweet);
        addTweet(tweetText);
        tweetInput.value("");
    }
}

function onPageLoad() {
    getLoggedUser().then(function(result) {
        loggedUser = result;
        if(loggedUser != undefined && loggedUser != "") {
            loadFollowersTweets();
        }

    });
}

function loadFollowersTweets() {
    getAllTweets().then(function(response){
        for (currTweet of response) {
            addNewTweet(currTweet.text, currTweet.user);
        }
    });
}

function addNewTweet(text, userId) {
    getUserById(userId).then(function(result) {
        var newTweet = {
            username: result.username,
            text: text
        };

        addTweetToHTML(newTweet);
    });
}

let isUserFollowsId = function (user, userID) {
    return user.following.indexOf(userID) != -1;
};
