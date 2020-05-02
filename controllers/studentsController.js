function studentController(studentSchema)
{
    function post(request, response){
        const student=new studentSchema(request.body);
        student.save();
        return response.status(201).json(student);
    }
    function get(request, response){
        studentSchema.find({}).populate({path :"Courses Department"}).then((speakers) =>{
            return response.json(speakers);
        }).catch((err) =>{
            return response.send(err);
        });
    }
    return {post, get};
}
module.exports = studentController;