const { Router } = require('express');
const { check } = require("express-validator");

// Middlewares
const { validateFields } = require('../middlewares');
// Helpers
// Controllers
const { 
    getAllSections, 
    getSectionByName,
    createSection, 
    updateSection, 
    deleteSection
} = require('../controllers');

const router = Router();

router.get('/', getAllSections)
router.get('/:name', getSectionByName)
router.post('/', createSection)
router.put('/:id', updateSection)
router.delete('/:id', deleteSection)


module.exports = router;