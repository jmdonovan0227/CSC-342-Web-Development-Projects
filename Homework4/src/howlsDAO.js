let howls = require('./data/howls.json');

module.exports = {
    // get all howls
    getHowls: () => {
        return new Promise((resolve, reject) => {
            console.log(howls);
            resolve(howls);
        });
    },

    // create a new howl
    createNewHowl: (howl) => {
        return new Promise((resolve, reject) => {
            howls.push(howl);
            resolve(howl);
        })
    },

    // get howls by id
    getHowlsByUserID: (id) => {
        return new Promise((resolve, reject) => {
            const userHowls = howls.filter(howl => howl.userId == id );
            resolve(userHowls);
        })
    },

    // get all howls except for the user with id
    getAllOtherHowlsByID: (id) => {
        return new Promise((resolve, reject) => {
            const allOtherHowls = howls.filter(howl => howl.userId != id );
            resolve(allOtherHowls);
        });
    }
}