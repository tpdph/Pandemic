"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class VideoPublisher {
    constructor() {
        // Assume these service methods are defined/imported elsewhere
        this.tiktokService = { upload: async (video) => { } };
        this.youtubeService = { uploadShort: async (video) => { } };
        this.instagramService = { uploadReel: async (video) => { } };
        this.failedVideoRepository = {
            save: async (failedVideo) => {
                // Implementation would connect to database
                console.log('Saving failed video for retry:', failedVideo);
            }
        };
    }
    async publishToAllPlatforms(video) {
        try {
            const results = await Promise.allSettled([
                this.tiktokService.upload(video),
                this.youtubeService.uploadShort(video),
                this.instagramService.uploadReel(video)
            ]);
            results.forEach((result, index) => {
                const platform = ['TikTok', 'YouTube', 'Instagram'][index];
                if (result.status === 'fulfilled') {
                    console.log(`Successfully uploaded to ${platform}`);
                }
                else {
                    console.error(`Failed to upload to ${platform}:`, result.reason);
                }
            });
            // Check if all uploads failed
            if (results.every((result) => result.status === 'rejected')) {
                // Store failed video for retry later
                await this.failedVideoRepository.save({
                    videoId: video.id,
                    retryCount: 0,
                    lastAttempt: new Date()
                });
                throw new Error('All platform uploads failed - video saved for retry');
            }
        }
        catch (error) {
            console.error('Error in publishToAllPlatforms:', error);
            throw error; // Re-throw for error handling middleware
        }
    }
}
exports.default = VideoPublisher;
