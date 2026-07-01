import type { Request, Response } from 'express';
import User from '../user/user_model.js';
import catchAsync from '../../utils/catchAsync.js';
import AppError from '../../utils/AppError.js';
import { ok } from '../../utils/response.js';
import type { IdParams, AdminEditBody } from '../user/user.schema.js';

export const admin = catchAsync(async (req: Request, res: Response) => {
    const users  = await User.find();
    ok(res, 'Users fetched successfully', users.map((user) => ({
        id: user._id.toString(),
        email: user.email,
        role: user.role
    })));
});

export const admin_id = catchAsync(async (
    req: Request<IdParams>, 
    res: Response
) => {
    const user = await User.findById(req.params.id);
    if (!user) throw new AppError('User not found', 404);
    ok(res, 'User fetched successfully', {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        data: user.data
    });
});

export const edit_post = catchAsync(async (
    req: Request<IdParams, {}, AdminEditBody>,
    res: Response
) => {
    const { email, role, data } = req.body;
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { email, role, data },
        { new: true, runValidators: true }
    );
    if (!user) throw new AppError('User not found', 404);
    ok(res, 'User updated successfully', {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        data: user.data
    });
});

export const deleteUser = catchAsync(async (
    req: Request<IdParams>,
    res: Response
) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) throw new AppError('User not found', 404);
    ok(res, 'User deleted successfully', null);
});
