function studentController(studentSchema)
{
    // Add New Student
    post= async(request, response)=>{
        try{
            const student=new studentSchema(request.body);
            await student.save();
            response.status(201);
            return response.json(student);
        }catch{
            response.status(400);
            return response.send("Please Fill Required Fields");
        }
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
    async function put(request, response){
        try{
            const student = putStudentData(request);
            await student.save();
            return response.json(student);
        }catch(err){
            return response.send(err);
        }
    }
    // Update specified Information about Student
    async function patch(request, response){
        try{
            const student = patchStudentData(request);
            await student.save();
            return response.json({success: true});
        }catch{
            return response.status(404).json({success: false});
        }
    }
    // Delete Student
    async function deleteStudent(request, response){
        try{
            request.student.remove();
            return response.json({success: true});
        }catch{
            return response.status(404).json({success: false});
        }
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
    request = filterStudentData(request);
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
    request = filterStudentData(request);
    const { student } = request;
    Object.entries(request.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        student[key] = value;
    });
    return student;
}
// Filter Student Data
function filterStudentData(request)
{
    if(request.body._id)
        delete request.body._id;
    return request;
}
module.exports = studentController;

// Short Description About what this Controller Do
/*
    1- it Takes A Model Called StudentSchema
    Which Were Injected In The Routers
    2- Every Function Here takes the call Back Arguments
    and Returns The Response
*/