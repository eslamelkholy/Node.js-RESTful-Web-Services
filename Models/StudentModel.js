const mongoose=require("mongoose");
var autoIncrement = require('mongoose-auto-increment'); //1. Require Auto Increment Package
const studentSchema=new mongoose.Schema({
    _id:Number,
    Name:{ type: String},
    Email:{ type : String},
    Department:{
        type:Number,
        ref:"Departments"
    },
    Courses: [{type :Number, ref : "Courses"}]
});

autoIncrement.initialize(mongoose.connection); // 2. initialize autoIncrement 
studentSchema.plugin(autoIncrement.plugin, 'Students'); // 3. use autoIncrement
//mapping
module.exports =  mongoose.model("Students",studentSchema);
