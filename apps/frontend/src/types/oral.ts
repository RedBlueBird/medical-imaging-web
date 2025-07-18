// src/types/oral.ts

export interface DetectionResults {
  OLP: number;
  OLK: number;
  OOML: number;
}

export interface OralDiagnosisRequest {
  patientId: string;
  imageUrl: string;
  filename: string;
}

export interface OralDiagnosisResponse {
  success: boolean;
  data: {
    results: {
      // Detection scores
      OLP: number;
      OLK: number;
      OOML: number;
      
      // Analysis results
      confidence: number;
      finding: string;
      recommendation: string;
      knowledge: string; // New field for markdown content
      severity: 'low' | 'medium' | 'high';
    };
    patientId: string;
    imageUrl: string;
    timestamp: string;
  };
}

export interface UploadImageResponse {
  success: boolean;
  imageUrl: string;
  filename: string;
}

export interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  phone: string;
  email: string;
  address: string;
  medicalHistory: string;
  allergies: string;
  medications: string;
  diagnosisHistory: DiagnosisHistoryItem[];
}

export interface DiagnosisHistoryItem {
  id: string;
  date: string;
  diagnosis: string;
  confidence: number;
  imageUrl: string;
  findings: string[];
  recommendation: string;
  knowledge?: string; // New field for markdown content
}