import {Joi} from "express-validation";

export const productCollectionValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    status: Joi.string().required(),
    slug: Joi.string().required(),
});