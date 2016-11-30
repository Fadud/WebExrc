var tweets = [
        {username: 'Bobo', text: 'hello followers!'},
        {username: 'Elvis', text: 'this exercise is really easy!'},
        {username: 'Mimi', text: 'I want to go to sleep'}
    ];

window.addEventListener('load', loadTweets, false);

function loadTweets() {
    var tweetsContainer = document.getElementById("tweetsContainer");
    var tweetTemplate = document.getElementById("tweetTemplate");

    tweetsContainer.innerHTML = "";

    for(currTweet in tweets) {
        var htmlText = tweetTemplate.innerHTML;
        htmlText = htmlText.replace("#name", tweets[currTweet].username);
        htmlText = htmlText.replace("#text", tweets[currTweet].text);
        tweetsContainer.innerHTML += htmlText;
    }
}

function publishTweet() {
    var newTweet = {};
    newTweet["username"] = "Amit";
    newTweet["text"] = document.getElementById("tweetInput").value;
    tweets.push(newTweet);
    document.getElementById("tweetInput").value = "";
    loadTweets();
}


