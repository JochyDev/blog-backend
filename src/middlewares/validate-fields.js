const { validationResult } = require("express-validator");
const { error } = require("../helpers/response");


const validateFields = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return error(req, res, errors, 400);
    }

    next();

}

module.exports = { validateFields }