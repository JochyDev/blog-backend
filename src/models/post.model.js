const { Schema, model } = require('mongoose');

// const slugify = require('slugify');
// libraries needed for convert markdown to html
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify( new JSDOM('').window );

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: String,
    markdown: {
        type: String,
        required: true
    },
    img_url: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['TUTORIAL', 'EXPERIENCE', 'ADVICE']
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
}, { timestamps: true });

PostSchema.pre('validate', function(next){
    // if(this.title){
    //     this.slug = slugify(this.title, {lower: true, stric: true});
    // };

    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked.parse(this.markdown));
    }

    next();
})

PostSchema.methods.toJSON = function(){
    const { __v, _id, ...post } = this.toObject();

    post.id = _id;

    return post;
}

module.exports = model('Post', PostSchema);