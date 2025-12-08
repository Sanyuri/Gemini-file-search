import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

export class Jwt {
    async generateToken(payload: Payload): Promise<string> {
        const secret = process.env.JWT_SECRET;
        const expiresIn = process.env.JWT_EXPIRES_IN;
        if (!secret || !expiresIn) {
            throw new Error("JWT_SECRET or JWT_EXPIRES_IN is not defined");
        }

        return await jwt.sign(
            { id: payload.id, email: payload.email },
            secret as Secret,
            { expiresIn: expiresIn as SignOptions['expiresIn'] }
        );
    }

    async verifyToken(token: string): Promise<Payload> {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined");
        }
        try {
            const decoded: JwtPayload = await jwt.verify(token, secret as Secret) as JwtPayload;
            return {
                id: decoded.id,
                email: decoded.email
            };
        } catch (error) {
            throw new Error("Invalid or expired token");
        }
    }
}

interface Payload {
    id: string;
    email: string;
}