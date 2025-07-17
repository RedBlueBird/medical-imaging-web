// hooks/useOralDiagnosis.ts
import { useState, useCallback } from 'react';
import { DetectionResults } from '@/types/oral';
import { OralDiagnosisResponse, oralDiagnosisService } from '@/services/api/oralDiagnosisService';

interface UseOralDiagnosisReturn {
  // State
  selectedImage: string | null;
  selectedFile: File | null;
  isDetecting: boolean;
  detectionComplete: boolean;
  detectionResults: DetectionResults | null;
  diagnosisResponse: OralDiagnosisResponse | null;
  currentPatient: number;
  showInstructions: boolean;
  showError: boolean;
  showKnowledge: boolean;
  showReport: boolean;
  reportConfirmed: boolean;
  error: string | null;
  
  // Actions
  setSelectedImage: (image: string | null) => void;
  setSelectedFile: (file: File | null) => void;
  setIsDetecting: (detecting: boolean) => void;
  setDetectionComplete: (complete: boolean) => void;
  setDetectionResults: (results: DetectionResults | null) => void;
  setDiagnosisResponse: (response: OralDiagnosisResponse | null) => void;
  setCurrentPatient: (patient: number) => void;
  setShowInstructions: (show: boolean) => void;
  setShowError: (show: boolean) => void;
  setShowKnowledge: (show: boolean) => void;
  setShowReport: (show: boolean) => void;
  setReportConfirmed: (confirmed: boolean) => void;
  setError: (error: string | null) => void;
  
  // Handlers
  handleImageSelect: (image: string | null, file: File | null) => void;
  handleDetectionStart: () => Promise<void>;
  handleDetectionComplete: (results: DetectionResults, response: OralDiagnosisResponse) => void;
  handleReset: () => void;
  
  // Computed values
  buttonsEnabled: boolean;
  canStartDetection: boolean;
  currentPatientId: string;
}

export const useOralDiagnosis = (): UseOralDiagnosisReturn => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionComplete, setDetectionComplete] = useState(false);
  const [detectionResults, setDetectionResults] = useState<DetectionResults | null>(null);
  const [diagnosisResponse, setDiagnosisResponse] = useState<OralDiagnosisResponse | null>(null);
  const [currentPatient, setCurrentPatient] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportConfirmed, setReportConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handlers
  const handleImageSelect = useCallback((image: string | null, file: File | null) => {
    setSelectedImage(image);
    setSelectedFile(file);
    setDetectionComplete(false);
    setDetectionResults(null);
    setDiagnosisResponse(null);
    setError(null);
  }, []);
  
  const handleDetectionStart = useCallback(async () => {
    if (!selectedFile) {
      setError('No file selected');
      setShowError(true);
      return;
    }

    try {
      setIsDetecting(true);
      setDetectionComplete(false);
      setDetectionResults(null);
      setDiagnosisResponse(null);
      setError(null);

      // Generate patient ID based on current patient
      const patientId = `patient-${currentPatient + 1}`;
      
      // Call the API service
      const response = await oralDiagnosisService.analyzeOralImage(patientId, selectedFile);

      // Convert API response to DetectionResults format
      const detectionResults: DetectionResults = {
        OLP: response.data.results.OLP,
        OLK: response.data.results.OLK,
        OOML: response.data.results.OOML
      };
      
      // Update state with results
      setDetectionResults(detectionResults);
      setDiagnosisResponse(response);
      setDetectionComplete(true);
      setIsDetecting(false);
      
    } catch (error) {
      console.error('Detection error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      setError(errorMessage);
      setIsDetecting(false);
      setDetectionComplete(false);
      setShowError(true);
    }
  }, [selectedFile, currentPatient]);
  
  const handleDetectionComplete = useCallback((results: DetectionResults, response: OralDiagnosisResponse) => {
    setIsDetecting(false);
    setDetectionComplete(true);
    setDetectionResults(results);
    setDiagnosisResponse(response);
    setError(null);
  }, []);
  
  const handleReset = useCallback(() => {
    setSelectedImage(null);
    setSelectedFile(null);
    setIsDetecting(false);
    setDetectionComplete(false);
    setDetectionResults(null);
    setDiagnosisResponse(null);
    setError(null);
    setShowError(false);
    setShowInstructions(false);
    setShowKnowledge(false);
    setShowReport(false);
    setReportConfirmed(false);
  }, []);
  
  // Computed values
  const buttonsEnabled = Boolean(selectedImage && detectionComplete && !isDetecting);
  const canStartDetection = Boolean(selectedImage && selectedFile && !isDetecting && !detectionComplete);
  const currentPatientId = `patient-${currentPatient + 1}`; // Generate patient ID based on current patient index
  
  return {
    // State
    selectedImage,
    selectedFile,
    isDetecting,
    detectionComplete,
    detectionResults,
    diagnosisResponse,
    currentPatient,
    showInstructions,
    showError,
    showKnowledge,
    showReport,
    reportConfirmed,
    error,
    
    // Actions
    setSelectedImage,
    setSelectedFile,
    setIsDetecting,
    setDetectionComplete,
    setDetectionResults,
    setDiagnosisResponse,
    setCurrentPatient,
    setShowInstructions,
    setShowError,
    setShowKnowledge,
    setShowReport,
    setReportConfirmed,
    setError,
    
    // Handlers
    handleImageSelect,
    handleDetectionStart,
    handleDetectionComplete,
    handleReset,
    
    // Computed values
    buttonsEnabled,
    canStartDetection,
    currentPatientId
  };
};