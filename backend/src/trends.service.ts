export class TrendsService {
  constructor(
    private readonly googleTrends: any,
    private readonly tiktokApi: any,
    private readonly aiAnalyzer: any
  ) {}

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
