function login(username, password) {
    let data ={
        username: username,
        password: password
    };
    axios.post('/login', data).then(function(response){
        window.location = "/";
    }).catch(function() {
        alert("Wrong username or password");
    });
}
