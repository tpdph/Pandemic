import client from 'prom-client';
import express from 'express';

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // Collects default metrics

const app = express();

app.get('/metrics', async (_, res) => {
  res.set('Content-Type', client.register.contentType);
  res.send(await client.register.metrics());
});

export default app;