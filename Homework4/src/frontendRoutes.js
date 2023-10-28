const express = require('express');
const frontendRouter = express.Router();

const path = require('path');
const html_dir = path.join(__dirname, '../templates/');

frontendRouter.get('/', (req, res) => {
    res.sendFile(`${html_dir}login.html`);
});

frontendRouter.get('/main', (req, res) => {
    res.sendFile(`${html_dir}main.html`);
});

frontendRouter.get('/profile', (req, res) => {
    res.sendFile(`${html_dir}profile.html`);
});

module.exports = frontendRouter;