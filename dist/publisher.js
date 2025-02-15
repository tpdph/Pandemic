"use strict";
// Social media publishing service
class VideoPublisher {
    async publishToAllPlatforms(video) {
        await Promise.all([
            this.tiktokService.upload(video),
            this.youtubeService.uploadShort(video),
            this.instagramService.uploadReel(video)
        ]);
    }
}
