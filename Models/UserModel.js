const mongoose=require("mongoose");
const studentSchema=new mongoose.Schema({
    username:{ type: String, required: true},
    Email:{ type : String,unique:true},
    password:{type:String},
});
//mapping
module.exports =  mongoose.model("Users",studentSchema);
