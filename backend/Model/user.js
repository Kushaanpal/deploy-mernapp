const mongoose=require('mongoose');
const Schema=mongoose.Schema;//schema is a way to define structure of your data

const UserSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
    }
});

const UserModel=mongoose.model('users',UserSchema);// turns your schema into a model you can use to create, read, update, or delete users in the database.
module.exports=UserModel;