export interface DiagnosisResult {
  id: string;
  patientId: string;
  type: 'gastritis' | 'oral';
  imageUrl: string;
  results: {
    confidence: number;
    findings: string[];
    recommendation: string;
    severity?: 'low' | 'medium' | 'high';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDiagnosisRequest {
  patientId: string;
  type: 'gastritis' | 'oral';
  imageFile: File;
}

export interface DiagnosisResponse {
  confidence: number;
  findings: string[];
  recommendation: string;
  severity?: 'low' | 'medium' | 'high';
}
