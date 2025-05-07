const express = require("express");
const router = express.Router();
const nodemailer=require("nodemailer")
const { spawn } = require("child_process");
const PointsModel=require("../models/PointsModel")
const {ObjectId}=require("mongodb")

router.post("/", async (req, res) => {
    console.log("in route1");
    let exists=await PointsModel.findOne({IdNumber:req.body.studentId})
    if(exists!=null){
        return res.json({"points":"your points already calculated!(issues? contact admin)"})
    }
    // const scriptPath = "C:\\home\\radha\\Documents\\summer_holidays\\points_of_a_student\\backend\\routes\\py1.py";
    const scriptPath=__dirname+"/main_calc.py"
    const x = spawn("python", [scriptPath,req.body.studentId,req.body.studentpass]);
    console.log(typeof(x))
    x.stdout.on("data", async (data) => {
        // console.log(`stdout: ${data}`);
        data=data.toString().slice(0,-1)
        const objectId = new ObjectId();
        let idnumber="N"+req.body.studentId.slice(1)
        const user1=new PointsModel({_id:objectId,IdNumber:idnumber,Points:data})
       await user1.save()
       let email="n".concat(req.body.studentId.slice(1))
       email=email.concat("@rguktn.ac.in");
       const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'm0wn1ka0001@gmail.com',
          pass: process.env.secret_mail,
        },
      });
      let text=`hi there
      your grade points of e1s1 to e2 s2 has been calulated 
      and here is your grade is :`;
      text=text.concat(data)
      const mailOptions = {
        from: 'm0wn1ka0001@gmail.com',
        to:email,
        subject:"your points calulated by mini_project",
        text:text
     
      };

      try{
        const result=await transporter.sendMail(mailOptions);
        console.log(result)
        console.log("success sent of mail")
      }catch(err){
        // res.status(500).json({ error: 'Failed to send email' });
        console.log("fail of mail")
        console.log(err)

      }

        return res.json({"points":data})
    });

    x.stderr.on("data", (data) => {
        // console.error(`stderr: ${data}`);
        return res.status(500).send("Error executing script");
    });

    // x.on("close", (code) => {
    //     console.log(`child process exited with code ${code}`);
    //     return res.send("hi");
    // });

    x.on("error", (error) => {
        // console.error(`Failed to start subprocess: ${error.message}`);
        return res.status(500).send(error.toString());
    });
});
router.post("/getData",async(req,res)=>{
    // console.log("in/getData",req.body)
    let exists=await PointsModel.findOne({IdNumber:req.body.IdNumber})
    if(exists==null){
        return res.json({"points":"your points not already calculated!(issues? contact admin)"})
    } 
    else{
        // console.log("exists /getData",exists,"of type,,,",typeof(exists))
        return res.json({"points":exists.Points})
    }
})
module.exports = router;
