const express=require("express");
const {registeruser,loginuser,logoutuser} = require("../controllers/authcontroller");
const router=express.Router();



router.post("/register", registeruser);
router.post("/login", loginuser);
router.post("/logout", logoutuser);

module.exports = router;