import type { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync.js';
import { signup, login, refresh } from './auth_service.js';
import { ok } from '../../utils/response.js';
import AppError from '../../utils/AppError.js';
import type { SignupBody, LoginBody } from './auth.schema.js';

export const signup_post = catchAsync(async (
    req: Request<{}, {}, SignupBody>,
    res: Response
) => {
    const { email, password } = req.body;
    const result = await signup(email, password);
    res.cookie(
        'accessToken',
        result.accessToken,
        {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        }
    );
    res.cookie(
        'refreshToken',
        result.refreshToken,
        {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        }
    );
    ok(res, "Account created", {
        id: result.user._id
    }, 201);
});
export const login_post = catchAsync(async (
    req: Request<{}, {}, LoginBody>,
    res: Response
) => {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.cookie(
        'accessToken',
        result.accessToken,
        {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        }
    );
    res.cookie(
        'refreshToken',
        result.refreshToken,
        {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        }
    );
    ok(res, "Login successful", {
        id: result.user._id
    });
});
export const logout = (req: Request, res: Response) => {
    res.cookie(
        'accessToken',
        '',
        {
            httpOnly: true,
            maxAge: 1
        }
    );
    res.cookie(
        'refreshToken',
        '',
        {
            httpOnly: true,
            maxAge: 1
        }
    );
    ok(res, "Logged out");
};
export const refresh_post = catchAsync(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        throw new AppError(
            "Refresh token missing",
            401
        );
    }
    const accessToken = await refresh(refreshToken);
    res.cookie(
        'accessToken',
        accessToken,
        {
            httpOnly: true,
            maxAge: 15 * 60 * 1000
        }
    );
    ok(res, "Token refreshed");
});
