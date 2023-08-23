const { Router } =  require('express');

// Middlewares
const { validateFields, validateFile } = require('../middlewares');
// Helpers
// Controllers
const { uploadFile } = require('../controllers');

const router = Router();


router.post('/', [
    validateFile,
    validateFields
], uploadFile);


module.exports = router;