const express=require('express');
const multer=require('multer');
const path=require('path');
const Blog=require('../models/blog');
const router=express.Router();
const Comment=require('../models/comment');


const storage=multer.diskStorage({
     destination:function(req,file,cb){
         cb(null,path.resolve(`./public/uploads/`));
     },
     filename:function(req,file,cb){
        const filename=`${Date.now()}-${file.originalname}`;
        cb(null,filename);
     },
});

const upload=multer({storage:storage})

router.get('/add-new',(req,res)=>{
     return res.render('addBlog',{
        user:req.user
     });
});


router.post('/',upload.single('coverImage'),async(req,res)=>{
   const {title,body}=req.body;
  const blog=await Blog.create({
     body,
     title,
     createdBy:req.user._id,
     coverImageURL:`/uploads/${req.file.filename}`,

   });
   

    res.redirect(`/blog/${blog._id}`);
})


router.get('/:id',async (req,res)=>{
    const blog=await Blog.findById(req.params.id).populate('createdBy');
    const comments=await Comment.find({blogId:req.params.id}).populate('createdBy');
   //  console.log('comments',comments);
    res.render('blog',{
      user:req.user,
      blog,comments
    })
    
})

module.exports=router;