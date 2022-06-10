import {Joi} from "express-validation";



export const brandValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    website: Joi.link(),
})