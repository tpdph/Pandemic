"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prom_client_1 = __importDefault(require("prom-client"));
const express_1 = __importDefault(require("express"));
const collectDefaultMetrics = prom_client_1.default.collectDefaultMetrics;
collectDefaultMetrics(); // Collects default metrics
const app = (0, express_1.default)();
app.get('/metrics', async (_, res) => {
    res.set('Content-Type', prom_client_1.default.register.contentType);
    res.send(await prom_client_1.default.register.metrics());
});
exports.default = app;
