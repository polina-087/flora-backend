import { HttpError } from "../helpers/index.js";

export const isValidId = (req, res, next) => {
    const targetId = req.params.id;
    const isNumeric = /^\d+$/.test(targetId);

    if (!isNumeric) {
        return next(HttpError(404, "Not found"));
    }

    next();
};