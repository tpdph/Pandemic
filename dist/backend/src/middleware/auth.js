"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = exports.refreshToken = exports.authenticateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const uuid_1 = require("uuid");
const secretsManager = new aws_sdk_1.default.SecretsManager({ region: 'us-west-2' });
// In-memory store for refresh tokens (replace with a database in production)
const refreshTokens = {};
// JWT middleware
const authenticateJWT = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.sendStatus(401);
    try {
        let secret;
        try {
            // Retrieve secret from AWS Secrets Manager
            const secretData = await secretsManager
                .getSecretValue({ SecretId: process.env.JWT_SECRET_ID })
                .promise();
            secret = secretData.SecretString;
        }
        catch (err) {
            // Fallback to environment variable if Secrets Manager fails
            secret = process.env.JWT_SECRET;
            if (!secret) {
                console.error("JWT_SECRET_ID retrieval failed and JWT_SECRET env var is not set.");
                return res.sendStatus(500).send("Authentication service unavailable");
            }
        }
        // Verify token
        jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (err) {
        return res.sendStatus(403);
    }
};
exports.authenticateJWT = authenticateJWT;
// Refresh token endpoint sample
const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken)
        return res.sendStatus(401);
    // Check if refresh token exists and is not revoked
    if (!refreshTokens[refreshToken] || refreshTokens[refreshToken].revoked) {
        return res.sendStatus(403);
    }
    try {
        const secretData = await secretsManager
            .getSecretValue({ SecretId: process.env.REFRESH_TOKEN_SECRET_ID })
            .promise();
        const refreshSecret = secretData.SecretString;
        const payload = jsonwebtoken_1.default.verify(refreshToken, refreshSecret);
        const userId = payload.userId;
        // Revoke old refresh token
        refreshTokens[refreshToken].revoked = true;
        // Create new refresh token
        const newRefreshToken = (0, uuid_1.v4)();
        refreshTokens[newRefreshToken] = { userId: userId, revoked: false };
        // Create new access token
        const newToken = jsonwebtoken_1.default.sign({ userId: userId }, refreshSecret, { expiresIn: '15m' });
        res.json({ token: newToken, refreshToken: newRefreshToken });
    }
    catch (err) {
        res.sendStatus(403);
    }
};
exports.refreshToken = refreshToken;
// Rate limiter middleware
const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'); // 15 minutes default
const max = parseInt(process.env.RATE_LIMIT_MAX || '100'); // 100 requests default
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: windowMs,
    max: max,
    message: "Too many requests, please try again later."
});
