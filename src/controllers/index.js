const postsController = require('./posts.controller');
const sectionsController = require('./sections.controller');
const subscribersController = require('./subcribers.controller');
const uploadsController = require('./uploads.controller');



module.exports = {
    ...postsController,
    ...sectionsController,
    ...subscribersController,
    ...uploadsController
}