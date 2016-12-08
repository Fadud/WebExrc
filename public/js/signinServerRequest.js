function login(username, password) {
    let data ={
        username: username,
        password: password
    };
    axios.post('/login', data).then(function(response){
        if(response.status != 200) {
            console.error("Error login in");
        } else {
            window.location = "/";
        }
    });
}
