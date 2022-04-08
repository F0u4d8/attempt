const express = require('express');
const env = require("./config/envConfig")
const connect = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const categoryRoute = require("./routes/Category")

const cors = require("cors")


const app = express();

// database connection
connect();

app.use(cors())


//add middleware
app.use(express.json())



app.get("/" ,(req,res)=>{

res.json({msg: 'welcome to server 88'})

})


//user routes

app.use('/api',userRoutes)

//category routes

app.use('/api' , categoryRoute)


const port =env.PORT || 5000;

app.listen(port,()=>{console.log(`your server is running at port : ${port}`)})