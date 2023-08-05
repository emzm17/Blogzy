const express=require('express');
const path=require('path');
const userRoute=require('./routes/user');
const mongoose=require('mongoose');






const app=express();
const PORT=8000;

mongoose.connect('mongodb+srv://admin:1234@cluster0.yf0qwii.mongodb.net/').then((err)=>console.log('MongoDB Connected'));

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.urlencoded({ extended: false }));





app.get('/',(req,res)=>{
    res.render('home');
})
app.use('/users',userRoute);
app.listen(PORT,()=>{
    console.log(`server started at PORT:${PORT}`)
})

