const should = require("should");
const sinon = require("sinon");
const studentsController = require("../controllers/studentsController");

describe("Student Controller Tests: ",() => {
    describe("Post" ,() =>{
        it("Should not allow to add Empty Name ", ()=>{
            const studentSchema = function(student){
                this.save = () => {};
            }
            const request = {
                body : {
                    Email: "EslamElkholy@gmail.com",
                }
            }
            const response = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            }
            const controller = studentsController(studentSchema);
            controller.post(request, response)
            // Bad Request
            response.status.calledWith(400).should.equal(true, `Bad Status: ${response.status.args[0][0]}`);
            response.send.calledWith("Name is Required").should.equal(true);
        })
    });
});