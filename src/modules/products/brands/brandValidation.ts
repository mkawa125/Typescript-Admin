import {Joi} from "express-validation";

export const brandValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.required(),
    logo: Joi.string(),
    website: Joi.string().uri().required(),
    is_featured: Joi.number(),
});