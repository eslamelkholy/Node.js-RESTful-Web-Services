const bcrypt = require("bcrypt");
function usersController(userSchema)
{
    // List Users
    get = async (request, response, next) =>{
        try{
            const users = await userSchema.find({});
            return response.json(users);
        }catch{
            return response.send(err);
        }
    }
    // User Registeration
    post = async(request, response) =>{
        try{
            const user = await saveUserData(userSchema, request);
            await user.save();
            response.status(201);
            return response.json(user);
        }catch(err){
            response.status(500);
            return response.send("Please Fill Required Fields");
        }
    }
    // Login User
    login = async(request, response) =>{
        try{
            const user = await userSchema.findOne({"username" : request.body.username});
            if(user == null)
                return response.status(400).send("User Not Found");
            if(await bcrypt.compare(request.body.password, user.password))
                response.send({authenticated: true});
            response.send({authenticated: false});
        }catch{
            response.status(500).send();
        }
    }
    return {get, post, login};
}


// Function that Encrypt my Userpassword and return it
saveUserData = async(userSchema, request) =>{
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = new userSchema({
        username: request.body.username,
        password: hashedPassword,
        email: request.body.email
    });
    return user;
}

module.exports = usersController;