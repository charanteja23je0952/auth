import type { Request, Response, NextFunction } from 'express';
import User from './user_model.js';
import type { UserDocument } from './user_model.js';
import catchAsync from '../../utils/catchAsync.js';
import { ok } from '../../utils/response.js';
import type { EditProfileBody } from './user.schema.js';
import AppError from '../../utils/AppError.js';
export const profile = catchAsync(async (req: Request, res: Response) => {
    if (!req.user) throw new AppError('User not authenticated', 401);
    ok(res, "Profile fetched successfully", {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role,
        data: req.user.data
    });
});
export const edit_post = catchAsync(async (
    req: Request<{}, {}, EditProfileBody>,
    res: Response
) => {
    if (!req.user) throw new AppError('User not authenticated', 401);
    const { email, data } = req.body;
    const user = await User.findByIdAndUpdate(
        req.user._id, {
            email,
            data
        },
        { new: true, runValidators: true }
    );
    if (!user) throw new AppError('User not found', 404);
    ok(res, "Profile updated sucessfully", {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        data: user.data
    });
});
