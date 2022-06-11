import {Joi} from "express-validation";

export const productAttributeSetValidation = Joi.object({
    title: Joi.string().required(),
    slug: Joi.string(),
    status: Joi.string().required(),
    is_searchable: Joi.number(),
    is_comparable: Joi.number(),
    display_layout: Joi.string().required(),
    is_use_in_product_listing: Joi.number(),
    order: Joi.number(),
});