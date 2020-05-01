let mongoose=require("mongoose");

let studentSchema=new mongoose.Schema({
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
mongoose.model("Students",studentSchema);