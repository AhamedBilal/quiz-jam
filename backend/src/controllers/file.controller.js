const multer  = require('multer')
const upload = multer({ dest: './upload' })

exports.upload = (req, res) => {
    res.status(200).json({
        success: true,
        data: req.file.filename
    });
};