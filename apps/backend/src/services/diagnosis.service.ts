// src/services/diagnosis.service.ts
import { DiagnosisResult, CreateDiagnosisRequest, DiagnosisResponse } from '@shared/types';
import { DiagnosisModel } from '../models/Diagnosis';
import { createError } from '../middleware/error.middleware';

export class DiagnosisService {
  async analyzeGastritis(diagnosisData: CreateDiagnosisRequest): Promise<DiagnosisResult> {
    try {
      const mockResult: DiagnosisResponse = {
        confidence: 0.85,
        findings: ['Mild gastritis detected', 'Inflammation in antrum region'],
        recommendation: 'Recommend follow-up with gastroenterologist',
        severity: 'medium'
      };

      const diagnosis = new DiagnosisModel({
        patientId: diagnosisData.patientId,
        type: 'gastritis',
        imageUrl: diagnosisData.imageUrl || '/uploads/temp-image.jpg',
        results: mockResult
      });

      return await diagnosis.save();
    } catch (error) {
      throw createError('Failed to analyze gastritis image', 500);
    }
  }

  async analyzeOral(diagnosisData: CreateDiagnosisRequest): Promise<DiagnosisResult> {
    try {
      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock oral-specific results
      const mockOralResults = this.generateMockOralResults();
      
      const diagnosis = new DiagnosisModel({
        patientId: diagnosisData.patientId,
        type: 'oral',
        imageUrl: diagnosisData.imageUrl || '/uploads/temp-image.jpg',
        results: {
          ...mockOralResults,
          confidence: Math.max(mockOralResults.OLP, mockOralResults.OLK, mockOralResults.OOML),
          finding: this.generateFinding(),
          recommendation: this.generateRecommendation(),
          severity: this.calculateSeverity(mockOralResults)
        }
      });

      return await diagnosis.save();
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : String(error);
      throw createError('Failed to analyze oral image: ' + errorMessage, 500);
    }
  }

  private generateMockOralResults(): { OLP: number; OLK: number; OOML: number } {
    // Base values with some randomness
    const baseValues = {
      OLP: 0.184,
      OLK: 0.651,
      OOML: 0.121
    };
    
    const variation = 0.15; // 15% variation
    
    return {
      OLP: Math.max(0.01, Math.min(0.99, baseValues.OLP + (Math.random() - 0.5) * variation)),
      OLK: Math.max(0.01, Math.min(0.99, baseValues.OLK + (Math.random() - 0.5) * variation)),
      OOML: Math.max(0.01, Math.min(0.99, baseValues.OOML + (Math.random() - 0.5) * variation))
    };
  }

  private generateFinding(): string {
    const finding = "口腔白斑病 待排"; // Placeholder for actual finding logic

    return finding;
  }

  private generateRecommendation(): string {
    const recommendation = "口腔白斑病不是癌症，但是有一定的癌变风险，建议前往专业口腔黏膜科室接受进一步诊断，提高警惕，严密观察，并必要时可进行多次组织活检。"; // Placeholder for actual recommendation logic

    return recommendation;
  }

  private calculateSeverity(results: { OLP: number; OLK: number; OOML: number }): 'low' | 'medium' | 'high' {
    const maxValue = Math.max(results.OLP, results.OLK, results.OOML);
    
    if (maxValue >= 0.7) return 'high';
    if (maxValue >= 0.4) return 'medium';
    return 'low';
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