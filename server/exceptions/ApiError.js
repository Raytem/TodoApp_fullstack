export default class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static PageNotFound() {
        return new ApiError(404, "Page not found");
    }

    static UnauthorizedError() {
        return new ApiError(401, "User is unauthorized");
    }

    static BadRequestError(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}