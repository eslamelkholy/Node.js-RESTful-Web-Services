const bcrypt = require("bcrypt");
function usersController(userSchema)
{
    // List Users
    get = async (request, response, next) =>{
        try{
            const students = await userSchema.find({});
            return response.json(students);
        }catch{
            return responseponse.send(err);
        }
    }
    // User Registeration
    post = async(request, response) =>{
        try{
            const hashedPassword = await bcrypt.hash(request.body.password, 10);
            const user = new userSchema({
                username: request.body.username,
                password: hashedPassword,
                email: request.body.email
            });
            await user.save();
            response.status(201);
            return response.json(user);
        }catch{
            response.status(500);
            return response.send("Please Fill Required Fields");
        }
    }
    login = async(request, response) =>{
        const user = userSchema.find({username: request.body.username});
        if(user == null)
            return response.status(400).send("User Not Found");
        try{
            if(await bcrypt.compare(request.body.password, user.password))
                response.send({authenticated: true});
            response.send({authenticated: false});
        }catch{
            response.status(500).send();
        }
    }
    return {get, post, login};
}

module.exports = usersController;