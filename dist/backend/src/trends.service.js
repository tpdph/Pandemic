"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrendsService = void 0;
class TrendsService {
    constructor(googleTrends, tiktokApi, aiAnalyzer) {
        this.googleTrends = googleTrends;
        this.tiktokApi = tiktokApi;
        this.aiAnalyzer = aiAnalyzer;
    }
    async analyzeTrends() {
        const [googleData, tiktokData] = await Promise.all([
            this.googleTrends.fetch(),
            this.tiktokApi.getTrending()
        ]);
        return this.aiAnalyzer.predict({
            platforms: [googleData, tiktokData],
            threshold: 0.85
        });
    }
}
exports.TrendsService = TrendsService;
