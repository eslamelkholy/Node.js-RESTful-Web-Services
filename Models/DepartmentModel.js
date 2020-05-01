let mongoose=require("mongoose");


let DepartmentSchema=new mongoose.Schema({
    _id:Number,
    Name:String,
   
});

//mapping
mongoose.model("Departments",DepartmentSchema);

