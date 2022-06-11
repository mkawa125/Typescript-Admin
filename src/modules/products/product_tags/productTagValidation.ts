import {Joi} from "express-validation";

export const productTagValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().max(400),
    status: Joi.string().required(),
});