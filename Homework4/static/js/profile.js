// get currently logged in user info for header to create
// profile picture and link to profile in top right of page
import api from "./APIClient.js";

api.getCurrentUser().then(user => {
    let link = document.createElement('a');
    link.href = '/profile?id=' + user.id;
    link.innerHTML = "@" + user.username;
    let profile_pic = document.createElement('img');
    profile_pic.src = user.avatar;

    profile_pic.addEventListener('click', (e) => {
        window.location = '/profile?id=' + user.id;
    });

    document.getElementById('user').appendChild(link);
    document.getElementById('user').appendChild(profile_pic);
    //update_list(user.id);
}).catch(error => {
    console.log(error);
});

// get info to create user profile
const query = window.location.search;
let parameters = new URLSearchParams(query);
let id = parameters.get('id');

// retrieve user info and populate the page with their info and the help of functions
api.getUserByID(id).then(user => {
    // call function to create header html
    createHeader(user);
    // call function to get the people they are following
    getUserFollowers();
    // call function to get their messages
    getUserMessages();
}).catch(err => {
    console.log("Can't find user with id");
});

function createHeader(user) {
    let profile_pic = document.createElement('img');
    profile_pic.src = user.avatar;

    profile_pic.addEventListener('click', (e) => {
        document.location = '/profile?id=' + user.id;
    });

    let full_name = document.createElement('span');
    full_name.innerHTML = user.first_name + " " + user.last_name;
    let profile_link = document.createElement('a');
    profile_link.href = '/profile?id=' + user.id;
    profile_link.innerHTML = "@" + user.username;
    let main_div = document.createElement('div');
    main_div.classList.add('userInfo');
    main_div.appendChild(profile_pic);
    main_div.appendChild(full_name);
    main_div.appendChild(profile_link);

    // before creating follow button check for more info
    api.getCurrentUser().then(currentUser => {
        if( currentUser.id == user.id ) {
            // don't create a follow button the current user is ourself
            document.querySelector("#profileSummary").append(main_div);
        }

        else {
            // check if we are already following them
            api.getUserFollowersByID(currentUser.id).then(followers => {
                if(followers.following.includes(user.id)) {
                    // make an unfollow button
                    let button = document.createElement('button');
                    // set text
                    button.innerHTML = "Unfollow";
                    //
                    button.addEventListener('click', (e) => {
                        api.unfollowUser(currentUser.id, user.id).then(s => {
                            console.log(s);
                            updateButton(user.id, currentUser, button);
                        });
                    }, {once: true});

                    // add to main_div
                    main_div.appendChild(button);
                    //
                    document.querySelector("#profileSummary").append(main_div);
                }

                // make an follow button
                else {
                    let button = document.createElement('button');
                    // set text
                    button.innerHTML = "Follow";
                    //
                    button.addEventListener('click', (e) => {
                        api.followUser(currentUser.id, user.id).then(s => {
                            console.log(s);
                            updateButton(user.id, currentUser, button);
                        });
                    }, {once: true});

                    // add to main_div
                    main_div.appendChild(button);
                    //
                    document.querySelector("#profileSummary").append(main_div);
                }
            });
        }
    })
}

function getUserFollowers() {
    // get all users followed on user's page
    api.getUserFollowersByID(id).then(followers => {
        for(let i = 0; i < followers.following.length; i++ ) {
            let f = followers.following[i];
            api.getUserByID(f).then(f_user => {
                let main_div = document.createElement('div');
                main_div.classList.add('followingDivs');
                let user_image = document.createElement('img');
                user_image.src = f_user.avatar;

                user_image.addEventListener('click', (e) => {
                    window.location = "/profile?id=" + f_user.id;
                });

                let user_name = document.createElement('a');
                user_name.innerHTML = "@" + f_user.username;
                user_name.href = '/profile?id=' + f_user.id;
                main_div.appendChild(user_image);
                main_div.appendChild(user_name);
                document.querySelector("#followingList").append(main_div);
            }).catch(err => {
                console.log("Something went wrong!");
            });
        }
    }).catch(err => {
        console.log("Can't get followers!");
    });
}

function getUserMessages() {
    api.getHowlsByID(id).then(userHowls => {
        let sorted_howls = userHowls.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
        console.log("Sorted Howls:");
        console.log(sorted_howls);
        sorted_howls.reverse();
        createHtml(sorted_howls)
    }).catch(err => {
        console.log("Error");
    });
}

function createHtml(sorted_howls) {
    let idx_howls = 0;
    for(let i = 0; i < sorted_howls.length; i++ ) {
        let id = sorted_howls[i].userId;
        console.log(id);
        api.getUserByID(id).then(user => {
            console.log(idx_howls);
            let howl = sorted_howls[idx_howls];
            let profile_pic = document.createElement('img');
            profile_pic.src = user.avatar;
            let full_name = document.createElement('span');
            full_name.innerHTML = user.first_name + " " + user.last_name;
            let profile_link = document.createElement('a');
            profile_link.innerHTML = "@" + user.username;
            profile_link.href = "/profile?id=" + user.id;
            let date = document.createElement('span');
            let convert = new Date(howl.datetime);
            date.innerHTML = convert.toLocaleDateString() + ", " + convert.toLocaleTimeString();

            let div_one = document.createElement('div');
            div_one.classList.add('userInfo');
            div_one.appendChild(profile_pic);
            div_one.appendChild(full_name);
            div_one.appendChild(profile_link);
            div_one.appendChild(date);
            let div_two = document.createElement('div');
            div_two.classList.add('paragraphs');
            let text = document.createElement('p');
            div_two.appendChild(text);
            text.innerHTML = howl.text;
            let main_div = document.createElement('div');
            main_div.classList.add('mainDiv');
            main_div.appendChild(div_one);
            main_div.appendChild(div_two);
            document.querySelector("#messages").append(main_div);
            idx_howls++;
        }).catch(err => {
            console.log("Error");
        });
    }
}

function updateButton(id_user, currentUser, button) {
    // update innerHtml to reflect change
    if(button.innerHTML == "Follow") {
        console.log("here");
        button.innerHTML = "Unfollow";
        button.addEventListener('click', (e) => {
            api.unfollowUser(currentUser.id, id_user).then(s => {
                console.log(s);
                updateButton(id_user, currentUser, button);
            });
        }, {once: true});
    }

    else {
        console.log("second here");
        button.innerHTML = "Follow";
        button.addEventListener('click', (e) => {
            api.followUser(currentUser.id, id_user).then(s => {
                console.log(s);
                updateButton(id_user, currentUser, button);
            });
        }, {once: true});
    }
}