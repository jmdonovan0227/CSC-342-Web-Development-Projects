let users = require('./data/users.json');

module.exports = {
    getUserByCredentials: (username, password) => {
        return new Promise((resolve, reject) => {
        const user = users.find(user => user.username == username);
        if (user) { // we found our user
            resolve(getFilteredUser(user));
        }
        else { // if no user with provided username
            reject({code: 401, message: "No such user"});
        }
        });
    },
    // get all users
    getUsers: () => {
        return new Promise((resolve, reject) => {
            console.log(users);
            resolve(users);
        });
    },

    // find user by id
    getUserByID: (id) => {
        return new Promise((resolve, reject) => {
            const user = users.find(user => user.id == id );
            resolve(user);
        });
    }
}

function getFilteredUser(user) {
    return {
      "id": user.id,
      "first_name": user.first_name,
      "last_name": user.last_name,
      "username": user.username,
      "avatar": user.avatar
    }
  }