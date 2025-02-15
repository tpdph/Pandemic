import express from 'express';
import fetch, { Response } from 'node-fetch';
import { PrismaClient } from '@prisma/client';
import runway from 'runway';
import elevenlabs from 'elevenlabs';
import ffmpeg from 'ffmpeg';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/trends/analyze', async (req, res) => {
  try {
    // Fetch external trend data concurrently
    const [googleData, tiktokData] = await Promise.all([
      fetch('https://api.google.com/trends').then(r => r.json()),
      fetch('https://api.tiktok.com/trending').then(r => r.json())
    ]);

    // Forward trend data to the AI microservice for prediction
    const prediction = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ googleData, tiktokData })
    }).then(r => r.json());

    res.json({ prediction });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Trend analysis failed' });
  }
});

router.post('/generate-video', async (req, res) => {
  try {
    const { script } = req.body;
    // Generate video assets using integrated services
    const scenes = await runway(script);
    const voice = await elevenlabs(script);
    const video = await ffmpeg(scenes, voice);
    
    res.send(video);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Video generation failed' });
  }
});

export default router;
