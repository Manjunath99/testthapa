const express =require('express');
const router =express.Router();
const jwt =require('jsonwebtoken');
const bcrypt =require('bcrypt');
require('../db/conn');
const User =require('../model/userSchema')
router.get('/',(req,res)=>{
    res.send("hello its from router and auth");
});
router.post('/register',async (req,res)=>{
    if(!(req.body.name)){
        res.json({message:"user exist"});
    }
    try{
        const userexist = await User.findOne({name:req.body.name});

        if(userexist){
         res.json({message:"user already exist"}); 
        }
         else{
         console.log("user not there");
         const user =User(req.body);
        const res1 =await user.save();
        console.log("succesfully saved");
        res.json({message:user});
         console.log("saved");
    }}
    catch(err){
        console.log(err);
    }
  
  
    
}
  
);
router.post('/login',async (req,res)=>{
    if(!(req.body.name)||!(req.body.phone)){
        res.json({message:"fill something"});
    }
    try{
        const userexist = await User.findOne({name:req.body.name});
         
        if(userexist)
        {
            
            const isMatch = await bcrypt.compare(req.body.password,userexist.password);
             const token = await userexist.generateAuthToken();
             res.cookie('jwttoken',token);
         
            if(isMatch){
               res.json({message:userexist});
            }
            else {
                res.json({message:"password did not match"});
            }
          
        
        }
         else{
            res.json({message:"please login user not exist"});
    }
}
    catch(err){
        console.log(err);
    }
  
  
    
}
  
);

module.exports =router;