import Joi from "joi";

const allowedCategories = ["roses", "mixed", "seasonal", "premium"];

export const createBouquetValidation = Joi.object({
    title: Joi.string().required().messages({
        "any.required": "Title is a mandatory field",
        "string.empty": "Title cannot be an empty string",
    }),
    description: Joi.string().required().messages({
        "any.required": "Description is a mandatory field",
        "string.empty": "Description cannot be an empty string",
    }),
    price: Joi.number().min(0).required().messages({
        "any.required": "Price is a mandatory field",
        "number.base": "Price must be a valid numeric value",
    }),
    category: Joi.string().valid(...allowedCategories),
    favorite: Joi.boolean(),
    photoURL: Joi.string(),
    image2x: Joi.string(),
    alt: Joi.string(),
});

export const updateBouquetValidation = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    price: Joi.number().min(0),
    category: Joi.string().valid(...allowedCategories),
    favorite: Joi.boolean(),
    photoURL: Joi.string(),
    image2x: Joi.string(),
    alt: Joi.string(),
}).min(1).messages({
    "object.min": "Body must have at least one field to update",
});

export const favoriteBouquetValidation = Joi.object({
    favorite: Joi.boolean().required().messages({
        "any.required": "Missing mandatory field 'favorite'",
        "boolean.base": "Field 'favorite' must be a boolean",
    }),
});