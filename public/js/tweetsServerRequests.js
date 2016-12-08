function getAllTweets() {
    return new Promise(function(resolve, reject) {
        axios.get('/tweets').then(function(response){
            if(response.status == 200) {
                resolve(response.data);
            }
        });
    });
}

function addTweet(text) {
    let data = {
        text: text
    };
    axios.post('/tweets', data).then(function(response){
        if(response.status != 200) {
            console.error("Error adding tweet");
        }
    });
}