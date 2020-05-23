require("should");

const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const studentSchema = require("../Models/StudentModel");
const agent = request.agent(app);

describe("Student RESTful Api's Integeration Test", () => {
    describe("Student List [GET] :",() =>{
        it("Should Retruns Array Of Objects", (done) =>{
            agent.get("/student")
            .expect(200)
            .end((err, res) => done())
        })
    })
    describe("Student Add [POST] : ", () =>{
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
                result.body.should.have.property("errors")
                done();
            });
        })
        it("Student Must enter only a Valid Email", (done) =>{
            const studentPost = { Name: "Eslam", Email: "eslam2"};
            agent.post("/student")
            .send(studentPost)
            .expect(422)
            .end((err, result) => {
                result.body.should.have.property("errors")
                done();
            });
        });
        it("Shouldn't enter an Empty Name", (done) =>{
            const studentPost = {Email: "HelloEslam@gmail.com"};
            agent.post("/student")
            .send(studentPost)
            .expect(422)
            .end((err, result) => {
                result.body.should.have.property("errors")
                done();
            });
        });
        it("Shouldn't Allow To Add _id ", (done) =>{
            const student = {Email: "Hello@Email.com", Name:"EslamName", _id:"0"}
            agent.post("/student")
            .send(student)
            .expect(400)
            .end((err,result) =>{
                done();
            })
        })
        it("Shouldn't Allow User To Add Duplicated Name", (done) =>{
            const student = {Name: "Dummy Data", Email: "Eslam@Dummy22.com", Department: 1, Courses: [2, 4]}
            agent.post("/student")
            .expect(400)
            .end((err, res) => done());
        })
        it("Shouldn't Allow User To Add Duplicated Email", (done) =>{
            const student = {Name: "Dummy Dataaa", Email: "Eslam@Dummy.com", Department: 1, Courses: [2, 4]}
            agent.post("/student")
            .expect(400)
            .end((err, res) => done());
        })
    });
    describe("Student Update [PUT] : ", () => {
        it("Shouldn't Update Student Information", (done) =>{
            const studentPost = {Name: "Eslam1", Email: "eslam@gmail.com", _id: 0}
            agent.put("/student/0")
            .send(studentPost)
            .expect(204)
            .end((err, result) =>{
                done();
            })
        })
        it("Updated Student Name Must Be Unique", (done) =>{
            const studentPost = {Name: "DummyData2", Email: "eslam@gmail.com", _id: 0}
            agent.put("/student/0")
            .send(studentPost)
            .expect(404)
            .end((err, result) =>{
                done();
            })
        });
        it("Updated Student Email Must be Unique", (done) =>{
            const studentPost = {Name: "DummyData111", Email: "Eslam2@Dummy.com", _id: 0}
            agent.put("/student/0")
            .send(studentPost)
            .expect(404)
            .end((err, result) =>{
                done();
            })
        });
        
    });
    describe("Student Update [PATCH] : ", () => {
        it("Shouldn Update Student Specified Information", (done) =>{
            const studentPost = {Name: "Eslam1", _id: 0}
            agent.patch("/student/0")
            .send(studentPost)
            .expect(204)
            .end((err, result) =>{
                done();
            })
        });
        it("Updated Student Name Must Be Unique", (done) =>{
            const studentPost = {Name: "DummyData2", Email: "eslam@gmail.com", _id: 0}
            agent.put("/student/0")
            .send(studentPost)
            .expect(404)
            .end((err, result) =>{
                done();
            })
        });
        it("Updated Student Email Must be Unique", (done) =>{
            const studentPost = {Name: "DummyData111", Email: "Eslam2@Dummy.com", _id: 0}
            agent.put("/student/0")
            .send(studentPost)
            .expect(404)
            .end((err, result) =>{
                done();
            })
        });
    });
    describe('Student Delete [Delete]: ', () => {
        it("Should Delete Specified Student", (done) =>{
            agent.delete("/student/0")
            .send()
            .expect(200)
            .end((err, result) =>{
                result.body.should.have.property("success").equal(true);
                done();
            })
        })
    });
    // Clean Up The Data After Test And Close Connection & Express
    afterEach((done) => {
        studentSchema.deleteMany({}).exec();
        studentSchema.insertMany([{_id: 0, Name: "DummyData1", Email: "Eslam1@Dummy.com", Department: 1, Courses: [2, 4]},
            {_id: 1, Name: "DummyData2", Email: "Eslam2@Dummy.com", Department: 1, Courses: [2, 4]}]        
        )
        done();
    });
    after((done) => {
        mongoose.connection.close();
        app.server.close(done())
    })
});