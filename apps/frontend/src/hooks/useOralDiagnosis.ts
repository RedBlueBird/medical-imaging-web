// hooks/useOralDiagnosis.ts
import { useState, useCallback } from 'react';

interface UseOralDiagnosisReturn {
  // State
  selectedImage: string | null;
  isDetecting: boolean;
  detectionComplete: boolean;
  currentPatient: number;
  showInstructions: boolean;
  showError: boolean;
  showKnowledge: boolean;
  showReport: boolean;
  reportConfirmed: boolean;
  expandedResults: boolean;
  
  // Actions
  setSelectedImage: (image: string | null) => void;
  setIsDetecting: (detecting: boolean) => void;
  setDetectionComplete: (complete: boolean) => void;
  setCurrentPatient: (patient: number) => void;
  setShowInstructions: (show: boolean) => void;
  setShowError: (show: boolean) => void;
  setShowKnowledge: (show: boolean) => void;
  setShowReport: (show: boolean) => void;
  setReportConfirmed: (confirmed: boolean) => void;
  setExpandedResults: (expanded: boolean) => void;
  
  // Computed values
  buttonsEnabled: boolean;
}

export const useOralDiagnosis = (): UseOralDiagnosisReturn => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionComplete, setDetectionComplete] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportConfirmed, setReportConfirmed] = useState(false);
  const [expandedResults, setExpandedResults] = useState(false);
  
  // Computed values
  const buttonsEnabled = Boolean(selectedImage && detectionComplete);
  
  return {
    // State
    selectedImage,
    isDetecting,
    detectionComplete,
    currentPatient,
    showInstructions,
    showError,
    showKnowledge,
    showReport,
    reportConfirmed,
    expandedResults,
    
    // Actions
    setSelectedImage,
    setIsDetecting,
    setDetectionComplete,
    setCurrentPatient,
    setShowInstructions,
    setShowError,
    setShowKnowledge,
    setShowReport,
    setReportConfirmed,
    setExpandedResults,
    
    // Computed values
    buttonsEnabled
  };
};