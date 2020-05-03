require("should");

const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const studentSchema = require("../Models/StudentModel");
const agent = request.agent(app);

describe("Student CRUD Integeration Test", () => {
    it("should allow a student to be Posted and return data with Name" , (done) => {
        const studentPost = { Name: "Eslam ELkholy", Email: "Eslam@gmail.com", Department: 1, Courses: [2, 4]};
        // It's Like Black-box Testing
        agent.post("/student/add")
        .send(studentPost)
        .expect(201)
        .end((err, results) => {
            console.log(results.body)
            results.body.should.have.property("Name");
            done();
        });
    });
    // Clean Up The Data After Test And Close Connection & Express
    afterEach((done) => {
        studentSchema.deleteMany({}).exec();
        done();
    });
    after((done) => {
        mongoose.connection.close();
        app.server.close(done())
    })
});