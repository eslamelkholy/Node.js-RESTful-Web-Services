require("should");

const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const studentSchema = require("../Models/StudentModel");
const agent = request.agent(app);

describe("Student CRUD Integeration Test", () => {
    describe("Student Post Test : ", () =>{
        it("should allow a student to be Posted and return data with Name" , (done) => {
            const studentPost = { Name: "Eslam ELkholy", Email: "Eslam@gmail.com", Department: 1, Courses: [2, 4]};
            // It's Like Black-box Testing
            agent.post("/student")
            .send(studentPost)
            .expect(201)
            .end((err, results) => {
                results.body.should.have.property("Name");
                results.body.should.have.property("Email");
                done();
            });
        });
        it("Shouldn't Allow Student To Enter Empty Email", (done) =>{
            const studentPost = { Name: "Eslam ELkholy"};
            agent.post("/student")
            .send(studentPost)
            .expect(422)
            .end((err, result) =>{
                done();
            });
        })
        it("Student Must enter only a Valid Email", (done) =>{
            const studentPost = { Name: "Eslam", Email: "eslam2"};
            agent.post("/student")
            .send(studentPost)
            .expect(422)
            .end((err, result) => done());
        });
        it("Shouldn't enter an Empty Name", (done) =>{
            const studentPost = {Email: "HelloEslam@gmail.com"};
            agent.post("/student")
            .send(studentPost)
            .expect(422)
            .end((err, res) => done());
        });
    })
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