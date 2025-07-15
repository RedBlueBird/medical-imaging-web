import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { createError } from '../middleware/error.middleware';

export class UploadService {
  async processImage(file: Express.Multer.File): Promise<{ filename: string; url: string; size: number }> {
    try {
      // Process image with sharp (resize, optimize, etc.)
      const processedImagePath = path.join('uploads', `processed-${file.filename}`);
      
      await sharp(file.path)
        .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(processedImagePath);

      // Get file stats
      const stats = await fs.stat(processedImagePath);

      return {
        filename: `processed-${file.filename}`,
        url: `/uploads/processed-${file.filename}`,
        size: stats.size
      };
    } catch (error) {
      throw createError('Failed to process image', 500);
    }
  }

  async deleteImage(filename: string): Promise<void> {
    try {
      const filePath = path.join('uploads', filename);
      await fs.unlink(filePath);
    } catch (error) {
      throw createError('Failed to delete image', 500);
    }
  }
}