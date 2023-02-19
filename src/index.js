const express=require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const route = require("../src/routes/route");

const app= express()  


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/views",express.static("views"))

app.set("view engine","ejs")

app.get("",(req,res)=>{
    res.render("signUp")
})

app.get("/",(req,res)=>{
    res.send("boom gus this is wprking")
})

app.get("/views/login.ejs",(req,res)=>{
    res.render("login")
 })

 app.get("/views/home",(req,res)=>{
    res.redirect("/")
 })

 app.get("/index.ejs",(req,res)=>{
    res.render("index")
 })

mongoose.connect("mongodb+srv://Bhuwan:fake2fake@cluster0.iq956rr.mongodb.net/sign_up?retryWrites=true&w=majority", {useNewUrlParser:true})
.then(()=> console.log("MongoDb is connected"))
.catch(err => console.log(err))

app.use('/',route)

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});