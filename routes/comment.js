const express=require('express');
const Comment=require('../models/comment');


const router=express.Router();


router.post('/:blogId',async (req,res)=>{
       const comment=await Comment.create({
        content:req.body.content,
        blogId:req.params.blogId,
        createdBy:req.user._id
      });
   return res.redirect(`/blog/${req.params.blogId}`)  
});


module.exports=router;