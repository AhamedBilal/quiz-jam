const express = require('express');
const router = express.Router();
const multer  = require('multer')
const path = require('path')
const fileController = require('../controllers/file.controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage: storage});


router.post('/upload', upload.single('file'), fileController.upload);

module.exports = router;