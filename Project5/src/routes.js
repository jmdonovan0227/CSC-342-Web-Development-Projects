const express = require('express');
const router = express.Router();

const apiRouter = require('./apiRoutes');
const frontendRouter = require('./frontendRoutes');

router.use('/api', apiRouter);
router.use(frontendRouter);

module.exports = router;