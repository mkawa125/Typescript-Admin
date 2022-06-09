import { User } from './../entity/user.entity';
import { Request, Response } from "express"
import { RegisterValidation, ResetPasswordValidation } from "./validation/register.validation";
import { getManager, MoreThan } from "typeorm";
import  bcryptjs  from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import  mailgun  from "mailgun-js";
import nodemailer from "nodemailer";
import crypto from 'crypto';


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

export const SendEmaill = async (req:Request, res:Response) => {
    const mg = mailgun({
        apiKey: process.env.MAILGUN_APIKEY, 
        domain: process.env.MAILGUN_DOMAIN
    });

    const data = {
        from: 'dahabu@catchuptips.com',
        to: 'dahabusaidi@gmail.com',
        subject: 'Hello Mkawa',
        text: 'Keys added to enviromental variable This is the testing email from nodejs'
    };

    try {
        
        await mg.messages().send(data)
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: "Email sent successfully",
            data: data
        }) 

    } catch (error) {

        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }

}


export const SendPasswordResetLink = async (req:Request, res:Response) => {

    try {
        /** Validate the request inputs */
        const body = req.body
        const {error} = ResetPasswordValidation.validate(body);
        const repository = getManager().getRepository(User);
        const user = await repository.findOne({email: req.body.email});

        if (error) {
            return res.status(400).send({
                success: false,
                message: error.details
            })
        }

        if(!user){
            return res.status(404).send({
                message: "User with such email not found",
                success: false
            })
        }
    
        const tokenObject = {id: user.id, email: user.email};
        const secret = user.id + '_' + user.email + '_' + new Date().getTime();
        const token = sign(tokenObject, secret)
        // const token = crypto.randomBytes(32).toString('hex');

        const date = new Date();
        const afterOneHour = date.setTime(date.getTime() + 1 * 60 * 60 * 1000);
        const dateStringFormat = new Date(afterOneHour);

        /** Update reset_password_token */
        await repository.update(user.id, {
            remember_token: token,
            remember_token_expire_date: dateStringFormat // Expires in one hour
        })
        const reset_link = "http://" + req.headers.host + "/api/users/reset/" + user.remember_token;
        await sendResetLinkEmail(user, reset_link)
    
        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: `Password reset link sent successfully to ${user.email}`,
        }) 
        
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}

const sendResetLinkEmail = async (user: User, link:string) => {
    try {
        const mg = mailgun({
            apiKey: process.env.MAILGUN_APIKEY, 
            domain: process.env.MAILGUN_DOMAIN
        });
    
        const data = {
            from: process.env.MAILGUN_FROM,
            to: user.email,
            subject: 'Password Change Request',
            html: `Hi ${user.first_name} <br><br>
            Please click on the following link ${link} to reset your password. <br><br>
            If you did not request this, please ignore this email and your password will remain unchanged.<br><br>
            Thanks<br>
            Catchuptips Team`,
        };
        await mg.messages().send(data)

    } catch (error) {
        return {
                userMessage: 'Something went wrong, contact the system admin',
                developerMessage: error.message,
                success: false
        };
    }
}


export const verifyResetToken =async (req:Request, res:Response) => {
    try {
        const repository = getManager().getRepository(User);
        const user = await repository.findOne({
            remember_token: req.params.token, 
            remember_token_expire_date: MoreThan(new Date())});

            if (!user) {
                return res.status(401).json({
                    userMessage: 'Success',
                    developerMessage: `Password reset token is invalid or has expired`,
                })
            }

        return res.status(200).json({
            userMessage: 'Success',
            developerMessage: `Reset token is available and valid`,
            data: user
        }) 
    } catch (error) {
        return res.status(500).json({
            userMessage: 'Something went wrong, contact the system admin',
            developerMessage: error.message,
            success: false
        });
    }
}
