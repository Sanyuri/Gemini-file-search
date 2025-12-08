import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }

    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
        return res.status(500).json({ message: 'JWT secret key not configured' });
    }

    jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = user;
        next();
    });
};