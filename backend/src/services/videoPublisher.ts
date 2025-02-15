interface IVideo {
  id: string;
  s3Url: string;
  // Additional metadata properties
}

class VideoPublisher {
  async publishToAllPlatforms(video: IVideo) {
    try {
      const results = await Promise.allSettled([
        this.tiktokService.upload(video),
        this.youtubeService.uploadShort(video),
        this.instagramService.uploadReel(video)
      ]);

      results.forEach((result: PromiseSettledResult<void>, index: number) => {
        const platform = ['TikTok', 'YouTube', 'Instagram'][index];
        if (result.status === 'fulfilled') {
          console.log(`Successfully uploaded to ${platform}`);
        } else {
          console.error(`Failed to upload to ${platform}:`, result.reason);
        }
      });

      // Check if all uploads failed
      if (results.every((result: PromiseSettledResult<void>) => result.status === 'rejected')) {
        // Store failed video for retry later
        await this.failedVideoRepository.save({
          videoId: video.id,
          retryCount: 0,
          lastAttempt: new Date()
        });
        throw new Error('All platform uploads failed - video saved for retry');
      }
    } catch (error) {
      console.error('Error in publishToAllPlatforms:', error);
      throw error; // Re-throw for error handling middleware
    }
  }
  
  // Assume these service methods are defined/imported elsewhere
  private tiktokService = { upload: async (video: IVideo) => {/*...*/} };
  private youtubeService = { uploadShort: async (video: IVideo) => {/*...*/} };
  private instagramService = { uploadReel: async (video: IVideo) => {/*...*/} };
  private failedVideoRepository = {
    save: async (failedVideo: {
      videoId: string;
      retryCount: number;
      lastAttempt: Date;
    }) => {
      // Implementation would connect to database
      console.log('Saving failed video for retry:', failedVideo);
    }
  };
}

export default VideoPublisher;
