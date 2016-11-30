var users = {
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
};
var filterText = "";

window.addEventListener('load', loadUsers, false);

function loadUsers() {
    var usersContainer = document.getElementById("normalUsersContainer");
    var followContainer = document.getElementById("followUsersContainer");
    var userTemplate = document.getElementById("userTemplate");
    var followTemplate = document.getElementById("followTemplate");

    usersContainer.innerHTML = "";
    followContainer.innerHTML = "";

    for(user in users) {
        var filter = new RegExp("");
        if(filter.test(user))
            addUserToHTML(usersContainer, userTemplate, user);
        if (users[user].follow)
            addUserToHTML(followContainer, followTemplate, user);
    }
}

function addUserToHTML(container, tamplate, userName) {
    var htmlText = tamplate.innerHTML;
    htmlText = htmlText.replace("#name", userName);

    htmlText = htmlText.replace("#btnText", (users[userName].follow) ? "unfollow" : "follow");
    htmlText = htmlText.replace("#btnClass", (users[userName].follow) ? "btn-danger" : "btn-success");
    htmlText = htmlText.replace("#id", userName);

    container.innerHTML += htmlText;
}

function clickUser(user) {
    users[user].follow = !(users[user].follow);
    loadUsers();
}

function changeFilterText() {
    filterText = document.getElementById("filterInput").value;
    alert(filterText);
}