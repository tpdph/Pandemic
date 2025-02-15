// Sample video generation endpoint
app.post('/generate-video', async (req, res) => {
  const { script } = req.body;
  const scenes = await runway.generate(script);
  const voice = await elevenlabs.synthesize(script);
  const video = await ffmpeg.merge(scenes, voice);
  res.send(video);
});