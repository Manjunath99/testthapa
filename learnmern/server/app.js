const express =require('express');
const app =express();
const mongoose =require('mongoose');

const dotenv =require('dotenv');

dotenv.config({path:'./config.env'});
app.use(express.json());
require('./db/conn');
app.use(require('./router/auth'))



const middleware=(req,res,next)=>{
    console.log("first middleware");
    next();
}

app.get("/",(req,res)=>{
    res.send("hello Manjunath lets fuck");
    
});
app.get("/about",(req,res)=>{
    res.send("hello about lets fuck");
});
app.get("/contact",(req,res)=>{
    res.send("hello contact lets fuck");
});
// app.get("/register",(req,res)=>{
//     res.send("hello register lets fuck");
// });
app.get("/login",(req,res)=>{
    res.send("hello login lets fuck");
});

app.listen(3000);