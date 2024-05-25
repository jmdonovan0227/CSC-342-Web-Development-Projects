import api from "./APIClient.js";

// get currently logged in user info for header to create
// profile picture and link to profile in top right of page
api.getCurrentUser().then(user => {
    let link = document.createElement('span');
    link.classList.add('userNameText');
    link.innerHTML = "@" + user.username;
    let profile_pic = document.createElement('img');
    profile_pic.src = user.avatar;
    profile_pic.classList.add('dropdown');

    document.getElementById('user').appendChild(link);
    document.getElementById('user').appendChild(profile_pic);
    
    let button = document.createElement('button');
    button.innerHTML = "Logout";

    button.addEventListener('click', (e) => {
        api.logOut().then(res => {
            document.location = "./";
        });
    });

    document.querySelector(".button_div").appendChild(button);

    let welcome_header = document.createElement('h1');
    welcome_header.innerHTML = "Welcome, " + user.first_name + " " + user.last_name + "!";
    document.querySelector(".welcome").appendChild(welcome_header);
}).catch(error => {
    //
});
