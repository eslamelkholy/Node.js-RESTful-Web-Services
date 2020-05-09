const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    username:{ type: String, required: true},
    email:{ type : String, require: true, index:true, unique:true,sparse:true},
    password:{type:String, require:true},
});
//mapping
module.exports =  mongoose.model("Users",userSchema);
