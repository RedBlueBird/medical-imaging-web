// hooks/useOralDiagnosis.ts
import { useState, useCallback } from 'react';
import { DetectionResults } from '@/types/oral';
import { oralDiagnosisService } from '@/services/api/oralDiagnosisService';
import { OralDiagnosisResponse } from '@/types/oral';
import { usePatientManagement } from '@/hooks/usePatientManagement';

interface UseOralDiagnosisReturn {
  // Diagnosis state
  selectedImage: string | null;
  selectedFile: File | null;
  isDetecting: boolean;
  detectionComplete: boolean;
  detectionResults: DetectionResults | null;
  diagnosisResponse: OralDiagnosisResponse | null;
  
  // Modal state
  showInstructions: boolean;
  showError: boolean;
  showKnowledge: boolean;
  showReport: boolean;
  error: string | null;
  
  // Patient management (from usePatientManagement)
  patientManagement: ReturnType<typeof usePatientManagement>;
  
  // Diagnosis actions
  setSelectedImage: (image: string | null) => void;
  setSelectedFile: (file: File | null) => void;
  setIsDetecting: (detecting: boolean) => void;
  setDetectionComplete: (complete: boolean) => void;
  setDetectionResults: (results: DetectionResults | null) => void;
  setDiagnosisResponse: (response: OralDiagnosisResponse | null) => void;
  
  // Modal actions
  setShowInstructions: (show: boolean) => void;
  setShowError: (show: boolean) => void;
  setShowKnowledge: (show: boolean) => void;
  setShowReport: (show: boolean) => void;
  setError: (error: string | null) => void;
  
  // Diagnosis handlers
  handleImageSelect: (image: string | null, file: File | null) => void;
  handleDetectionStart: () => Promise<void>;
  handleDetectionComplete: (results: DetectionResults, response: OralDiagnosisResponse) => void;
  handleReset: () => void;
  
  // Computed values
  buttonsEnabled: boolean;
  canStartDetection: boolean;
}

export const useOralDiagnosis = (): UseOralDiagnosisReturn => {
  // Diagnosis state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionComplete, setDetectionComplete] = useState(false);
  const [detectionResults, setDetectionResults] = useState<DetectionResults | null>(null);
  const [diagnosisResponse, setDiagnosisResponse] = useState<OralDiagnosisResponse | null>(null);
  
  // Modal state
  const [showInstructions, setShowInstructions] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showKnowledge, setShowKnowledge] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Patient management hook
  const patientManagement = usePatientManagement();
  
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

      // Use the current patient ID from patient management
      // const patientId = patientManagement.currentPatientId === 'N/A' ? 'patient-0' : patientManagement.currentPatientId;
      const patientId = "patient-0"; // Default to patient-0 for now

      // Call diagnosis API
      const diagnosisResponse = await oralDiagnosisService.analyzeOralImage(patientId, selectedFile);

      // Add the patient to the patients array (or switch to it if it already exists)
      await patientManagement.addPatientById(patientId);

      // Convert API response to DetectionResults format
      const detectionResults: DetectionResults = {
        OLP: diagnosisResponse.data.results.OLP,
        OLK: diagnosisResponse.data.results.OLK,
        OOML: diagnosisResponse.data.results.OOML
      };
      
      // Update state with results
      setDetectionResults(detectionResults);
      setDiagnosisResponse(diagnosisResponse);
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
  }, [selectedFile, patientManagement]);
  
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
  }, []);
  
  // Computed values
  const buttonsEnabled = Boolean(selectedImage && detectionComplete && !isDetecting);
  const canStartDetection = Boolean(selectedImage && selectedFile && !isDetecting && !detectionComplete);
  
  return {
    // Diagnosis state
    selectedImage,
    selectedFile,
    isDetecting,
    detectionComplete,
    detectionResults,
    diagnosisResponse,
    
    // Modal state
    showInstructions,
    showError,
    showKnowledge,
    showReport,
    error,
    
    // Patient management
    patientManagement,
    
    // Diagnosis actions
    setSelectedImage,
    setSelectedFile,
    setIsDetecting,
    setDetectionComplete,
    setDetectionResults,
    setDiagnosisResponse,
    
    // Modal actions
    setShowInstructions,
    setShowError,
    setShowKnowledge,
    setShowReport,
    setError,
    
    // Diagnosis handlers
    handleImageSelect,
    handleDetectionStart,
    handleDetectionComplete,
    handleReset,
    
    // Computed values
    buttonsEnabled,
    canStartDetection
  };
};