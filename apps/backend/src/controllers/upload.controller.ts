import { Request, Response, NextFunction } from 'express';
import { UploadService } from '../services/upload.service';
import { createError } from '../middleware/error.middleware';

export class UploadController {
  private uploadService: UploadService;

  constructor() {
    this.uploadService = new UploadService();
  }

  uploadImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        throw createError('No file uploaded', 400);
      }

      const result = await this.uploadService.processImage(req.file);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  deleteImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { filename } = req.params;
      await this.uploadService.deleteImage(filename);
      res.json({ success: true, message: 'Image deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}