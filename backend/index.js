const express= require ("express");
const app=express();
const bodyParser=require('body-parser');//handle incoming request data, especially when a user submits a form or sends JSON data.
const cors=require('cors');;
const AuthRouter=require("./Routes/AuthRouter.js")
const ProductRouter=require("./Routes/ProductRouter.js")
require('dotenv').config();
require('./Model/db.js')
const PORT=process.env.PORT || 8080;

app.get("/ping",(req,res)=>{
    res.send("pong");
});
app.use(bodyParser.json());
app.use(cors());
app.use('/auth',AuthRouter);
app.use('/products',ProductRouter);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})