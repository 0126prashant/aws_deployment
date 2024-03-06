const jwt = require("jsonwebtoken")
require ("dotenv").config();

const auth = async(req,res,next)=>{
      const token = req.headers.authorization?.split(" ")[1]
    //   console.log(token)
    try {
        if(token){
            const decoded = jwt.verify(token,process.env.secretKey)
            console.log(decoded)
            req.userID = decoded.userID;
            req.name = decoded.username;
            next()
        }
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

 module.exports = {
    auth
 }