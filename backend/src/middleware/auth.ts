import { Request, Response, NextFunction } from 'express';
import HttpStatusCodes from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { User } from '../models/User';
import { Role } from '../models/Role';
import Payload from '../types/Payload';

// Initialize the Google OAuth2 client
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function (req: Request, res: Response, next: NextFunction) {
  try {
    // Check for JWT in the Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const payload: Payload | any = jwt.verify(token, process.env.SECRET);

      // Find user and include role information
      const user = await User.findOne({
        where: { id: payload.id } as any,
        attributes: { exclude: ['password'] },
        include: [{ model: Role }],
      });

      if (user && !user['active']) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({
          errors: [{ msg: 'Account disabled' }],
        });
      }

      // Attach user to request
      (req as any).currentUser = user;
      return next();
    }

    // Check for Google token in request body
    if (req.body && req.body.token) {
      const { token } = req.body;

      try {
        const ticket = await googleClient.verifyIdToken({
          idToken: token,
          audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload?.email) {
          return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Google token does not contain email' });
        }

        // Fetch or create a user based on Google payload
        const user = await User.findOne({
          where: { email: payload.email },
          attributes: { exclude: ['password'] },
          include: [{ model: Role }],
        });

        if (!user) {
          const newUser = await User.create({
            email: payload.email,
            name: payload.name || '',
            googleId: payload.sub || '',
          });
          (req as any).currentUser = newUser;
        } else {
          (req as any).currentUser = user;
        }

        return next();
      } catch (error) {
        return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'Invalid Google token' });
      }
    }

    // If no token is found
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'No authentication token provided' });
  } catch (err) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({ msg: 'Token is not valid' });
  }
}
