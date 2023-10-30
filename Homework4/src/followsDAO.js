let follows = require('./data/follows.json');

module.exports = {
    // get all users and their followers
    getFollowers: () => {
        return new Promise((resolve, reject) => {
            console.log(follows);
            resolve(follows);
        });
    },

    // get a user with followers with id (user id)
    getUsersFollowedByID: (id) => {
        return new Promise((resolve, reject) => {
            // this might not work
            const usersFollowing = follows[id];
            console.log(usersFollowing);
            resolve(usersFollowing);
        });
    },

    // add follower
    addFollower: (userId, followerId) => {
        return new Promise((resolve, reject) => {
            let userWithFollowers = follows[`${userId}`];
            console.log(userWithFollowers);

            // check if follower with id (followerId) exists
            let follower = userWithFollowers.following.includes(followerId);

            console.log(follower);

            if(follower) {
                console.log("User already is following this person");
            }

            else {
                userWithFollowers.following.push(followerId);
                resolve(userWithFollowers);
                console.log(userWithFollowers);
            }
        });
    },

    // delete follower
    deleteFollower: (userId, followerId) => {
        return new Promise((resolve, reject) => {
            let userWithFollowers = follows[`${userId}`];
            console.log(userWithFollowers);

            // check if follower with id (followerId) exists
            let follower = userWithFollowers.following.includes(followerId);

            console.log(follower);

            if(follower) {
                userWithFollowers.following.splice(userWithFollowers.following.indexOf(followerId), 1 );
                resolve(userWithFollowers);
            }

            else {
                reject("Can't delete")
            }
        });
    }
}