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
var loggedUserID = "10c06b27-d8ee-4435-9cee-0a2a838ca14a";
var loggedUser;

window.addEventListener('load', onPageLode, false);

function onPageLode() {
    axios.get('http://10.103.50.193:8080/users/'+loggedUserID).then(function(response){
        if(response.status == 200) {
            loggedUser = response.data[0];
            loadUsersList();
        }
    });
}

function loadUsersList() {
    axios.get('http://10.103.50.193:8080/users').then(function(response){
        if(response.status == 200) {
            users = response.data.filter(function(user) {
                return user._id != loggedUser._id;
            });
            loadUsers();
        }
    });
};

function loadUsers() {
    var usersContainer = $("#normalUsersContainer");
    var followContainer = $("#followUsersContainer");
    var userTemplate = $(".userTemplate");
    var followTemplate = $(".followerTemplate");

    usersContainer.empty();
    followContainer.empty();

    for(user of users) {
        var isFollowed = loggedUser.following.indexOf(user._id) != -1;
        addUserToHTML(usersContainer, userTemplate, user, "user", isFollowed);
        if (isFollowed)
            addUserToHTML(followContainer, followTemplate, user, "follower", isFollowed);
    }
}

function addUserToHTML(container, tamplate, user, type, isFollowed) {
    var newObject = tamplate.clone();
    newObject.setAttribute("id", user._id + "_" + type);
    newObject.setAttribute("data-name", user.username);
    newObject.addClass(type);
    newObject.removeClass("hidden");
    newObject.removeClass(type + "Template");
    newObject.replace("#name", user.username);
    newObject.replace("#btnText", isFollowed ? "unfollow" : "follow");
    newObject.replace("#btnClass", isFollowed ? "btn-danger" : "btn-success");
    newObject.replace("#id", user._id);

    container.appendChild(newObject.get(0));
}

function clickUser(userID) {
    users.filter(function(user){
        return user._id == userID;
    }).map(function (user) {
        user.follow = !user.follow;
    });
    loadUsers();
}

function changeFilterText() {
    var filterText = $("#filterInput").value();

    $(".user").removeClass("hidden");

    $(".user").filter(function(obj) {
       return !obj.getAttribute("data-name").includes(filterText);
    }).addClass("hidden");
}