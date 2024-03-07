const express = require("express");
const { userRouter } = require("./routes/user.routes");
const cors = require('cors');
const { listRouter } = require("./routes/list.routes");
const { connection } = require("mongoose");
const app = express()
require ("dotenv").config();
app.use(express.json());
app.use(cors())
const path = require("path")
// const _dirname = path.dirname("")
app.use(express.static(path.join(__dirname, "../client/build")));

// netflix_aws\client\build
app.get("/*",(req,res)=>{
    res.sendFile(
        path.join(__dirname,"../client/build/index.html"),
        // path.join(__dirname,"../client/build/index.html"),
        function(err){

            if(err){
                res.status(500).send(err)
            }
        }
    )

})
// Here are the routes present


app.use("/users",userRouter)
app.use("/list",listRouter)


app.listen(process.env.port,async()=>{
 
    try {
        await connection;
        console.log(`Server is running at Port ${process.env.port} and also connected to DataBase`)
    } catch (error) {
        console.log(error.message)
    }
})
