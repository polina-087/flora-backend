import { HttpError } from "../helpers/index.js";

export const validateBody = (validationSchema) => (req, res, next) => {
    const requestData = req.body;

    if (!requestData || Object.keys(requestData).length === 0) {
        return next(HttpError(400, "Missing fields"));
    }

    const { error } = validationSchema.validate(requestData);

    if (error) {
        return next(HttpError(400, error.message));
    }

    next();
};