import {Joi} from "express-validation";

export const productAttributeValidation = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    status: Joi.string().required(),
    product_attribute_set_id: Joi.number(),
    order: Joi.number().required(),
    image: Joi.string(),
    is_featured: Joi.number().required(),
});