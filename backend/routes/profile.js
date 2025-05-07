const express=require("express")
const router=express.Router()
// const middle1=require("../middlewares/authMiddleWare")
const UserModel=require("../models/UserModel")
// router.use("/",middle1)
router.post("/",async(req,res)=>{
    // console.log("req.useremail",req.userEmail.user)
    // console.log("req.body in profiel ",req.body)

    let user1= await UserModel.findOne({email:req.userEmail.user});
    // console.log("user email ::",user1.email)
    let result={"name":user1.name,"email":user1.email}
    return res.status(200).json(result)
})
module.exports=router