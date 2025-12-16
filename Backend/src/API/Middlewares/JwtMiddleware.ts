import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../../Application/Commons/Models/Apis/ApiResponse';

export function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const token = req.cookies.accessToken;

  if (!token) {
    const response: ApiResponse<string> = {
      status: 401,
      message: 'Authentication token missing',
      data: '',
      timestamp: new Date()
    };
    return res.status(401).json(response);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    const response: ApiResponse<string> = {
      status: 401,
      message: 'Invalid or expired token',
      data: '',
      timestamp: new Date()
    };
    return res.status(401).json(response);
  }
}

export interface AuthenticatedRequest extends Request {
  user?: any;
}