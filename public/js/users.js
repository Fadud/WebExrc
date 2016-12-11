var users = [];
var loggedUser;

window.addEventListener('load', onPageLode, false);

function onPageLode() {
    getLoggedUser().then(function(result) {
        loggedUser = result;
        loadUsersList();
    }).catch(function(result) {
        window.location = "/signin.html";
    });
}

function loadUsersList() {
    getAllUsers().then(function(result){
        users = result.filter(function(user) {
            return user._id != loggedUser._id;
        });
        loadUsers();
    });
}

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
    newObject.replace("#follow", !isFollowed);
    newObject.replace("#id", user._id);

    container.appendChild(newObject.get(0));
}

function clickUser(userID, follow) {
    users.filter(function(user){
        return user._id == userID;
    }).map(function (user) {
        changeUserFollowingState(userID, follow);

        if(follow) {
            loggedUser.following.push(userID);
        } else {
            loggedUser.following.splice(loggedUser.following.indexOf(userID), 1);
        }

        loadUsers();
    });
}

function changeFilterText() {
    var filterText = $("#filterInput").value();

    $(".user").removeClass("hidden");

    $(".user").filter(function(obj) {
       return !obj.getAttribute("data-name").includes(filterText);
    }).addClass("hidden");
}