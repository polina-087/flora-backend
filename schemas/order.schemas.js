import Joi from "joi";

export const createOrderValidation = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "Customer name is a mandatory field",
        "string.empty": "Customer name cannot be an empty string",
    }),
    phone: Joi.string().required().messages({
        "any.required": "Contact phone is a mandatory field",
        "string.empty": "Contact phone cannot be an empty string",
    }),
    product: Joi.string().allow("", null),
    quantity: Joi.number().integer().min(1),
    address: Joi.string().allow(""),
    message: Joi.string().allow(""),
    agree: Joi.boolean(),
});