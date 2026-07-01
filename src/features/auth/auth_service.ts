import jwt from 'jsonwebtoken';
import User from '../user/user_model.js';
import type { UserDocument } from '../user/user_model.js';
import bcrypt from 'bcrypt';
import AppError from '../../utils/AppError.js';
export interface authResponce{
    user: UserDocument;
    accessToken: string;
    refreshToken: string;
}
type JwtIdPayload = {
    id: string;
};

const createAccessToken = (id: string): string => {
    return jwt.sign(
        { id },
        process.env.ACCESS_SECRET as jwt.Secret,
        {
            expiresIn: '15m'
        }
    );
};

const createRefreshToken = (id: string): string => {
    return jwt.sign(
        { id },
        process.env.REFRESH_SECRET as jwt.Secret,
        {
            expiresIn: '30d'
        }
    );
};

const signup = async (email: string, password: string): Promise<authResponce> => {
    const user = await User.create({
        email,
        password
    });
    const accessToken = createAccessToken(user._id.toString());
    const refreshToken = createRefreshToken(user._id.toString());
    return {
        user,
        accessToken,
        refreshToken
    };
};

const login = async (email: string, password: string): Promise<authResponce> => {
    const user = await User.findOne({ email });
    if (!user) throw new AppError('Email not registered', 401);
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new AppError('Incorrect password', 401);
    const accessToken = createAccessToken(user._id.toString());
    const refreshToken = createRefreshToken(user._id.toString());
    return {
        user,
        accessToken,
        refreshToken
    };
};

const refresh = async (refreshToken: string): Promise<string> => {
    const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET as jwt.Secret
    ) as JwtIdPayload;
    return createAccessToken(payload.id);
};

export { signup, login, refresh };
