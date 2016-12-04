var tweets = [
        {username: 'Bobo', text: 'hello followers!'},
        {username: 'Elvis', text: 'this exercise is really easy!'},
        {username: 'Mimi', text: 'I want to go to sleep'}
    ];

window.addEventListener('load', onPageLoad, false);

function loadTweets() {
    var tweetsContainer = document.getElementById("tweetsContainer");
    var tweetTemplate = document.getElementById("tweetTemplate");

    tweetsContainer.innerHTML = "";

    for(currTweet in tweets) {
        addTweetToHTML(tweets[currTweet]);
    }
}

function addTweetToHTML(tweet) {
    var htmlText = tweetTemplate.innerHTML;
    htmlText = htmlText.replace("#name", tweet.username);
    htmlText = htmlText.replace("#text", tweet.text);
    tweetsContainer.innerHTML += htmlText;
}

function publishTweet() {
    var tweetText = document.getElementById("tweetInput").value;
    if(tweetText != "") {
        tweetText = tweetText.replace(/[<]/g,'&lt').replace(/[>]/g, '&gt')
        var newTweet = {};
        newTweet["username"] = "Amit";
        newTweet["text"] = tweetText;
        tweets.push(newTweet);
        document.getElementById("tweetInput").value = "";
        addTweetToHTML(newTweet);
    }
}

function testPublish() {
    var input = document.getElementById("tweetInput");
    input.value = "testing";
    publishTweet();
    var newTweets = tweets.filter(function(item){return item.text != "testing";});
    var result = newTweets.length != tweets.length;
    tweets = newTweets;
    return result;
}

function testPublishEmpty() {
    var input = document.getElementById("tweetInput");
    var beforeTweetsCount = tweets.length;
    publishTweet();
    var result = beforeTweetsCount == tweets.length;
    tweets = tweets.filter(function(item){return item.text != "";});;
    return result;
}

function onPageLoad() {
    test_group("Publish tweets", function() {
        assert(testPublish(), "Add tweet");
        assert(testPublishEmpty(), "Add empty tweet");
    });

    loadTweets();
}


