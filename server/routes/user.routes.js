const express = require("express")
const { UserModel } = require("../models/user.model")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require ("dotenv").config();

// for register
userRouter.post("/register",async( req,res)=>{
    const {email,password} = req.body
    const userExist = await UserModel.findOne({email})
    try {
        if(userExist){
            res.status(400).json({error : "user Already present"})
        }
        if(checkPass(password)){
            const hashPass = bcrypt.hashSync(password,7)
            const user = new UserModel({...req.body,password:hashPass})
            await user.save()
            return res.status(200).json({msg:"The new user has been registered",registeredUser:user})
        }
        else{
            res.status(400).json({error : "Check the password"}) 
        }
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
   
})
// for login
userRouter.post("/login",async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existinguser= await UserModel.findOne({email});
        if (!existinguser){
           
            return res.status(404).json({msg:"user not found,please create account"})
        }
        bcrypt.compare(password,existinguser.password,async(err,result)=>{
            if (result){
                const token=jwt.sign({userID:existinguser._id,username:existinguser.name},process.env.secretKey);
                return res.status(200).json({msg:"login successfully",token:token,username:existinguser.name})

            }
            else{
                return res.status(400).json({error:"Wrong credientials"})
            }
        })
    
    } catch (error) {
     res.status(500).json({error:error.message})
    }
})


module.exports = {
    userRouter
}






// => At least one uppercase character
// => At least one number
// => At least a special character
// => The length of password should be at least 8 characters long
// If a user already exist, a new user with same email cannot register, send appropriate response in this case.
function checkPass(pass){
    if(pass.length<8){
       return false
    }
    let alp ="abcdefghijklmnopqrstuvwxyz"
    let num = "0123456789"
    let spc = "!@#$%^&*(){}[]=-/`~_"
 
    let flag1 = false
    let flag2 = false
    let flag3 = false
 
    for(let i=0;i<pass.length;i++){
     if(alp.includes(pass[i])){
         flag1 =true
     }
     if(num.includes(pass[i])){
         flag2 =true
     }
     if(spc.includes(pass[i])){
         flag3 =true
     }
    }
    return flag1 && flag2 && flag3 ? true :false
 }
 // console.log(checkPass("hello@12344"))