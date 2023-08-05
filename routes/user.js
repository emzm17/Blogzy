const express=require('express');
const User = require('../models/user');

const router=express.Router();


router.get('/signin',(req,res)=>{
     res.render('signin');
})

router.get('/signup',(req,res)=>{
     res.render('signup');
})
router.post('/signin', async(req,res)=>{
      const {fullName,email,password}=req.body;
      const user=await User.matchPassword(email,password);
      console.log('User',user);
      res.redirect('/');

})
router.post('/signup', async(req,res)=>{
     // console.log(req.body);
     const {fullName,email,password}=req.body;
     await User.create({
         fullName,
         email,
         password,
     });
     return res.redirect('/')
});

module.exports=router;

