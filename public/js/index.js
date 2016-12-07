window.addEventListener('load', onPageLoad, false);
var loggedUserID = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";
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
    var tweetText = $("#tweetInput").value();
    if(tweetText != "") {
        tweetText = tweetText.replace(/[<]/g,'&lt').replace(/[>]/g, '&gt');
        var userName = "unknown";
        if(loggedUser != undefined) {
            userName = loggedUser.username;
        }
        var newTweet = {};
        newTweet["username"] = userName;
        newTweet["text"] = tweetText;
        $("#tweetInput").value("");
        addTweetToHTML(newTweet);
    }
}

function testPublish() {
    $("#tweetInput").value("testing");
    publishTweet();
    var result = $("#tweetsContainer").get(0).innerHTML.includes("testing");
    $("#tweetsContainer").empty();
    return result;
}

function testPublishEmpty() {
    $("#tweetInput").value("");
    publishTweet();
    var result = $("#tweetsContainer").get(0).innerHTML == "";
    $("#tweetsContainer").empty();
    return result;
}

function onPageLoad() {
    test_group("Publish tweets", function() {
        assert(testPublish(), "Add tweet");
        assert(testPublishEmpty(), "Add empty tweet");
    });

    axios.get('http://10.103.50.193:8080/users/'+loggedUserID).then(function(response){
        if(response.status == 200) {
            loggedUser = response.data[0];
            loadFollowersTweets();
        }
    });
}

function loadFollowersTweets() {
    axios.get('http://10.103.50.193:8080/tweets').then(function(response){
        if(response.status == 200) {
            var followersTweets = response.data.filter(function(currTweet) {
                return loggedUser.following.indexOf(currTweet.user) != -1;
            });

            for (currTweet of followersTweets) {
                addNewTweet(currTweet.text, axios.get('http://10.103.50.193:8080/users/'+currTweet.user));
            }
        }
    });
}

function addNewTweet(text, userPromise) {
    userPromise.then(function(response) {
        var newTweet = {
            username: response.data[0].username,
            text: text
        };

        addTweetToHTML(newTweet);
    });
}
