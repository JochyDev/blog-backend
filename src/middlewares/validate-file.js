const { error } = require("../helpers");

const validateFile = (req, res, next) => {

    if (!req.files || Object.keys(req.files).length === 0  || !req.files.file ) {
        return error(req, res, 'No files were uploaded.', 400)
    }

    next();
}


module.exports = {
    validateFile
}