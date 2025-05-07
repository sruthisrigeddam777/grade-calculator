const express = require('express')
const app = express()
const nodemailer = require('nodemailer');
const middleware=require("./middlewares/authMiddleWare")
const cors = require('cors') 
require('dotenv').config()
app.use(express.json());
app.use(cors()); 

const port = 3001
const database1=require("./db/db1")
database1.connection()
app.use("/route1",require("./routes/route1"))
app.use("/auth",require("./routes/auth"))
app.use(middleware)
app.use("/profile",require("./routes/profile"))
app.use(express.static('frontend/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})