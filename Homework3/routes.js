const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'Homework3/static/uploads/'});

router.post('/formdata', upload.single('myfile'), (req, res) => {
    console.log("Working!");
});