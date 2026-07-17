const defaultErrorMessages = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    409: "Conflict",
};

export const HttpError = (statusCode, customMessage = defaultErrorMessages[statusCode]) => {
    const customError = new Error(customMessage);
    customError.status = statusCode;
    return customError;
};