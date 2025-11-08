const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User = require("../models/user")

exports.registeruser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;

         if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (name.length < 3) {
      return res.status(400).json({ error: "Name must be at least 3 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

        const userexists= await User.findOne({email})
        if(userexists)
            return res.status(400).json({error:"user already exists"})
        const hashedpassword=await bcrypt.hash(password,10)
        const user= await User.create({name,email,password:hashedpassword});
        res.status(201).json({message:"user registered successfully",user})
  
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}
exports.loginuser=async(req,res)=>{
  try{
    const{email,password}=req.body;
    const user= await User.findOne({email})
    if(!user) return res.status(400).json({message:"invalid credentials"})
     const ismatch=await bcrypt.compare(password,user.password)   
    if(!ismatch)return res.status(400).json({message:"invalid credentials"})
    const token=jwt.sign({id:user._id},"secretkey",{expiresIn:"1d"})
   
   
    res.cookie("token",token,{
     httpOnly:true,
    secure:false,
    sameSite:"lax",
    maxAge:24*60*60*1000

    })


   res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }    
  }

exports.logoutuser=async(req,res)=>{
res.clearCookie("token",{
 httpOnly:"",
 secure:false,
 sameSite:"lax",

})
res.json({message:"logout success"})
};