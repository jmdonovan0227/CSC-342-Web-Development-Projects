const express = require('express');
const routes = express.Router();

const frontendRouter = require( './frontendRoutes' );
routes.use( frontendRouter );

const apiRouter = require( './APIRoutes' );
routes.use('/api', apiRouter );

module.exports = routes;

