function studentController(studentSchema)
{
    function post(request, response){
        const student=new studentSchema(request.body);
        if(!request.body.Name)
        {
            response.status(400);
            return response.send("Name is Required");
        }
        student.save();
        response.status(201);
        return response.json(student);
    }
    function get(request, response){
        studentSchema.find({}).populate({path :"Courses Department"}).then((students) =>{
            return response.json(getStudents(students, request));
        }).catch((err) =>{
            return response.send(err);
        });
    }
    return {post, get};
}

// Get All Students
function getStudents(students, request){
    const returnStudents = students.map((student) =>{
        const newStudent = student.toJSON();
        newStudent.links = {};
        newStudent.links.self = `http://${request.headers.host}/student/${newStudent._id}`;
        return newStudent;
    });
    return returnStudents;
}
module.exports = studentController;

// Short Description About what this Controller Do
/*
    1- it Takes A Model Called StudentSchema
    Which Were Injected In The Routers
    2- Every Function Here takes the call Back Arguments
    and Returns The Response
*/