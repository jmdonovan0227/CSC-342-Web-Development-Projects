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
            const usersFollowing = follows[`${id}`];
            console.log(usersFollowing);
            resolve(usersFollowing);
        });
    },

    // add follower
    addFollower: (userId, followerId) => {
        return new Promise((resolve, reject) => {
            const userWithFollowers = follows[`${id}`];
            console.log(userWithFollowers);

            // check if follower with id (followerId) exists
            let follower = userWithFollowers.following.find(fId => fId == followerId);

            console.log(follower);

            if(follower) {
                console.log("User already is following this person");
            }

            else {
                userWithFollowers.following.push(followerId);
                resolve(followerId);
                console.log(userWithFollowers);
            }
        });
    },

    // delete follower
    deleteFollower: (userId, followerId) => {
        return new Promise((resolve, reject) => {
            const userWithFollowers = follows[`${id}`];
            console.log(userWithFollowers);

            // check if follower with id (followerId) exists
            let follower = userWithFollowers.following.find(fId => fId == followerId);

            console.log(follower);

            if(follower) {
                userWithFollowers.following.splice(following.indexOf(follower), 1 );
                console.log(userWithFollowers);
            }

            else {
                console.log("User is not following the passed follower");
            }
        });
    }
}