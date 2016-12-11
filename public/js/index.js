window.addEventListener('load', onPageLoad, false);
var loggedUser;

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
        loadFollowersTweets();
    }).catch(function(result) {
        window.location = "/signin.html";
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

function addTweetToHTML(tweet) {
    var newTweetElem = $(".tweetTemplate").clone();
    newTweetElem.removeClass("hidden");
    newTweetElem.removeClass("tweetTemplate");
    newTweetElem.replace("#name", tweet.username);
    newTweetElem.replace("#text", tweet.text);
    $("#tweetsContainer").appendChild(newTweetElem.get(0));
}
