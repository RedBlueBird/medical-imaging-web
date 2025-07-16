// src/services/upload.service.ts
import fs from 'fs';
import path from 'path';

export interface ProcessedImageResult {
  filename: string;
  imageUrl: string;
  size: number;
}

export class UploadService {
  private uploadsDir: string;

  constructor() {
    this.uploadsDir = path.join(__dirname, '../../uploads');
    this.ensureUploadsDirectory();
  }

  private ensureUploadsDirectory(): void {
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async processImage(file: Express.Multer.File): Promise<ProcessedImageResult> {
    try {
      // For now, we'll just return the original file info
      // In the future, you can add image processing logic here
      const imageUrl = `/uploads/${file.filename}`;
      
      return {
        filename: file.filename,
        imageUrl: imageUrl,
        size: file.size
      };
    } catch (error) {
      console.error('Image processing error:', error);
      throw new Error('Failed to process image');
    }
  }

  async deleteImage(filename: string): Promise<void> {
    try {
      const filePath = path.join(this.uploadsDir, filename);
      
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Delete image error:', error);
      throw new Error('Failed to delete image');
    }
  }
}