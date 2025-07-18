// hooks/usePatientManagement.ts
import { useState, useCallback, useEffect } from 'react';
import { Patient } from '@shared/types';
import { patientService } from '@/services/api/patientService';

interface UsePatientManagementReturn {
  // State
  patients: Patient[];
  currentPatient: number;
  currentPatientData: Patient;
  totalPatients: number;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setCurrentPatient: (index: number) => void;
  setPatients: (patients: Patient[]) => void;
  setCurrentPatientData: (patient: Patient) => void;
  refreshCurrentPatient: () => Promise<void>;
  loadAllPatients: () => Promise<void>;
  addPatientById: (patientId: string) => Promise<void>;
  
  // Navigation
  handlePrevPatient: () => void;
  handleNextPatient: () => void;
  
  // Computed values
  currentPatientId: string;
  currentPatientIndex: number;
  canNavigatePrev: boolean;
  canNavigateNext: boolean;
}

// Default patient data to prevent undefined errors
const defaultPatient: Patient = {
  name: '未选择患者',
  id: 'N/A',
  history: '无',
  date: 'N/A',
  index: 'N/A',
  biopsyConfirmed: false,
  doctor: 'N/A'
};

export const usePatientManagement = (): UsePatientManagementReturn => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [currentPatient, setCurrentPatient] = useState(0);
  const [currentPatientData, setCurrentPatientData] = useState<Patient>(defaultPatient);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Load all patients
  const loadAllPatients = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await patientService.getAllPatients();
      setPatients(response.data);
      
      // Set current patient data if patients exist
      if (response.data.length > 0) {
        const patientIndex = Math.min(currentPatient, response.data.length - 1);
        setCurrentPatient(patientIndex);
        setCurrentPatientData(response.data[patientIndex]);
      } else {
        setCurrentPatientData(defaultPatient);
      }
    } catch (error) {
      console.error('Error loading patients:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load patients';
      setError(errorMessage);
      setCurrentPatientData(defaultPatient);
    } finally {
      setIsLoading(false);
    }
  }, [currentPatient]);
  
  // Handle patient change
  const handlePatientChange = useCallback((patientIndex: number) => {
    if (patientIndex >= 0 && patientIndex < patients.length) {
      setCurrentPatient(patientIndex);
      setCurrentPatientData(patients[patientIndex]);
      setError(null);
    }
  }, [patients]);
  
  // Add a new patient by ID
  const addPatientById = useCallback(async (patientId: string) => {
    // Check if patient already exists
    console.log('Adding patient by ID:', patientId); // Debug log
    console.log('Current patients:', patients); // Debug log
    const existingPatientIndex = patients.findIndex(p => p.id === patientId);
    if (existingPatientIndex !== -1) {
      // Patient already exists, just switch to it
      handlePatientChange(existingPatientIndex);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await patientService.getPatientById(patientId);
      
      if (response.success) {
        const newPatient = response.data;

        console.log('Adding new patient:', newPatient); // Debug log
        
        // Add new patient to the array
        setPatients(prevPatients => {
          const updatedPatients = [...prevPatients, newPatient];
          return updatedPatients;
        });
        
        // Switch to the new patient (it will be at the end of the array)
        const newPatientIndex = patients.length;
        setCurrentPatient(newPatientIndex);
        setCurrentPatientData(newPatient);
      }
    } catch (error) {
      console.error('Error adding patient:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to add patient';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [patients, handlePatientChange]);
  
  // Refresh current patient data from API
  const refreshCurrentPatient = useCallback(async () => {
    if (!currentPatientData?.id || currentPatientData.id === 'N/A') {
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await patientService.getPatientById(currentPatientData.id);
      
      if (response.success) {
        setCurrentPatientData(response.data);
        
        // Update the patient in the patients array
        setPatients(prevPatients => {
          const updatedPatients = [...prevPatients];
          const patientIndex = updatedPatients.findIndex(p => p.id === response.data.id);
          if (patientIndex !== -1) {
            updatedPatients[patientIndex] = response.data;
          }
          return updatedPatients;
        });
      }
    } catch (error) {
      console.error('Error refreshing patient:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to refresh patient data';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [currentPatientData?.id]);
  
  // Navigation handlers
  const handlePrevPatient = useCallback(() => {
    if (currentPatient > 0) {
      handlePatientChange(currentPatient - 1);
    }
  }, [currentPatient, handlePatientChange]);
  
  const handleNextPatient = useCallback(() => {
    if (currentPatient < patients.length - 1) {
      handlePatientChange(currentPatient + 1);
    }
  }, [currentPatient, patients.length, handlePatientChange]);
  
  // Update current patient data when patients array or current patient index changes
  useEffect(() => {
    if (patients.length > 0 && currentPatient < patients.length) {
      setCurrentPatientData(patients[currentPatient]);
    } else if (patients.length === 0) {
      setCurrentPatientData(defaultPatient);
    }
  }, [patients, currentPatient]);
  
  // Computed values
  const currentPatientId = currentPatientData?.id || `patient-${currentPatient + 1}`;
  const currentPatientIndex = currentPatient;
  const canNavigatePrev = currentPatient > 0;
  const canNavigateNext = currentPatient < patients.length - 1;
  const totalPatients = patients.length;
  
  return {
    // State
    patients,
    currentPatient,
    currentPatientData,
    totalPatients,
    isLoading,
    error,
    
    // Actions
    setCurrentPatient: handlePatientChange,
    setPatients,
    setCurrentPatientData,
    refreshCurrentPatient,
    loadAllPatients,
    addPatientById,
    
    // Navigation
    handlePrevPatient,
    handleNextPatient,
    
    // Computed values
    currentPatientId,
    currentPatientIndex,
    canNavigatePrev,
    canNavigateNext
  };
};