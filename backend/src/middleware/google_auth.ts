// src/middleware/googleAuth.ts
import { Request, Response, NextFunction } from 'express';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default async function (req: Request, res: Response, next: NextFunction) {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    (req as any).user = {
      sub: payload?.sub || '',
      email: payload?.email || '',
      name: payload?.name || ''
    }; // Type assertion to add user info to request
    console.log(payload);
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Google token' });
  }
}
