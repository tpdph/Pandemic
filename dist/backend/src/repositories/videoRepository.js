"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRepository = void 0;
const client_1 = require("@prisma/client");
const joi_1 = __importDefault(require("joi"));
const prisma = new client_1.PrismaClient();
const videoSchema = joi_1.default.object({
    s3Url: joi_1.default.string().uri().required(),
    metadata: joi_1.default.object({
        title: joi_1.default.string().max(255).required(),
        description: joi_1.default.string().max(1000).optional(),
        tags: joi_1.default.array().items(joi_1.default.string().max(50)).optional(),
    }).required(),
    renderingStatus: joi_1.default.string().valid('PENDING', 'PROCESSING', 'SUCCESS', 'FAILED').optional(),
    processingTime: joi_1.default.number().integer().min(0).optional(),
});
class VideoRepository {
    async createVideo(videoData) {
        try {
            const { error, value } = videoSchema.validate(videoData);
            if (error) {
                throw new Error(`Validation error: ${error.message}`);
            }
            return await prisma.video.create({ data: value });
        }
        catch (error) {
            console.error('Error creating video:', error);
            throw new Error(`Failed to create video: ${error.message} - ${error.stack}`);
        }
    }
    async getVideoById(id) {
        try {
            return await prisma.video.findUnique({ where: { id } });
        }
        catch (error) {
            console.error('Error getting video by id:', error);
            throw new Error(`Failed to get video by id: ${error.message} - ${error.stack}`);
        }
    }
    async updateVideo(id, videoData) {
        try {
            const { error, value } = videoSchema.validate(videoData);
            if (error) {
                throw new Error(`Validation error: ${error.message}`);
            }
            return await prisma.video.update({
                where: { id },
                data: value,
            });
        }
        catch (error) {
            console.error('Error updating video:', error);
            throw new Error(`Failed to update video: ${error.message} - ${error.stack}`);
        }
    }
    async deleteVideo(id) {
        try {
            return await prisma.video.delete({ where: { id } });
        }
        catch (error) {
            console.error('Error deleting video:', error);
            throw new Error(`Failed to delete video: ${error.message} - ${error.stack}`);
        }
    }
    async listVideos(skip = 0, take = 10) {
        try {
            return await prisma.video.findMany({
                skip,
                take,
                orderBy: { createdAt: 'desc' },
            });
        }
        catch (error) {
            console.error('Error listing videos:', error);
            throw new Error(`Failed to list videos: ${error.message} - ${error.stack}`);
        }
    }
    async searchVideos(query) {
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
        }
        catch (error) {
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
        }
        catch (error) {
            console.error('Error getting metrics:', error);
            throw new Error(`Failed to get metrics: ${error.message} - ${error.stack}`);
        }
    }
}
exports.VideoRepository = VideoRepository;
