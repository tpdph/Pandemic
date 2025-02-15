// Social media publishing service

interface IVideo {
  title: string;
  description: string;
  url: string;
}

class VideoPublisher {
  tiktokService: any;
    youtubeService: any;
    instagramService: any;
  async publishToAllPlatforms(video: IVideo) {
    await Promise.all([
      this.tiktokService.upload(video),
      this.youtubeService.uploadShort(video),
      this.instagramService.uploadReel(video)
    ]);
  }
}