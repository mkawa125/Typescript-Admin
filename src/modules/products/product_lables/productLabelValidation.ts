import {Joi} from "express-validation";

export const productLabelValidation = Joi.object({
    name: Joi.string().required(),
    color: Joi.string().required(),
    status: Joi.string().required(),
});