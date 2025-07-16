// src/services/diagnosis.service.ts
import { DiagnosisResult, CreateDiagnosisRequest, DiagnosisResponse } from '@shared/types';
// Remove database imports for testing
// import { DiagnosisModel } from '../models/Diagnosis';
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

      // Return mock data directly without database save
      const mockDiagnosis: DiagnosisResult = {
        id: `gastritis_${Date.now()}`, // Mock ID
        patientId: diagnosisData.patientId,
        type: 'gastritis',
        imageUrl: diagnosisData.imageUrl || '/uploads/temp-image.jpg',
        results: mockResult,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return mockDiagnosis;
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
      
      const mockResults: DiagnosisResponse = {
        ...mockOralResults,
        confidence: Math.max(mockOralResults.OLP, mockOralResults.OLK, mockOralResults.OOML),
        findings: this.generateFindings(mockOralResults),
        recommendation: this.generateRecommendation(mockOralResults),
        severity: this.calculateSeverity(mockOralResults)
      };

      // Return mock data directly without database save
      const mockDiagnosis: DiagnosisResult = {
        id: `oral_${Date.now()}`, // Mock ID
        patientId: diagnosisData.patientId,
        type: 'oral',
        imageUrl: diagnosisData.imageUrl || '/uploads/temp-image.jpg',
        results: mockResults,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      return mockDiagnosis;
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

  private generateFindings(results: { OLP: number; OLK: number; OOML: number }): string[] {
    const findings: string[] = [];
    
    if (results.OLK > 0.5) {
      findings.push('口腔白斑病特征明显');
      findings.push('建议进一步病理检查');
    }
    
    if (results.OLP > 0.3) {
      findings.push('检测到口腔扁平苔藓相关特征');
    }
    
    if (results.OOML > 0.2) {
      findings.push('发现其他口腔病变迹象');
    }
    
    if (findings.length === 0) {
      findings.push('未检测到明显异常');
    }
    
    return findings;
  }

  private generateRecommendation(results: { OLP: number; OLK: number; OOML: number }): string {
    const maxValue = Math.max(results.OLP, results.OLK, results.OOML);
    const dominantCondition = Object.entries(results).find(([_, value]) => value === maxValue)?.[0];
    
    switch (dominantCondition) {
      case 'OLK':
        return maxValue > 0.7 ? '强烈建议口腔病理学专家会诊' : '建议定期随访观察';
      case 'OLP':
        return '建议口腔科专科治疗';
      case 'OOML':
        return '建议进一步影像学检查';
      default:
        return '建议定期口腔检查';
    }
  }

  private calculateSeverity(results: { OLP: number; OLK: number; OOML: number }): 'low' | 'medium' | 'high' {
    const maxValue = Math.max(results.OLP, results.OLK, results.OOML);
    
    if (maxValue >= 0.7) return 'high';
    if (maxValue >= 0.4) return 'medium';
    return 'low';
  }

  // Mock implementations for other methods (return mock data)
  async getDiagnosisById(id: string): Promise<DiagnosisResult> {
    // Simulate database lookup delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Return mock diagnosis
    const mockDiagnosis: DiagnosisResult = {
      id: id,
      patientId: 'patient-123',
      type: 'oral',
      imageUrl: '/uploads/temp-image.jpg',
      results: {
        confidence: 0.75,
        findings: ['Mock finding for ID: ' + id],
        recommendation: 'Mock recommendation',
        severity: 'medium'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return mockDiagnosis;
  }

  async getDiagnosisByPatient(patientId: string): Promise<DiagnosisResult[]> {
    // Simulate database lookup delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Return mock diagnoses array
    const mockDiagnoses: DiagnosisResult[] = [
      {
        id: `diagnosis_1_${Date.now()}`,
        patientId: patientId,
        type: 'oral',
        imageUrl: '/uploads/temp-image-1.jpg',
        results: {
          confidence: 0.85,
          findings: ['First mock diagnosis'],
          recommendation: 'First mock recommendation',
          severity: 'high'
        },
        createdAt: new Date(Date.now() - 86400000), // 1 day ago
        updatedAt: new Date(Date.now() - 86400000)
      },
      {
        id: `diagnosis_2_${Date.now()}`,
        patientId: patientId,
        type: 'gastritis',
        imageUrl: '/uploads/temp-image-2.jpg',
        results: {
          confidence: 0.65,
          findings: ['Second mock diagnosis'],
          recommendation: 'Second mock recommendation',
          severity: 'medium'
        },
        createdAt: new Date(Date.now() - 172800000), // 2 days ago
        updatedAt: new Date(Date.now() - 172800000)
      }
    ];
    
    return mockDiagnoses;
  }

  async deleteDiagnosis(id: string): Promise<void> {
    // Simulate database deletion delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Mock deletion - in real implementation, this would delete from database
    console.log(`Mock deletion of diagnosis with ID: ${id}`);
    
    // You could throw an error here to simulate "not found" scenarios:
    // throw createError('Diagnosis not found', 404);
  }
}