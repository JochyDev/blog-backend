const { Post } = require("../models");
const { success, error } = require("../helpers");


const getAllPosts =  async (req, res ) => {
    const { limit = 100, offset = 0 } = req.query;
    const query = { status: true };

    await Promise.all([
        Post.find(query)
                .limit(limit)
                .skip(offset),
        Post.countDocuments(query)
    ])
    .then(([posts, total]) => {
        success(req, res, {posts, total})
    })
    .catch(err => {
        error(req, res, err);
    });
}

const getPostById = async(req, res) => {
    const { id } = req.params;

    await Post.findById(id)
    .then( data => {
        success(req, res, data)
    })
    .catch(err => {
        error(req, res, err);
    });

}

const createPost = async (req, res) => {
    
    const { title, subtitle, markdown, category, img_url} = req.body;

    
    const postData = {
        title, 
        subtitle, 
        markdown,
        category,
        img_url
    }

    const post = new Post(postData);

    await post.save()
    .then( data => {
        success(req, res, data)
    })
    .catch(err => {
        error(req, res, err);
    });
}

const updatePost = async (req, res) => {

    const { id } = req.params;

    const { status, ...data } = req.body;

    await Post.findByIdAndUpdate(id, data, {new: true})
    .then( data => {
        success(req, res, data)
    })
    .catch(err => {
        error(req, res, err);
    });
}

const deletePost = async (req, res) => {
    
    const { id } = req.params;
    
    await Post.findByIdAndUpdate(id, {status: false}, { new: true })
    .then( data => {
        success(req, res, data)
    })
    .catch(err => {
        error(req, res, err);
    });
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}