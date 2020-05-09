const express = require("express");
const usersController = require("../controllers/usersController");

function routes(userSchema)
{
    const UsersRouter = express.Router();
    const controller = usersController(userSchema);

    UsersRouter.route("").get(controller.get);
    UsersRouter.route("").post(controller.post);
    UsersRouter.route("/login").post(controller.login);
    UsersRouter.use("/:id", async(request, response, next) =>{
        try{
            const user = await userSchema.findById(request.params.id);
            if(user == null)
                return response.status(400).send("Cannot Find User");
            request.user = user;
            return next();
        }catch{
            response.status(500).send();
        }
    });

    return UsersRouter;
}

module.exports = routes;