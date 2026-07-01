import type { ErrorRequestHandler } from "express";
import AppError from "../utils/AppError.js";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            data: null
        });
    }
    if (err instanceof Error) {
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
                data: null
            });
        }
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired",
                data: null
            });
        }
        if (err.name === "ValidationError") {
            const validationError = err as any;
            const errors = Object.values(validationError.errors).map(
                (e: any) => e.message
            );
            return res.status(400).json({
                success: false,
                message: errors.join(", "),
                data: null
            });
        }
    }
    if(typeof err === "object" && err !== null && "code" in err && err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: "Email already exists",
            data: null
        });
    }
    return res.status(500).json({
        success: false,
        message: "Something went wrong",
        data: null
    });
};

export default errorHandler;