const express=require("express")
const router=express.Router()
var jwt = require('jsonwebtoken');
const {ObjectId}=require("mongodb")
const UserModel=require("../models/UserModel")
router.post("/register",async(req,res)=>{
    const objectId = new ObjectId();
    let already_exist= await UserModel.findOne({email:req.body.email});
    if(already_exist!=null){
        // console.log("user existe")
        return res.status(201).send("usr company already exist")
    }
    if(req.body.admin_password!=process.env.ADMIN_PASSWORD){
        return res.status(201).json({"response":"incorrect admin password"})
    }
    const user1=new  UserModel({_id:objectId,email:req.body.email,name:req.body.name,password:req.body.password})
    await user1.save()
    // console.log("res is ",resp)
    return res.status(200).json({"response":"created company successfully"});
})
router.post("/login",async(req,res)=>{
    // console.log("req.test",req.test)
    let already_exist= await UserModel.findOne({email:req.body.email});
    if(already_exist==null){
        // console.log("user doesnot existe")
        return res.status(201).json({"response":"usr  does not already exist,register"})
    }
    else{
        // console.log("pass=",already_exist.password)
        if(already_exist.password==req.body.password){
        var token = jwt.sign({ user: req.body.email}, process.env.JWTKEY);
        return res.status(200).json({'token':token})
        }
        else{
            return res.status(201).json({"response":"incorrect details"})
        }
    }
})
router.all("/",(req,res)=>{
    return res.send("hi from /auth")
})
module.exports=router