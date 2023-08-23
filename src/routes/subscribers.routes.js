const { Router } = require('express');

//Controllers
const { subscribe, confirmSubcription } = require('../controllers');

const router = Router();

router.post('/', subscribe);

router.get('/:confirmationCode', confirmSubcription)



module.exports = router;