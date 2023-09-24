require(
    "dotenv"
).config();
const express=require('express');
const path=require('path');
const Blog=require('./models/blog');
const userRoute=require('./routes/user');
const blogRoute=require('./routes/blog');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const commentRoute=require('./routes/comment');
const { checkAuthenticationCookie } = require('./middlewares/auth');






const app=express();

const PORT=process.env.PORT 

mongoose.connect(process.env.MONGO_URL).then((err)=>console.log('MongoDB Connected'));

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthenticationCookie('token'))
app.use(express.static(path.resolve('./public')))





app.get('/',async(req,res)=>{
    const allBlog=await Blog.find({})
    res.render('home',{
        user:req.user,
        blogs:allBlog
    });
})
app.use('/users',userRoute);
app.use('/blog',blogRoute);
app.use('/comment',commentRoute);
app.listen(PORT,()=>{
    console.log(`server started at PORT:${PORT}`)
})

