import { User } from './../entity/user.entity';
import { Request, Response } from "express"
import { RegisterValidation } from "./validation/register.validation";
import { getManager } from "typeorm";
import  bcryptjs  from "bcryptjs";

export const Register =  async (req: Request, res: Response) => {

    const body = req.body;

    /** Validate the request inputs */
    const {error} = RegisterValidation.validate(body);

    if (error) {
        return res.status(400).send({
            success: false,
            message: error.details
        })
    }

    /** Check if the password match */
    if (body.password !== body.password_confirm) {
        return res.status(400).send({
            success: false,
            message: "Password does not match"
        });
    }

    const repository = getManager().getRepository(User);

    const {password, ...user} = await repository.save({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: await bcryptjs.hash(body.password, 10),
    });

    res.send(user);

}

export const Login = async (req:Request, res:Response) => {

    const repository = getManager().getRepository(User);
    const user = await repository.findOne({email: req.body.email});

    /** Check if user exist */
    if(!user){
        return res.status(404).send({
            message: "Invalid credentials",
            success: false
        })
    }

    if(!await bcryptjs.compare(req.body.password, user.password)){
        return res.status(400).send({
            message: "Invalid credentials",
            success: false
        })
    }

    const {password, ...data} = user;

    res.send(data);

}