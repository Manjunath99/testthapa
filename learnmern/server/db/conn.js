const mongoose =require('mongoose');

const dbUrl=process.env.DATABASE;
mongoose.connect(dbUrl)
.then(()=>{console.log("its connected");})
.catch((err)=>console.log(err));