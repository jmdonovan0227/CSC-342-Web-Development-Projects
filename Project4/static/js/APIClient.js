import HTTPClient from "./HTTPClient.js";

const API_BASE = 'api';

// Make sure we have an API call for each endpoint in API Routes
export default {
    // login user
    logIn: (username) => {
        let data = {
            username: username,
        }

        return HTTPClient.post(API_BASE + '/users/login', data );
    },

    // get current user
    getCurrentUser: () => {
        return HTTPClient.get(API_BASE + '/users/current');
    },

    // create a new howl
    createNewHowl: (howl) => {
        return HTTPClient.post(API_BASE + '/howls', howl);
    },

    // get all howls
    getHowls: () => {
        return HTTPClient.get(API_BASE + "/howls" );
    },

    // get howls by user id
    getHowlsByID: (id) => {
        return HTTPClient.get(API_BASE + `/howls/${id}`);
    },

    // get a user by id
    getUserByID: (id) => {
        return HTTPClient.get(API_BASE + `/users/find/${id}`);
    },

    // get the array of people that user with id follows
    getUserFollowersByID: (id) => {
        return HTTPClient.get(API_BASE + `/follows/${id}`);
    },

    getUsers: () => {
        return HTTPClient.get(API_BASE + "/users");
    },

    //
    followUser: (userId, followerId) => {
        let result = {
            userId: userId,
            followerId: followerId
        }

        console.log("The result is...");
        console.log(result);

        return HTTPClient.put(API_BASE + '/follows', result);
    },

    //
    unfollowUser: (userId, followerId) => {
        let result = {
            userId: userId,
            followerId: followerId
        }

        console.log(result);
        
        return HTTPClient.put(API_BASE + '/follows/delete', result);
    }
};