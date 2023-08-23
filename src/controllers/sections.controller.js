const { Section } = require("../models");
const { success, error } = require("../helpers");

const getAllSections = async(req, res) => {

    await Section.find().sort({ order: 1 })
    .then( data => {
        success(req, res, data)
    })
    .catch(err => {
        error(req, res, err);
    });

}

const getSectionByName = async(req, res) => {

    const { name } = req.params;

    await Section.findOne({name})
    .then( data => {
        success(req, res, data)
    })
    .catch(err => {
        error(req, res, err);
    });

}

const createSection = async(req, res) => {

    req.section = new Section();

    await saveSection(req, res);
}

const updateSection = async(req, res) => {
    
    const { id } = req.params;

    req.section = await Section.findById(id);

    if( !req.section){
        return error(req, res, 'Section doesn\'t exist', 400);
    }

    await saveSection(req, res);
}

const saveSection = async (req, res) => {
    let section = req.section;
    const { name, markdown, order, path } = req.body;

    section.name = name;
    section.markdown = markdown;
    section.order = order;
    section.path = path;

    await section.save()
    .then( data => {
        success(req, res, data)
    })
    .catch(err => {
        error(req, res, err);
    });
}

const deleteSection = async (req, res) => {
    
    const { id } = req.params;
    
    await Section.findByIdAndUpdate(id, {status: false}, { new: true })
    .then( data => {
        success(req, res, data)
    })
    .catch(err => {
        error(req, res, err);
    });
}

module.exports = {
    getAllSections,
    getSectionByName,
    createSection,
    updateSection,
    deleteSection
}