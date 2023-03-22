import ApiError from "../exceptions/ApiError.js";
import TokenService from "../services/TokenService.js";

export default function authMiddleware(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = TokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch {
        return next(ApiError.UnauthorizedError());
    }
}