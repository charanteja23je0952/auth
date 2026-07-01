import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError.js';

const is_admin = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    return next(new AppError('Admin access required', 403));
};

export default is_admin;
