const express = require("express");
const { userRouter } = require("./routes/user.routes");
const cors = require('cors');
const { listRouter } = require("./routes/list.routes");
const { connection } = require("mongoose");
const app = express()
require ("dotenv").config();
app.use(express.json());
app.use(cors())

// Here are the routes present

app.get("/",async(req,res)=>{

    try {
        res.status(200).send("hello from backend")
    } catch (error) {
        res.status(400).send({error:error.message})
    }

})
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
