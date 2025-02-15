import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const secretsManager = new AWS.SecretsManager({ region: 'us-west-2' });

// In-memory store for refresh tokens (replace with a database in production)
const refreshTokens: { [token: string]: { userId: string, revoked: boolean } } = {};

// JWT middleware
export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  try {
    let secret: string;
    try {
      // Retrieve secret from AWS Secrets Manager
      const secretData = await secretsManager
        .getSecretValue({ SecretId: process.env.JWT_SECRET_ID! })
        .promise();
      secret = secretData.SecretString!;
    } catch (err) {
      // Fallback to environment variable if Secrets Manager fails
      secret = process.env.JWT_SECRET!;
      if (!secret) {
        console.error("JWT_SECRET_ID retrieval failed and JWT_SECRET env var is not set.");
        return res.sendStatus(500).send("Authentication service unavailable");
      }
    }

    // Verify token
    jwt.verify(token, secret);
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

// Refresh token endpoint sample
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);

  // Check if refresh token exists and is not revoked
  if (!refreshTokens[refreshToken] || refreshTokens[refreshToken].revoked) {
    return res.sendStatus(403);
  }

  try {
    const secretData = await secretsManager
      .getSecretValue({ SecretId: process.env.REFRESH_TOKEN_SECRET_ID! })
      .promise();
    const refreshSecret = secretData.SecretString!;
    const payload = jwt.verify(refreshToken, refreshSecret) as any;

    const userId = payload.userId;

    // Revoke old refresh token
    refreshTokens[refreshToken].revoked = true;

    // Create new refresh token
    const newRefreshToken = uuidv4();
    refreshTokens[newRefreshToken] = { userId: userId, revoked: false };

    // Create new access token
    const newToken = jwt.sign({ userId: userId }, refreshSecret, { expiresIn: '15m' });

    res.json({ token: newToken, refreshToken: newRefreshToken });
  } catch (err) {
    res.sendStatus(403);
  }
};

// Rate limiter middleware
const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'); // 15 minutes default
const max = parseInt(process.env.RATE_LIMIT_MAX || '100'); // 100 requests default

export const apiLimiter = rateLimit({
  windowMs: windowMs,
  max: max,
  message: "Too many requests, please try again later."
});
