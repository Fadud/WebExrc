var tweets = [
        {username: 'Bobo', text: 'hello followers!'},
        {username: 'Elvis', text: 'this exercise is really easy!'},
        {username: 'Mimi', text: 'I want to go to sleep'}
    ];

window.addEventListener('load', onPageLoad, false);

function loadTweets() {
    $("#tweetsContainer").empty();

    for(currTweet in tweets) {
        addTweetToHTML(tweets[currTweet]);
    }
}

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
        var newTweet = {};
        newTweet["username"] = "Amit";
        newTweet["text"] = tweetText;
        tweets.push(newTweet);
        $("#tweetInput").value("");
        addTweetToHTML(newTweet);
    }
}

function testPublish() {
    $("#tweetInput").value("testing");
    publishTweet();
    var newTweets = tweets.filter(function(item){return item.text != "testing";});
    var result = newTweets.length != tweets.length;
    tweets = newTweets;
    return result;
}

function testPublishEmpty() {
    $("#tweetInput").value("");
    var beforeTweetsCount = tweets.length;
    publishTweet();
    var result = beforeTweetsCount == tweets.length;
    tweets = tweets.filter(function(item){return item.text != "";});;
    return result;
}

function onPageLoad() {
    //var tweetsContainer = $("#tweetsContainer");
    //var tweetTemplate = $("#tweetTemplate");

    test_group("Publish tweets", function() {
        assert(testPublish(), "Add tweet");
        assert(testPublishEmpty(), "Add empty tweet");
    });

    loadTweets();
}


