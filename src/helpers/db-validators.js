const { Post } = require("../models")



const existsPostById = async(id = '') => {

    const existsPost = await Post.findById(id)

    if(!existsPost || !existsPost.status){
       throw new Error(`El id: ${id} no existe`)
    }
}

module.exports = {
    existsPostById
}