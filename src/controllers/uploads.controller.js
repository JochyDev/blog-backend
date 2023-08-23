const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL);

const { success, error } = require('../helpers');


const uploadFile = async (req, res) => {

    const { tempFilePath } = req.files.file;
    
    await cloudinary.uploader.upload( tempFilePath )
    .then( data => {
        success(req, res, {img_url: data.secure_url})
    })
    .catch(err => {
        error(req, res, err);
    });

}

module.exports = {
    uploadFile
}