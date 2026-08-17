import JWT from 'jsonwebtoken';

export interface userTokenPayload {
    id: string
}

const JWT_SECRET = 'myjwtsecret';
export function createUserToken(payload: userTokenPayload) {
    const token = JWT.sign(payload, JWT_SECRET, {
        expiresIn: "24h"
    });
    return token;
}

export function verifyToken(token: string) {
    try {
        const payload = JWT.verify(token, JWT_SECRET) as userTokenPayload;
        return payload;
    } catch (error) {
        return null;      //for expired token
    }
}

