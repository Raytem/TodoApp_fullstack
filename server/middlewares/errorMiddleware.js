import ApiError from "../exceptions/ApiError.js";

export default function errorMiddleware(err, req, res, next) {
    console.log('--------------------------------------------------')
    console.error(err);

    if (err instanceof ApiError) {
        return res.status(err.status).json({
            message: err.message,
            errors: err.errors
        })
    } 
    return res.status(500).json({
        message: "Unexpected error / error when parsing id from URL",
    })
}