import type { Types } from 'mongoose';

declare module 'express-serve-static-core' {
    interface Request {
        user?: {
            _id: Types.ObjectId;
            email: string;
            role: 'user' | 'admin';
            data: string;
        };
    }
}

export {};
