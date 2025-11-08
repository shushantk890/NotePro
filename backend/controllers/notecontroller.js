const  Note = require("../models/Note.js");

exports.getnote=async(req,res,next)=>{
    try{
const notes= await Note.find({user:req.user});
  
res.json(notes) 
    }
    catch(err){
     next(err)
    }
}



exports.postnote=async(req,res,next)=>{

    try{
    const { text } = req.body;

if (!text || text.trim() === "") {
  return res.status(400).json({ error: "Note text cannot be empty" });
}

const note = await Note.create({ text, user: req.user });
    res.status(201).json(note)}
    catch(err){
    next(err)}


}


exports.updatenote=async(req,res,next)=>{
try{
const note=await Note.findByIdAndUpdate({_id:req.params.id,user:req.user},{text:req.body.text},{new:true})
if(!note)
   return res.status(404).json({error:"note not found"})

    res.json(note)
}catch(err){
    next(err)
}
}
exports.deletenote=async(req,res,next)=>{
try{
    const note=await Note.findByIdAndDelete({_id:req.params.id,user:req.user})
    if(!note)
   return res.status(404).json({error:"note not found"})
   res.json({ message: "Note deleted" });
  } catch (err) {
    next(err);
  }
}