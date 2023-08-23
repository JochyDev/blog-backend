const validateFields = require("./validate-fields");
const validateFile = require("./validate-file");

module.exports = {
    ...validateFields,
    ...validateFile
}