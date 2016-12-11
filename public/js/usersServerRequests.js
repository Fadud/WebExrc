function getLoggedUser() {
    return new Promise(function(resolve, reject) {
        axios.get('/login').then(function(response){
            resolve(response.data);
        }).catch(function(response) {
            reject("no logged user");
        });
    });
}

function getUserById(id) {
    return new Promise(function(resolve, reject) {
        axios.get('/users/'+id).then(function(response){
            if(response.status == 200) {
                resolve(response.data[0]);
            }
        });
    });
}

function getAllUsers() {
    return new Promise(function(resolve, reject) {
        axios.get('/users/').then(function(response){
            if(response.status == 200) {
                resolve(response.data);
            }
        });
    });
}

function changeUserFollowingState(followedUserID, followState) {
    let data = {
        userId: followedUserID,
        followState : followState
    };
    axios.put('/users/following', data).then(function(response){
        if(response.status != 200) {
            console.error("Error changing following state");
        }
    });
}