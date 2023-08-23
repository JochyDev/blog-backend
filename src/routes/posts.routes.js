const { Router } = require('express');
const { check } = require("express-validator");

// Middlewares
const { validateFields } = require('../middlewares');
// Helpers
const { existsPostById } = require('../helpers');
// Controllers
const { 
    getAllPosts,
    getPostById, 
    createPost, 
    updatePost, 
    deletePost } = require('../controllers');

const router = Router();

router.get('/', getAllPosts);

router.get('/:id', getPostById);

router.post('/', [ 
    check('title', 'title is required').not().isEmpty(),
    check('markdown', 'markdown is required').not().isEmpty(),
    check('img_url', 'image url is required').not().isEmpty(),
    check('category', 'category is required').not().isEmpty(),
    check('category', 'category isn\'t valid').isIn(['TUTORIAL', 'EXPERIENCE', 'ADVICE']),
    validateFields
], createPost);

router.put('/:id', [
    check('id', 'the id must be a valid mongo_id').isMongoId(),
    check('id').custom( existsPostById ),
    validateFields
], updatePost);

router.delete('/:id', [
    check('id', 'the id must be a valid mongo_id').isMongoId(),
    check('id').custom( existsPostById ),
    validateFields
], deletePost)


module.exports = router;