import * as Sentry from '@sentry/node';
import express from 'express';

Sentry.init({ dsn: process.env.SENTRY_DSN });

export const sentryHandler = (Sentry as any).Handlers.requestHandler();

// Error handler must be after all controllers/routes
export const sentryErrorHandler = (Sentry as any).Handlers.errorHandler();

export const addSentry = (app: express.Application) => {
  app.use(sentryHandler);
  // ... your routes here
  app.use(sentryErrorHandler);
};
