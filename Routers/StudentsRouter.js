const express=require("express");

const studentsController = require("../controllers/studentsController");

// Router Where StudentModel Were Injected in It in App.js
function routes(studentSchema)
{
    const StudentRouter=express.Router();
    const controller = studentsController(studentSchema);
    
    StudentRouter.route("/list").get(controller.get);
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
    .get((request,response)=> response.json(getStudent(request)))
    .put(controller.put)
    .patch(controller.patch)
    .delete(controller.deleteStudent);

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