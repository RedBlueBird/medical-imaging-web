import { DiagnosisResult, CreateDiagnosisRequest, DiagnosisResponse } from '@shared/types';
import { DiagnosisModel } from '../models/Diagnosis';
import { createError } from '../middleware/error.middleware';

export class DiagnosisService {
  async analyzeGastritis(diagnosisData: CreateDiagnosisRequest): Promise<DiagnosisResult> {
    try {
      // TODO: Implement actual gastritis analysis logic
      const mockResult: DiagnosisResponse = {
        confidence: 0.85,
        findings: ['Mild gastritis detected', 'Inflammation in antrum region'],
        recommendation: 'Recommend follow-up with gastroenterologist',
        severity: 'medium'
      };

      const diagnosis = new DiagnosisModel({
        patientId: diagnosisData.patientId,
        type: 'gastritis',
        imageUrl: '/uploads/temp-image.jpg', // TODO: Handle actual image upload
        results: mockResult
      });

      return await diagnosis.save();
    } catch (error) {
      throw createError('Failed to analyze gastritis image', 500);
    }
  }

  async analyzeOral(diagnosisData: CreateDiagnosisRequest): Promise<DiagnosisResult> {
    try {
      // TODO: Implement actual oral analysis logic
      const mockResult: DiagnosisResponse = {
        confidence: 0.78,
        findings: ['Possible oral lesion detected', 'Requires further examination'],
        recommendation: 'Consult with oral pathologist',
        severity: 'medium'
      };

      const diagnosis = new DiagnosisModel({
        patientId: diagnosisData.patientId,
        type: 'oral',
        imageUrl: '/uploads/temp-image.jpg', // TODO: Handle actual image upload
        results: mockResult
      });

      return await diagnosis.save();
    } catch (error) {
      throw createError('Failed to analyze oral image', 500);
    }
  }

  async getDiagnosisById(id: string): Promise<DiagnosisResult> {
    const diagnosis = await DiagnosisModel.findById(id);
    if (!diagnosis) {
      throw createError('Diagnosis not found', 404);
    }
    return diagnosis;
  }

  async getDiagnosisByPatient(patientId: string): Promise<DiagnosisResult[]> {
    return await DiagnosisModel.find({ patientId }).sort({ createdAt: -1 });
  }

  async deleteDiagnosis(id: string): Promise<void> {
    const diagnosis = await DiagnosisModel.findByIdAndDelete(id);
    if (!diagnosis) {
      throw createError('Diagnosis not found', 404);
    }
  }
}