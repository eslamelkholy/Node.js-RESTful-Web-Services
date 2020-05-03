function studentController(studentSchema)
{
    // Add New Student
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
    // List all Students
    function get(request, response){
        studentSchema.find({}).populate({path :"Courses Department"}).then((students) =>{
            return response.json(getJsonStudents(students, request));
        }).catch((err) =>{
            return response.send(err);
        });
    }
    // Update Student Data
    function put(request, response){
        student = putStudentData(request);
        student.save((err) =>{
            if(err)
                return response.send(err);
            return response.json(student);
        });
    }
    // Update specified Information about Student
    function patch(request, response){
        student = patchStudentData(request);
        student.save((err) =>{
            if(err)
                return response.send(err);
            return response.json(student);
        });
    }
    // Delete Student
    function deleteStudent(request, response){
        request.student.remove((err) => {
            if(err)
                return response.send(err);
            return response.sendStatus(204);
        });
    }
    return {post, get, put, patch, deleteStudent};
}

// Get All Students
function getJsonStudents(students, request){
    const returnStudents = students.map((student) =>{
        const newStudent = student.toJSON();
        newStudent.links = {};
        newStudent.links.self = `http://${request.headers.host}/student/${newStudent._id}`;
        return newStudent;
    });
    return returnStudents;
}
// Handle Student Data
function putStudentData(request){
    if(request.body._id)
        delete request.body._id;
    const { student } = request;
    student.Name = request.body.Name;
    student.Department = request.body.Department;
    student.Email = request.body.Email;
    student.Courses = request.body.Courses;
    student.Department = request.body.Department
    return student;
}
// Handle Patch Student Data
function patchStudentData(request){
    const { student } = request;
    if(request.body._id)
        delete request.body._id;
    Object.entries(request.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        student[key] = value;
    });
    return student;
}
module.exports = studentController;

// Short Description About what this Controller Do
/*
    1- it Takes A Model Called StudentSchema
    Which Were Injected In The Routers
    2- Every Function Here takes the call Back Arguments
    and Returns The Response
*/