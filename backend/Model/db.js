const mongoose=require("mongoose");//it helps in forming connection b/w node.js and mongoDB.
//help define schemas

const mongo_url=process.env.MONGO_CONN;

mongoose.connect(mongo_url)
.then(()=>{
    console.log('MongoDB connected');
}).catch((err)=>{
    console.log('MongoDB NOT connected')
})