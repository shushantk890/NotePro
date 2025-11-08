const express=require("express")
const router=express.Router()
const noteController = require("../controllers/notecontroller.js");
const protect = require("../middlewares/auth.js")
router.get("/" ,protect,noteController.getnote)
router.post("/",protect,noteController.postnote)
router.put("/:id",protect,noteController.updatenote)
router.delete("/:id",protect,noteController.deletenote)

module.exports=router

