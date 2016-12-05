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

window.addEventListener('load', loadUsers, false);

function loadUsers() {
    var usersContainer = $("#normalUsersContainer");
    var followContainer = $("#followUsersContainer");
    var userTemplate = $(".userTemplate");
    var followTemplate = $(".followerTemplate");

    usersContainer.empty();
    followContainer.empty();

    for(user of users) {
        addUserToHTML(usersContainer, userTemplate, user, "user");
        if (user.follow)
            addUserToHTML(followContainer, followTemplate, user, "follower");
    }
}

function addUserToHTML(container, tamplate, user, type) {
    var newObject = tamplate.clone();
    newObject.setAttribute("id", getUserID(user) + "_" + type);
    newObject.removeClass("hidden");
    newObject.removeClass(type + "Template");
    newObject.replace("#name", user.username);
    newObject.replace("#btnText", (user.follow) ? "unfollow" : "follow");
    newObject.replace("#btnClass", (user.follow) ? "btn-danger" : "btn-success");
    newObject.replace("#id", getUserID(user));

    container.appendChild(newObject.get(0));
}

function clickUser(userID) {
    users.filter(function(user){
        return user.username == getUserName(userID);
    }).map(function (user) {
        user.follow = !user.follow;
    });
    loadUsers();
}

function changeFilterText() {
    var filterText = $("#filterInput").value();

    users.forEach(function(user) {
        $("#"+getUserID(user)+"_user").removeClass("hidden");
    });

    users.filter(function(user) {
        return !user.username.includes(filterText);
    }).forEach(function(user) {
        $("#"+getUserID(user)+"_user").addClass("hidden");
    });
}

function getUserID(user) {
    return user.username.split(' ').join('_');
}

function getUserName(userID) {
    return userID.split('_').join(' ');
}