let express=require("express"),
CourseRouter=express.Router(),
path=require("path"),
mongoose=require("mongoose");


CourseRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
require("../Models/CourseModel");
require("../Models/StudentModel");

let CourseSchema = mongoose.model("Courses");

CourseRouter.post("/add",(request, response) =>{
    let newCourse = new CourseSchema({
        _id : request.body._id,
        Name : request.body.Name
    });
    newCourse.save((err) =>{
        if (!err)
            CourseSchema.findOne({_id : request.body._id}, (error, result)=>{
                response.send(result);
            });
        else
            response.send(err);
    });
});

CourseRouter.get("/list", (request, response) =>{
    CourseSchema.find({},(error, result) =>{
        response.send(result);
    });
});

CourseRouter.get("/details/:id", (request, response) =>{
    CourseSchema.findOne({_id:request.params.id},(error,result)=>{
        if(!error)
            response.send(result)
        else
            console.log(error);
    });
});

CourseRouter.post("/edit", (request, response) =>{
    CourseSchema.updateOne({_id : request.body._id}, {
        "$set" :{
            _id : request.body._id,
            Name : request.body.Name
        }
    },(err) =>{
        if(!err)
            response.json("Updated");
        else
            response.send("Failed!!!!");
    })
});
CourseRouter.get("/delete/:id", (request, response) =>{
    CourseSchema.findOneAndDelete({_id : request.params.id})
    .then(result => response.json("Deleted"))
    .catch(err => console.log(err));
})
module.exports = CourseRouter;