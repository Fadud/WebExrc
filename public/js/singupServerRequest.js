function addUser(username, password) {
    let data ={
        username: username,
        password: password
    };
    axios.post('/users', data).then(function(response){
        if(response.status != 200) {
            console.error("Error  following state");
        } else {
            window.location = "/";
        }
    });
}
