import HTTPClient from "./HTTPClient.js";

const API_BASE = '/api';

// Make sure we have an API call for each endpoint in API Routes
export default {
    // login user
    logIn: (username, password) => {
        let data = {
            username: username,
            password: password
        }

        return HTTPClient.post(API_BASE + '/users/login', data );
    },

    // get the current user that has a session
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
        return HTTPClient.get(API_BASE + `/users/${id}`);
    },

    // get the array of people that user with id follows
    getUserFollowersByID: (id) => {
        return HTTPClient.get(API_BASE + `/follows/${id}`);
    },

    //
    followUser: (userId, followerId) => {
        result = {
            userId: userId,
            followerId: followerId
        }

        return HTTPClient.post(API_BASE + '/follows', result);
    },

    //
    unfollowUser: (userId, followerId) => {
        result = {
            userId: userId,
            followerId: followerId
        }
        
        return HTTPClient.delete(API_BASE + '/follows', result);
    }
};