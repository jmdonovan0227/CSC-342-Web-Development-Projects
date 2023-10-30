const express = require('express');
const cookieParser = require('cookie-parser');
const apiRouter = express.Router();
apiRouter.use(cookieParser());
apiRouter.use(express.json());

const { SessionMiddleware, initializeSession, removeSession } = require('./SessionCookieMiddleware');
const howlsDAO = require('./howlsDAO');
const usersDAO = require('./usersDAO');
const followsDAO = require('./followsDAO');


// Get all users and information about what other users they are following
apiRouter.get('/follows', SessionMiddleware, (req, res) => {
    followsDAO.getFollowers().then(followers => {
        res.json(followers);
    }).catch(err => {
        res.status(500).json({error: 'Internal Server Error'})
    });
});

// Get all howls made by users (or posted messages)
apiRouter.get('/howls', SessionMiddleware, (req, res) => {
    howlsDAO.getHowls().then(howls => {
        // let sortedHowls = howls.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
        // sortedHowls = sortedHowls.reverse();
        res.json(howls);
    }).catch(err => {
        res.status(500).json({error: 'Internal Server Error'})
    });
});

// Get all users in the system
apiRouter.get('/users', SessionMiddleware, (req, res) => {
    usersDAO.getUsers().then(users => {
        res.json(users);
    }).catch(err => {
        res.status(500).json({error: 'Internal Server Error'})
    });
});



/** MORE USER ROUTES */

apiRouter.post('/users/login', (req, res) => {
    // is username and password valid?
    // check if api route returns a user
    if( req.body.username ) {
        // Use UserDAO getUserByCredentials to get user object
        usersDAO.getUserByCredentials(req.body.username).then(user => {
            let result = {
                user: user
            }
            
            initializeSession(req, res, user);

            res.json(result);
        }).catch(err => {
            console.log(err);
            res.status(err.code).json({error: err.message});
        });
    }

    else {
        console.log("Invalid username");
        //
        res.status(401).json({error: 'Not authenticated'});
    }
});

apiRouter.get('/users/current', SessionMiddleware, (req, res) => {
    console.log(req.session);
    res.json(req.session.user);
});

apiRouter.get('/users/find/:userId', SessionMiddleware, (req, res) => {
    const userId = req.params.userId;
    usersDAO.getUserByID(userId).then(user => {
        res.json(user);
    }).catch(err => {
        res.status(404).json({error: 'User not found'})
    });
});


/** MORE FOLLOWS */
// get a user with followers by their id
apiRouter.get('/follows/:userId', SessionMiddleware, (req, res) => {
    const userId = req.params.userId;
    console.log(userId);

    followsDAO.getUsersFollowedByID(userId).then(user => {
        res.json(user);
    }).catch(err => {
        res.status(404).json({error: 'User with id was not found in followers'})
    });
});


// delete a follower
apiRouter.put('/follows/delete', SessionMiddleware, (req, res) => {
    if( req.body.userId && req.body.followerId ) {
        // get the user with followers
        followsDAO.getUsersFollowedByID(req.body.userId).then(user => {
            followsDAO.deleteFollower(req.body.userId, req.body.followerId).then(result => {
                console.log(result);
                res.json(result);
            }).catch(err => {
                res.status(409).json({error: 'User is not following this person'})
            });
        }).catch(err => {
            res.status(404).json({error: 'User with id was not found in followers'})
        });
    }

    else {
        res.status(500).json({error: 'We are getting a server error oh no!' + req.body });
    }
});

// add a follower
apiRouter.put('/follows', SessionMiddleware, (req, res) => {
    if( req.body.userId && req.body.followerId ) {
        // get the user with followers
        followsDAO.getUsersFollowedByID(req.body.userId).then(user => {
            followsDAO.addFollower(req.body.userId, req.body.followerId).then(result => {
                console.log(result);
                res.json(result);
            }).catch(err => {
                res.status(409).json({error: 'User is already following this person'})
            });
        }).catch(err => {
            res.status(404).json({error: 'User with id was not found in followers'})
        });
    }

    else {
        res.status(500).json({error: 'Internal server error'});
    }
});

/** MORE HOWLS */

// create a new howl
apiRouter.post('/howls', SessionMiddleware, (req, res) => {
    let newHowl = req.body;
    console.log(newHowl);

    howlsDAO.createNewHowl(newHowl).then(howl => {
        res.json(howl);
    }).catch(err => {
        res.status(500).json({error: 'Internal Server Error'})
    });
});

// get howl by id
apiRouter.get('/howls/:userId', SessionMiddleware, (req, res) => {
    let userId = req.params.userId;

    howlsDAO.getHowlsByUserID(userId).then(userHowls => {
        // let sortedHowls = userHowls.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
        // sortedHowls = sortedHowls.reverse();
        res.json(userHowls);
    }).catch(err => {
        res.status(404).json({error: 'User with id not found'})
    });
});

// get all howls before user with id and howls posted by user with id after
apiRouter.get('/howls/before/:userId', SessionMiddleware, (req, res) => {
    // get user id
    let userId = req.params.userId;
    // first get all howls before the user with id
    howlsDAO.getAllOtherHowlsByID(userId).then(allOtherHowls => {
        // // sort the allOtherHowls by date
        // let sortedOtherHowls = allOtherHowls.sort((a, b) => new Date(a.datetime) - new Date(b.datetime) );
        // // reverse array as it will start with oldest date
        // sortedOtherHowls = sortedOtherHowls.reverse();

        // now get all howls by the user with id
        howlsDAO.getHowlsByUserID(userId).then(howls => {
            // let sortedHowls = howls.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
            // sortedHowls = sortedHowls.reverse();
            // // concat sortedHowls to the end of sortedOtherHowls
            // let ret = sortedOtherHowls.concat(sortedHowls);
            let sortedHowls = allOtherHowls.concat(howls);
            sortedHowls = howls.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
            sortedHowls = sortedHowls.reverse();

            res.json(sortedHowls);
        }).catch(err => {
            console.log("User with id does not exist");
        });
    }).catch(err => {
        console.log("User with id does not exist");
    });
});



module.exports = apiRouter;