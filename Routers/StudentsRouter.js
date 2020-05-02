let express=require("express");
mongoose=require("mongoose");
const studentsController = require("../controllers/studentsController");
let StudentRouter=express.Router();
path=require("path");
require("../Models/StudentModel");
let studentSchema=mongoose.model("Students");
const controller = studentsController(studentSchema);

// List All Student Data
StudentRouter.get("/list", controller.get);

// Add New Student
StudentRouter.post("/add", controller.post);

// MiddleWare Injected In The Router To Find Student By ID
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
    const { student } = request;
    student.Name = request.body.Name;
    student.Department = request.body.Department;
    student.Email = request.body.Email;
    student.Courses = request.body.Courses;
    student.Department = request.body.Department
    student.save((err) =>{
        if(err)
            return response.send(err);
        return response.json(student);
    });
});

// Update Specific Information
StudentRouter.patch("/:id",(request,response)=>{
    const { student } = request;
    if(request.body._id)
        delete request.body._id;
    Object.entries(request.body).forEach((item) => {
        console.log(item);
        const key = item[0];
        const value = item[1];
        student[key] = value;
    });
    student.save((err) =>{
        if(err)
            return response.send(err);
        return response.json(student);
    });

});

// Delete Student
StudentRouter.delete("/:id",(request,response)=>{
    request.student.remove((err) => {
        if(err)
            return response.send(err);
        return response.sendStatus(204);
    });
});
module.exports=StudentRouter;
