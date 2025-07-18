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
          knowledge: this.generateKnowledge(),
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
    const recommendation = `经AI辅助系统诊断，该患者可能患有口腔白斑病。口腔白斑病不是癌症，但是有一定的癌变风险，建议前往专业口腔黏膜科室接受进一步诊断，提高警惕，严密观察，并必要时可进行多次组织活检。\n口腔白斑病治疗第一步是去除任何可能的刺激因素，去除残根、残冠及不良修复体，纠正不良生活习惯。例如戒烟戒酒，不吃刺激食品和过烫、粗糙食物等，然后根据不同的病情决定用药还是采用其他治疗方案。定期随访是非常重要的，如果观察到白斑增厚、变硬、出现溃疡等的时候，应及时手术切除。`; // Placeholder for actual recommendation logic
    return recommendation;
  }

  private generateKnowledge(): string {
    // Generate mock markdown content identical to the current one
    const knowledge = `# 为什么会生口腔白斑?

## 1.吸烟等理化刺激

与白斑的发生密切相关，白斑的发生率与吸烟时间的长短及吸烟量呈正比关系。发病部位与烟接触口腔的方式、烟雾刺激的部位有关。吸烟对口腔黏膜可以产生物理、化学刺激引起口腔黏膜的病理性变化。吸烟时产生的高温对口腔有灼伤作用，引起局部黏膜充血、水肿，同时烟和烟燃烧时产生的烟雾中含有尼古丁、焦油、二苯蔥等致癌物质。这些有害的物质可直接进入口腔黏膜上皮，破坏黏膜上皮，通过长期慢性刺激，使局部形成一种慢性炎症过程，机体产生一种防御性的增生反应。

## 2、与局部刺激有关

饮酒、进食过烫或酸辣食物、嚼槟榔等均与白斑形成相关。食用刺激性食物如烫、辣、硬食会使上消化道黏膜组织发生不同程度的损伤，轻者导致黏膜充血、水肿、变性、渗出，形成炎症，重者可导致黏膜糜烂、溃疡等。长期反复的刺激会使黏膜发生慢性炎症，进而发生白斑样改变。`;

    return knowledge;
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