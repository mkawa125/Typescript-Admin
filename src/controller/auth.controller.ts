import { Request, Response } from "express"
import { RegisterValidation } from "./validation/register.validation";

export const Register = (req: Request, res: Response) => {

    const body = req.body;

    /** Validate the request inputs */
    const {error} = RegisterValidation.validate(body);

    if (error) {
        return res.status(400).send(error.details)
    }

    /** Check if the password match */
    if (body.password !== body.password_confirm) {
        return res.status(400).send({
            message: "Password does not match"
        });
    }
    res.send(req.body);

}