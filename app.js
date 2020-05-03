const express = require("express");
const mongoose = require("mongoose");
const bodyParser= require("body-parser");
const app = express();

// For Test Cases
// process.env.ENV = "Test";
if(process.env.ENV === 'Test')
{
  const db = mongoose.connect("mongodb://localhost:27017/itiDB_Test");
}
  
else
{
  const db = mongoose.connect("mongodb://localhost:27017/itiDB");
}

var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


// Models
const studentSchema = require("./Models/StudentModel");

// Routers & Inject The Models
StudentRouter=require("./Routers/StudentsRouter")(studentSchema);
DepartmentRouter=require("./Routers/DepartmentsRouter");
CourseRouter = require("./Routers/CoursesRouter");


app.get("/", (req, res) => {
  studentSchema.find({}).then((data) => res.send(data))
});

app.use("/student",StudentRouter);
app.use("/Departments",DepartmentRouter);
app.use("/Courses",CourseRouter);
app.use((request,response)=>{
    response.send("Not Found");
});

app.server =  app.listen(port, () => {
  console.log("Listening on Port 8000...");
});

module.exports = app;