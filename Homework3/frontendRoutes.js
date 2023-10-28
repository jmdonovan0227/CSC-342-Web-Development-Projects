const express = require('express');
const router = express.Router();

const path = require('path');
const html_dir = path.join(__dirname, '/Homework3/templates');

router.get('/', (req, res) => {
    console.log("We got form file!");
    res.sendFile(`${html_dir}form.html`);
})

module.exports = router;