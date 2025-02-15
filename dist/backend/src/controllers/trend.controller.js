"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const client_1 = require("@prisma/client");
const runway_1 = __importDefault(require("runway"));
const elevenlabs_1 = __importDefault(require("elevenlabs"));
const ffmpeg_1 = __importDefault(require("ffmpeg"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post('/trends/analyze', async (req, res) => {
    try {
        // Fetch external trend data concurrently
        const [googleData, tiktokData] = await Promise.all([
            (0, node_fetch_1.default)('https://api.google.com/trends').then(r => r.json()),
            (0, node_fetch_1.default)('https://api.tiktok.com/trending').then(r => r.json())
        ]);
        // Forward trend data to the AI microservice for prediction
        const prediction = await (0, node_fetch_1.default)('http://localhost:5000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ googleData, tiktokData })
        }).then(r => r.json());
        res.json({ prediction });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Trend analysis failed' });
    }
});
router.post('/generate-video', async (req, res) => {
    try {
        const { script } = req.body;
        // Generate video assets using integrated services
        const scenes = await (0, runway_1.default)(script);
        const voice = await (0, elevenlabs_1.default)(script);
        const video = await (0, ffmpeg_1.default)(scenes, voice);
        res.send(video);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Video generation failed' });
    }
});
exports.default = router;
