const emailHandler = require('./email-handlers');
const dbValidators = require('./db-validators');
const response = require('./response');

module.exports = {
    ...emailHandler,
    ...dbValidators,
    ...response
}