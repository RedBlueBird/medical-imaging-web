import { Request, Response, NextFunction } from 'express';
import { DiagnosisService } from '../services/diagnosis.service';
import { CreateDiagnosisRequest } from '@shared/types';

export class DiagnosisController {
  private diagnosisService: DiagnosisService;

  constructor() {
    this.diagnosisService = new DiagnosisService();
  }

  analyzeGastritis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const diagnosisData: CreateDiagnosisRequest = req.body;
      const result = await this.diagnosisService.analyzeGastritis(diagnosisData);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  analyzeOral = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const diagnosisData: CreateDiagnosisRequest = req.body;
      const result = await this.diagnosisService.analyzeOral(diagnosisData);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  };

  getDiagnosisById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const diagnosis = await this.diagnosisService.getDiagnosisById(id);
      res.json({ success: true, data: diagnosis });
    } catch (error) {
      next(error);
    }
  };

  getDiagnosisByPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { patientId } = req.params;
      const diagnoses = await this.diagnosisService.getDiagnosisByPatient(patientId);
      res.json({ success: true, data: diagnoses });
    } catch (error) {
      next(error);
    }
  };

  deleteDiagnosis = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      await this.diagnosisService.deleteDiagnosis(id);
      res.json({ success: true, message: 'Diagnosis deleted successfully' });
    } catch (error) {
      next(error);
    }
  };
}