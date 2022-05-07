import 'dotenv/config'
import express from "express"
import bodyParser from "body-parser"
import ejs from "ejs"
import mongoose from "mongoose"
import md5 from "md5"



const app = express()

console.log(process.env.SECRET);

app.use(express.static("public"))
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))


mongoose.connect('mongodb://localhost:27017/userDB');

const userSchema = new mongoose.Schema({
  email: String,
  password: String
})



const User = new mongoose.model("User", userSchema)

app.get("/", (req,res)=> {
  res.render("home")
})
app.get("/login", (req,res)=> {
  res.render("login")
})
app.get("/register", (req,res)=> {
  res.render("register")
})

app.post("/register", (req, res)=>{
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password)
  })

  newUser.save((err)=>{
    if(err){
      console.log(err);
    }else{
      res.render("secrets")
    }
  })
})

app.post("/login", (req, res)=>{
  const username = req.body.username
  const password = md5(req.body.password)

  User.findOne({email:username}, (err, foundUser)=>{
    if(err){
      console.log();
    }else{
      if(foundUser){
        if (foundUser.password = password){
          res.render("secrets")
        }
      }
    }
  })
})




app.listen(3000, ()=> {console.log("Server Port 3000")})
