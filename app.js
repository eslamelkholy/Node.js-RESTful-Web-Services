const express = require("express");
const mongoose = require("mongoose");
const bodyParser= require("body-parser");
const app = express();

process.env.ENV = "Test";
if(process.env.ENV === 'Test'){
  const db = mongoose.connect("mongodb://localhost:27017/itiDB_Test");
}else{
  const db = mongoose.connect("mongodb://localhost:27017/itiDB");
}

var port = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

// Models
require("./Models/CourseModel");
require("./Models/DepartmentModel");
const studentSchema = require("./Models/StudentModel");
const userSchema = require("./Models/UserModel");

// Routers & Inject The Models
StudentRouter=require("./Routers/StudentsRouter")(studentSchema);
UserRouter = require("./Routers/UsersRouter")(userSchema);

app.use("/user", UserRouter);
app.use("/student",StudentRouter);

app.use((request,response)=>{
    response.send("Not Found");
});

app.server =  app.listen(port, () => {
  console.log("Listening on Port 8000...");
});

module.exports = app;