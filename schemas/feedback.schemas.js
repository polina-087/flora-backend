import Joi from "joi";

export const createFeedbackValidation = Joi.object({
    text: Joi.string().required().messages({
        "any.required": "Feedback text is a mandatory field",
        "string.empty": "Feedback text cannot be an empty string",
    }),
    author: Joi.string().required().messages({
        "any.required": "Author name is a mandatory field",
        "string.empty": "Author name cannot be an empty string",
    }),
});

export const updateFeedbackValidation = Joi.object({
    text: Joi.string(),
    author: Joi.string(),
}).min(1).messages({
    "object.min": "Body must have at least one field to update",
});