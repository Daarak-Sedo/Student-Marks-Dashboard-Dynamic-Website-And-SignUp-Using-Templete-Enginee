const mongoose = require("mongoose");
const userModel = require('../model/UserModel')

const emailregex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
const passwordregex = /^[a-zA-Z0-9!@#$%^&*]{8,15}$/;


//-------------------------------------Create User Api -------------------------------------------------->

const createUser = async function (req, res) {
    try{
    
  const {name,email,password}=req.body

    if(!name) return res.status(400).send({ status: false, message: `Name is required.` });
    
    //------------------------------email validation--------------------------------->
    if (!email)
    return res.status(400).send({ status: false, message: `email is required.` });
         
    if (!emailregex.test(email))
    return res.status(400).send({ status: false, message: ` '${email}' this email is not valid.` });
//    //------------------------------password validation--------------------------------->  
    if (!password)
    return res.status(400).send({ status: false, message: `password is required.` });
         
    if (!passwordregex.test(password))
    return res.status(400).send({ status: false, message: ` Password Length Should be Between 8-15 Caractor.` });
     
    
    let document1 = await userModel.findOne({email:email })
    if (document1) return res.status(400).send({ status: false, message: `this Email is already Registred.` });


    //------------------- After Sucessful Sign Up -  Redirect to Home Page ------------------------>
    const document2 = await userModel.create({name,email,password}).then((x)=>{
        res.redirect('/home')

    })
    // res.status(201).send({ status: true, data: document2 })
    
}catch(error){
     res.status(500).send({message : error.message})
 }
 }



// //-------------------------------------Log In User Api -------------------------------------------------->
 
const loginUser = async (req, res) => {
    try {
        //   let data=req.body
        const { email, password } = req.body;
      
        // //------------------------------email validation--------------------------------->
        if (!email)
            return res.status(400).send({ status: false, message: `Plz Enter email ID.` });
                 
        if (!emailregex.test(email))
            return res.status(400).send({ status: false, message: ` '${email}' this email is not valid.` });
  
        // //------------------------------password validation--------------------------------->
  
        if (!password)
            return res.status(400).send({ status: false, message: `Plz Enter Password` });
      
                
        // //--------------------------------exitsUser----------------------------------->
        const verifyuser = await userModel.findOne({ email:email,password:password});
                
        if (!verifyuser){
            return res.status(401).send({ status: false, message: 'Please Enter Valid Deatials.' });
        }
        else{
            res.redirect("./views/home.ejs")
        }
            
        // return res.write("<h1>Log In Sucessful</h1>")     //-----we can also send this in Responce
  
    }
    catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
  };

  
  module.exports={createUser,loginUser}
