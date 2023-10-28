import api from "./APIClient.js";

api.getCurrentUser().then(user => {
    console.log(user);
    let link = document.createElement('a');
    link.href = '/profile';
    link.innerHTML = "@" + user.username;
    let profile_pic = document.createElement('img');
    profile_pic.src = user.avatar;
    document.getElementById('user').appendChild(link);
    document.getElementById('user').appendChild(profile_pic);

    // create elements
}).catch(error=> {
    console.log("We are not logged in");
});