// types/oral.types.ts
export interface DiagnosisState {
  selectedImage: string | null;
  isDetecting: boolean;
  detectionComplete: boolean;
  expandedResults: boolean;
}

export interface DetectionResults {
  OLP: number;
  OLK: number;
  OOML: number;
}

export interface MockResults {
  [key: string]: number;
}

export interface DiagnosisRecommendation {
  title: string;
  description: string;
  suggestions: string[];
}

export interface KnowledgeSection {
  id: string;
  title: string;
  content: string;
  subsections?: KnowledgeSubsection[];
}

export interface KnowledgeSubsection {
  title: string;
  content: string;
}

export interface ReportData {
  patientName: string;
  patientId: string;
  diagnosis: string;
  date: string;
  doctor: string;
  biopsyConfirmed: boolean;
  results: DetectionResults;
  recommendations: DiagnosisRecommendation;
}

export interface ModalState {
  showInstructions: boolean;
  showError: boolean;
  showKnowledge: boolean;
  showReport: boolean;
  reportConfirmed: boolean;
}