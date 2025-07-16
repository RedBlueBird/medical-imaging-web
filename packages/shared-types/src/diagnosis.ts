// @shared/types.ts

export interface DiagnosisResponse {
  confidence: number;
  findings: string[];
  recommendation: string;
  severity?: 'low' | 'medium' | 'high';
  // Oral-specific fields
  OLP?: number;
  OLK?: number;
  OOML?: number;
}

export interface DiagnosisResult {
  _id?: string;
  id?: string; // for compatibility
  patientId: string;
  type: 'gastritis' | 'oral';
  imageUrl: string;
  results: DiagnosisResponse;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateDiagnosisRequest {
  patientId: string;
  type?: 'gastritis' | 'oral';
  imageFile?: File;
  imageUrl?: string;
  filename?: string;
}

export interface Patient {
  _id?: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  medicalHistory?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreatePatientRequest {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contactInfo?: {
    phone?: string;
    email?: string;
  };
  medicalHistory?: string[];
}

export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {
  _id: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Frontend-specific types
export interface DetectionResults {
  OLP: number;
  OLK: number;
  OOML: number;
}

export interface DetectionStatus {
  isDetecting: boolean;
  progress: number;
  stage: string;
  error?: string;
}

export interface OralDiagnosisState {
  selectedImage: string | null;
  isDetecting: boolean;
  detectionComplete: boolean;
  detectionResults: DetectionResults | null;
  currentPatient: number;
  showInstructions: boolean;
  showError: boolean;
  showKnowledge: boolean;
  showReport: boolean;
  reportConfirmed: boolean;
  expandedResults: boolean;
  error: string | null;
}
