const express =require("express")
const router = express.Router();
const UserController=require("../controllers/User")


router.post('/register',UserController.createUser)
router.post('/login',UserController.loginUser)


router.all("/*", async function(req,res){
    return res.status(400).send({status:false,message:"404 , Page Not Found"})
})


module.exports=router;