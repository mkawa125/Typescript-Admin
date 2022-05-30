import { User } from './../entity/user.entity';
import { Request, Response } from "express"
import { RegisterValidation } from "./validation/register.validation";
import { getManager } from "typeorm";
import  bcryptjs  from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

export const Register =  async (req: Request, res: Response) => {

    try {
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
        return res.status(200).send({
            message: "Success",
            developerMessage: "User Created Successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).send({
            message: "Registration failed",
            developerMessage: error.message
        });
    }
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

    const token = sign(payload, process.env.SECRET_KEY)

    /** Set token lifetime for one day */
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

    /** Get authenticated user */
    try {
        const {password, ...user} =  await req["user"];

        return res.status(200).send({
            message: "Success",
            developerMessage: "User authenticated",
            user: user,
        });
        
    } catch (error) {
        return res.status(401).json({
            userMessage: 'Invalid Credentials!',
            developerMessage: error.message,
            success: false
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

export const UpdateInfo =async (req:Request, res:Response) => {

    const user = req['user'];

    const repository = getManager().getRepository(User);

    await repository.update(user.id, req.body);

    const {password, ...data} = await repository.findOne(user.id);

    return res.status(200).send({
        message: "Success",
        developerMessage: "Success",
        user: data,
    });
    
}

export const UpdatePassword =async (req:Request, res:Response) => {

    const user = req['user'];

    /** Check if passwords match */
    if (req.body.password !== req.body.password_confirm) {
        return res.status(400).send({
            message: "Passwords does not match",
            success: false
        })
    }

    const repository = getManager().getRepository(User);

    await repository.update(user.id, {
        password: await bcryptjs.hash(req.body.password, 10)
    });

    const {password, ...data} = user;

    return res.status(200).send({
        message: "Password changed successfully",
        developerMessage: "Password changed successfully",
        user: data,
    }); 
    
}

export const DeleteUser =async (req:Request, res:Response) => {

    const repository = getManager().getRepository(User);

    await repository.delete(req.params.id)

    return res.status(200).send({
        message: "User deleted successfully",
        developerMessage: "User deleted successfully"
    }); 
}