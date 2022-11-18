import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';

export const createToken = (payLoad: { userName: string }) => {
    if (typeof SECRET !== 'string') throw new Error();
    return jwt.sign(payLoad, SECRET, {});
};
export const verifyToken = (token: string) => {
    if (typeof SECRET !== 'string') throw new Error();
    const payload = jwt.verify(token, SECRET);
    if (typeof payload === 'string') throw new Error('Token no valid');
    return payload;
};
