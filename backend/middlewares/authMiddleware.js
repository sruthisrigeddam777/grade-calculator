const express=require("express")
var jwt = require('jsonwebtoken');
const router=express.Router()
router.use((req,res,next)=>{
    req.test=1
    if(req.body.givenToken==undefined){
        return res.status(201).json({"msg":"no token?give token"})
    }
    req.userEmail=jwt.decode(req.body.givenToken,process.env.JWTKEY)
    next()
})
module.exports=router;