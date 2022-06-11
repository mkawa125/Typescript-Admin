import {Joi} from "express-validation";

export const productCategoryValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    status: Joi.string().required(),
    parent_id: Joi.number(),
    order: Joi.number().required(),
    image: Joi.string(),
    is_featured: Joi.number().required(),
});