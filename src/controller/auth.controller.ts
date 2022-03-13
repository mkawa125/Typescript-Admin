import { User } from './../entity/user.entity';
import { Request, Response } from "express"
import { RegisterValidation } from "./validation/register.validation";
import { getManager } from "typeorm";
import  bcryptjs  from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

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

    /** Check if passwords match */
    if(!await bcryptjs.compare(req.body.password, user.password)){
        return res.status(400).send({
            message: "Invalid credentials",
            success: false
        })
    }

    const payload = {id: user.id}

    const token = sign(payload, "secret")

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    const {password, ...data} = user;

    return res.status(200).send({
        message: "Success",
        developerMessage: "User authenticated",
        data: data,
    });

}


export const AuthenticateUser = async (req:Request, res:Response) => {

    try {
        const jwt = req.cookies['jwt'];
        const payload: any = verify(jwt, "secret");
        if (!payload) {
            return res.status(401).send({
                message: "Unauthenticated",
            });
        }
        const repository = getManager().getRepository(User);
        const {password, ...user} =  await repository.findOne(payload.id);

        return res.status(200).send({
            message: "Success",
            developerMessage: "User authenticated",
            user: user,
        });
    } catch (error) {
        return res.status(401).send({
            message: "Unauthenticated",
            developerMessage: error.message
        });
    }
}

export const Logout = async (req:Request, res:Response) => {
    res.cookie("jwt", "", {
        maxAge: 0
    })

    return res.status(200).send({
        message: "Success",
        developerMessage: "You have successfully logged out",
    });    
}