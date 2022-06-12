import {Joi} from "express-validation";

export const productAttributeValidation = Joi.object({
    title: Joi.string().required(),
    slug: Joi.string().required(),
    status: Joi.string().required(),
    product_attribute_set_id: Joi.number(),
    order: Joi.number().required(),
    color: Joi.string(),
    is_default: Joi.number().required(),
});