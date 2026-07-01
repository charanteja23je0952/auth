import type {Request,Response,NextFunction} from "express";
import type { ZodType } from "zod";
import AppError from "../utils/AppError.js";

type ValidationSource ="body" | "query" | "params";
const validate = (
    schema: ZodType,
    source: ValidationSource = "body"
) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
        const errors = result.error.issues
            .map(e => e.message)
            .join(", ");
        return next(new AppError(errors, 400));
    }
    req[source] = result.data;
    next();
};

export default validate;