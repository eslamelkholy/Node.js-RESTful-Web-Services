const mongoose=require("mongoose");

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

//mapping
module.exports =  mongoose.model("Students",studentSchema);
