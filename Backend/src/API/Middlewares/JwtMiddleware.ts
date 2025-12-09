import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../../Application/Commons/Models/Apis/ApiResponse';

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json(new ApiResponse<string>(401, 'Authentication token is missing', ''));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.body = decoded;
    next();
  } catch (err) {
    return res.status(401).json(new ApiResponse<string>(401, 'Invalid or expired token', ''));
  }
}
