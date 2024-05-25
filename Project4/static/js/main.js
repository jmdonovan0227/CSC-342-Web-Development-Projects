import api from "./APIClient.js";

// get currently logged in user info for header to create
// profile picture and link to profile in top right of page
api.getCurrentUser().then(user => {
    let link = document.createElement('a');
    link.href = 'profile?id=' + user.id;
    link.innerHTML = "@" + user.username;
    let profile_pic = document.createElement('img');
    profile_pic.src = user.avatar;

    profile_pic.addEventListener('click', (e) => {
        document.location = 'profile?id=' + user.id;
    });

    document.getElementById('user').appendChild(link);
    document.getElementById('user').appendChild(profile_pic);
    update_list(user.id);
}).catch(error => {
    console.log(error);
});

function update_list(id) {
    // get users that current user follows
    api.getUserFollowersByID(id).then(followedUsers => {
        // get all howls
        api.getHowls().then(allHowls => {
            // filter all howls by people our user follows check first if the current howl's id is held
            // within our array of followed ids and does not equal the user's id
            let followedHowls = allHowls.filter(currentHowl => followedUsers.following.includes(currentHowl.userId));
            // next get howls by the current user
            api.getHowlsByID(id).then(userHowls => {
                // combine the followed howls and user howls and sort
                let sortedHowls = followedHowls.concat(userHowls);
                //
                sortedHowls.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
                //
                sortedHowls.reverse();
                //
                console.log(sortedHowls);
                // start creating elements and display on page
                createMessages(sortedHowls);
            }).catch(err => {
                console.log("Cant get user howls!");
            });
        }).catch(err => {
            console.log("Cant get all howls!");
        })
    }).catch(err => {
        console.log("Cant get followers");
    });
}

function createMessages(sortedHowls) {
    // clear current content
    document.querySelector("#messages").innerHTML = "";

    api.getUsers().then(usersList => {
        let loopIdx = 0;

        while(loopIdx != sortedHowls.length ) {
            let id = sortedHowls[loopIdx].userId;
            console.log("Howl User ID: " + id);
            let howl = sortedHowls[loopIdx];

            let user = usersList.find(user => user.id == id);
            console.log("User ID: " + user.id );
        
            // let howl = sortedHowls[idx];
            let div_one = document.createElement('div');
            div_one.classList.add('userInfo')
            let main_div = document.createElement('div');
            main_div.classList.add('mainDiv');
    
            let profile_picture = document.createElement('img');
            profile_picture.src = user.avatar;

            profile_picture.addEventListener('click', (e) => {
                document.location = 'profile?id=' + user.id;
            });

            let full_name = document.createElement('span');
            full_name.innerHTML = user.first_name + " " + user.last_name;
            let profile_link = document.createElement('a');
            profile_link.innerHTML = "@" + user.username;
            profile_link.href = 'profile?id=' + user.id;
            let date = document.createElement('span');
            let convert = new Date(howl.datetime);
            date.innerHTML = convert.toLocaleDateString() + ", " + convert.toLocaleTimeString();
            // create the text paragraph
            let text = document.createElement('p');
            text.innerHTML = howl.text;

            //create div to hold header of message info
            div_one.appendChild(profile_picture);
            div_one.appendChild(full_name);
            div_one.appendChild(profile_link);
            div_one.appendChild(date);

            // create a second div to hold this info
            let div_two = document.createElement('div');
            div_two.classList.add('paragraphs');
            div_two.appendChild(text);

            // append everything
            main_div.appendChild(div_one);
            main_div.appendChild(div_two);
            document.getElementById("messages").append(main_div);
            // get the user by id
            loopIdx++;
        }
    });
}

let button = document.querySelector("#howlButton");

button.addEventListener('click', (e) => {
    let text = document.querySelector("#howlText").value;
    let current_date = new Date().toISOString();
    
    if( text != "" ) {
        // get current user
        api.getCurrentUser().then(user => {
            // get all howls
            api.getHowls().then(allHowls => {
                let id = allHowls.length + 1;
                // create howl object
                let howl_obj = {
                    id: id,
                    userId: user.id,
                    datetime: current_date,
                    text: text
                };

                // create new howl
                api.createNewHowl(howl_obj).then(obj => {
                    console.log(obj);
                    update_list(user.id);
                }).catch(err => {
                    console.log("Couldn't create new howl!");
                });
            }).catch(err => {
                console.log("Cant get howls!");
            })
        }).catch(err => {
            console.log("Can't get current user!");
        });
    }

    else {
        e.preventDefault();
    }
});
