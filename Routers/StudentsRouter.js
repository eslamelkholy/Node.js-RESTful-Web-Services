const express=require("express");

const studentsController = require("../controllers/studentsController");

// Router Where StudentModel Were Injected in It in App.js
function routes(studentSchema)
{
    const StudentRouter=express.Router();
    const controller = studentsController(studentSchema);
    
    // List All Student Data
    StudentRouter.route("").get(controller.get);
    // Add New Student
    StudentRouter.route("/add").post(controller.post);
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
    StudentRouter.route("/:id")
    // Get Student By ID
    .get((request,response)=> response.json(getStudent(request)))
    // Update Student Details 
    .put((request,response)=>{
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
    })
    // Update Specific Information
    .patch((request,response)=>{
        const { student } = request;
        if(request.body._id)
            delete request.body._id;
        Object.entries(request.body).forEach((item) => {
            const key = item[0];
            const value = item[1];
            student[key] = value;
        });
        student.save((err) =>{
            if(err)
                return response.send(err);
            return response.json(student);
        });
    
    })
    // Delete Student By ID
    .delete((request,response)=>{
        request.student.remove((err) => {
            if(err)
                return response.send(err);
            return response.sendStatus(204);
        });
    });

    return StudentRouter;
}
// Solve the Request and Returns Student 
function getStudent(request)
{
    const returnStudent = request.student.toJSON();
    returnStudent.links = {};
    const Name = request.student.Name;
    returnStudent.links.FilterByThisName = `http://${request.headers.host}/student/?Name=${Name}`;
    return returnStudent;
}

module.exports = routes;
