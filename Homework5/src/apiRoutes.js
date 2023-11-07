const express = require('express');
const cookieParser = require('cookie-parser');

const apiRouter = express.Router();

apiRouter.use(cookieParser());
apiRouter.use(express.json());

const {TokenMiddleware, generateToken, removeToken} = require('./TokenMiddleware');

const UserDAO = require('./UserDAO');

apiRouter.post('/users/login', (req, res) => {
    if(req.body.username && req.body.password) {
        UserDAO.getUserByCredentials(req.body.username, req.body.password).then(user => {
            let result = {
                user: user
            }

            console.log("In Login API");
            console.log(result.user);

            generateToken(req, res, user);

            res.json(result);
        }).catch(err => {
            console.log(err);
        });
    }

    else {
        res.status(401).json({error: 'Not authenticated'});
    }
});

apiRouter.post('/users/logout', (req, res) => {
    removeToken(req, res);
    res.json({success: true});
});

apiRouter.get('/users/current', TokenMiddleware, (req, res) => {
    res.json(req.user);
});

module.exports = apiRouter;

