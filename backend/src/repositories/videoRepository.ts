import { PrismaClient } from '@prisma/client';
import Joi from 'joi';


const prisma = new PrismaClient();

const videoSchema = Joi.object({
  s3Url: Joi.string().uri().required(),
  metadata: Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().max(1000).optional(),
    tags: Joi.array().items(Joi.string().max(50)).optional(),
  }).required(),
  renderingStatus: Joi.string().valid('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED').optional(),
  processingTime: Joi.number().integer().min(0).optional(),
});

export class VideoRepository {
  async createVideo(videoData: { s3Url: string; metadata: Record<string, unknown>; renderingStatus?: string; processingTime?: number; }) {
    try {
      const { error, value } = videoSchema.validate(videoData);
      if (error) {
        throw new Error(`Validation error: ${error.message}`);
      }
      return await prisma.video.create({ data: value });
    } catch (error: any) {
      console.error('Error creating video:', error);
      throw new Error(`Failed to create video: ${error.message} - ${error.stack}`);
    }
  }

  async getVideoById(id: string) {
    try {
      return await prisma.video.findUnique({ where: { id } });
    } catch (error: any) {
      console.error('Error getting video by id:', error);
      throw new Error(`Failed to get video by id: ${error.message} - ${error.stack}`);
    }
  }

  async updateVideo(
    id: string,
    videoData: { s3Url?: string; metadata?: Record<string, unknown>; renderingStatus?: string; processingTime?: number; }
  ) {
    try {
      const { error, value } = videoSchema.validate(videoData);
      if (error) {
        throw new Error(`Validation error: ${error.message}`);
      }
      return await prisma.video.update({
        where: { id },
        data: value,
      });
    } catch (error: any) {
      console.error('Error updating video:', error);
      throw new Error(`Failed to update video: ${error.message} - ${error.stack}`);
    }
  }

  async deleteVideo(id: string) {
    try {
      return await prisma.video.delete({ where: { id } });
    } catch (error: any) {
      console.error('Error deleting video:', error);
      throw new Error(`Failed to delete video: ${error.message} - ${error.stack}`);
    }
  }

  async listVideos(skip: number = 0, take: number = 10) {
    try {
      return await prisma.video.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      });
    } catch (error: any) {
      console.error('Error listing videos:', error);
      throw new Error(`Failed to list videos: ${error.message} - ${error.stack}`);
    }
  }

  async searchVideos(query: string) {
    try {
      // Sanitize the search query to prevent injection attacks
      const sanitizedQuery = query.replace(/[^a-zA-Z0-9\\s]/g, '');

      return await prisma.video.findMany({
        where: {
          OR: [
            { s3Url: { contains: sanitizedQuery, mode: 'insensitive' } },
            // Assuming the JSON metadata includes a "title" field
            { metadata: { path: ['title'], string_contains: sanitizedQuery, mode: 'insensitive' } },
          ],
        },
      });
    } catch (error: any) {
      console.error('Error searching videos:', error);
      throw new Error(`Failed to search videos: ${error.message} - ${error.stack}`);
    }
  }

  async getMetrics() {
    try {
      const totalVideos = await prisma.video.count();
      const successfulUploads = await prisma.video.count({ where: { renderingStatus: 'SUCCESS' } });
      const failedUploads = await prisma.video.count({ where: { renderingStatus: 'FAILED' } });
      const averageProcessing = await prisma.video.aggregate({
        _avg: { processingTime: true },
      });

      return {
        totalVideos,
        successfulUploads,
        failedUploads,
        averageProcessingTime: Number(averageProcessing._avg.processingTime) || 0,
      };
    } catch (error: any) {
      console.error('Error getting metrics:', error);
      throw new Error(`Failed to get metrics: ${error.message} - ${error.stack}`);
    }
  }
}
