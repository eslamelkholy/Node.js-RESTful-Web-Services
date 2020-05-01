let express=require("express");
mongoose=require("mongoose");

let StudentRouter=express.Router();
path=require("path");
require("../Models/StudentModel");
let studentSchema=mongoose.model("Students");

// List All Student Data
StudentRouter.get("/list",(request,response)=>{
    studentSchema.find({}).populate({path :"Courses Department"}).then((speakers) =>{
        return response.json(speakers);
    }).catch((err) =>{
        response.send(err);
    });
});
// Add New Student
StudentRouter.post("/add",(request,response)=>{
    let student=new studentSchema(request.body);
    student.save((err)=>{
        if(!err)
            return response.json(student);
        return response.send(err);
    });
});

// MiddleWare Inject In The Router To Find Student By ID
StudentRouter.use("/:id", (request, response, next) => {
    studentSchema.findById(request.params.id, (error, student)=>{
        if(error)
            return response.send(error);
        if(student)
        {
            request.student = student;
            return next();   
        }
        return response.sendStatus(404)
    });
});

// Get Student By ID
StudentRouter.get("/:id",(request,response)=> response.json(request.student));

// Update Student Details 
StudentRouter.put("/:id",(request,response)=>{
    student = request.student
    student.Name = request.body.Name;
    student.Department = request.body.Department;
    student.Email = request.body.Email;
    student.Courses = request.body.Courses;
    student.Department = request.body.Department
    student.save();
    return response.json(student);
});

// Update Specific Information
StudentRouter.patch("/:id",(request,response)=>{
    studentSchema.deleteOne({_id:request.params.id},(error)=>{
        if(!error)
            return response.json({data:"deleted"})
        return response.send(error);
    })
});
StudentRouter.get("/:id",(request,response)=>{
    studentSchema.deleteOne({_id:request.params.id},(error)=>{
        if(!error)
            return response.json({data:"deleted"})
        return response.send(error);
    })
});
module.exports=StudentRouter;
