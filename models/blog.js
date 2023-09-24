const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const objectId=Schema.Types.ObjectId;


const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String,
        required:false,
    },
    createdBy:{
        type:objectId,
        ref:'user',
    }
,

},{timestamps: true});


const Blog=mongoose.model('blog',blogSchema);

module.exports=Blog;
