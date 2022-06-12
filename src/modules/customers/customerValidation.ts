import {Joi} from "express-validation";

export const customerValidation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    email_verify_token: Joi.string(),
    dob: Joi.date(),
});