import jwt from 'jsonwebtoken';
import User from '../features/user/user_model.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

const require_auth = catchAsync(async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next(new AppError('Authentication required', 401));
    const secret = process.env.ACCESS_SECRET;
    if (!secret) return next(new AppError('Server configuration error', 500));
    const decoded = jwt.verify(token, secret) as any;
    const user = await User.findById(decoded.id);
    if (!user) return next(new AppError('User no longer exists', 401));
    req.user = user;
    next();
});
export { require_auth };
