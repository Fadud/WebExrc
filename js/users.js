/*var users = {
    "Marty McFly" : {
        follow : false
    },
    "Janis Joplin" : {
        follow : false
    },
    "Albert Einstein" : {
        follow : false
    },
    "Genghis Khan" : {
        follow : false
    },
    "Janis Joplin" : {
        follow : false
    },
    "Dracula" : {
        follow : true
    },
    "Forest Gump" : {
        follow : false
    },
    "Caligula" : {
        follow : false
    },
    "Winnie the Pooh" : {
        follow : false
    },
    "Obama" : {
        follow : false
    },
    "Henry the 8th" : {
        follow : true
    }
};*/
var users = [
    {
        username: "Marty McFly",
        follow : false
    },
    {
        username: "Janis Joplin",
        follow : false
    },
    {
        username: "Albert Einstein",
        follow : false
    },
    {
        username: "Genghis Khan",
        follow : false
    },
    {
        username: "Janis Joplin",
        follow : false
    },
    {
        username: "Dracula",
        follow : true
    },
    {
        username: "Forest Gump",
        follow : false
    },
    {
        username: "Caligula",
        follow : false
    },
    {
        username: "Winnie the Pooh",
        follow : false
    },
    {
        username: "Obama",
        follow : false
    },
    {
        username: "Henry the 8th",
        follow : true
    }
];
var filterText = "";

window.addEventListener('load', loadUsers, false);

function loadUsers() {
    var usersContainer = document.getElementById("normalUsersContainer");
    var followContainer = document.getElementById("followUsersContainer");
    var userTemplate = document.getElementById("userTemplate");
    var followTemplate = document.getElementById("followTemplate");

    usersContainer.innerHTML = "";
    followContainer.innerHTML = "";

    for(user of users) {
        if(user.username.includes(filterText))
            addUserToHTML(usersContainer, userTemplate, user, "user");
        if (user.follow)
            addUserToHTML(followContainer, followTemplate, user, "follower");
    }
}

function addUserToHTML(container, tamplate, user, type) {
    var htmlText = tamplate.innerHTML;
    htmlText = htmlText.replace("#divID", user.username + "_" + type);
    htmlText = htmlText.replace("#name", user.username);

    htmlText = htmlText.replace("#btnText", (user.follow) ? "unfollow" : "follow");
    htmlText = htmlText.replace("#btnClass", (user.follow) ? "btn-danger" : "btn-success");
    htmlText = htmlText.replace("#id", user.username);

    container.innerHTML += htmlText;
}

function clickUser(userName) {
    users.filter(function(user){
        return user.username == userName;
    }).map(function (user) {
        user.follow = !user.follow;
    });
    //users[user].follow = !(users[user].follow);
    loadUsers();
}

function changeFilterText() {
    filterText = document.getElementById("filterInput").value;
    filterUsers();
}

function filterUsers() {
    for(user of users) {
        var div = document.getElementById(user.username+"_user");
        if(user.username.includes(filterText)) {
            div.classList.remove("hidden");
        } else {
            div.classList.add("hidden");
        }
    }
    /*users.forEach(function(user) {
        document.getElementById(user.username+"_user").classList.remove("hidden");
    });*/
/*
    users.filter(function(user) {
        return !user.username.includes(filterText);
    }).forEach(function(user) {
        document.getElementById(user.username+"_user").classList.add("hidden");
    });*/
}