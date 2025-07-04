// hooks/usePatientNavigation.ts
import { useCallback } from 'react';
import { Patient } from '../types/patient';

interface UsePatientNavigationProps {
  currentPatient: number;
  patients: Patient[];
  onPatientChange: (index: number) => void;
}

interface UsePatientNavigationReturn {
  handlePrevPatient: () => void;
  handleNextPatient: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  currentPatientData: Patient;
}

export const usePatientNavigation = ({
  currentPatient,
  patients,
  onPatientChange
}: UsePatientNavigationProps): UsePatientNavigationReturn => {
  
  const handlePrevPatient = useCallback(() => {
    if (currentPatient > 0) {
      onPatientChange(currentPatient - 1);
    }
  }, [currentPatient, onPatientChange]);
  
  const handleNextPatient = useCallback(() => {
    if (currentPatient < patients.length - 1) {
      onPatientChange(currentPatient + 1);
    }
  }, [currentPatient, patients.length, onPatientChange]);
  
  const canGoPrev = currentPatient > 0;
  const canGoNext = currentPatient < patients.length - 1;
  const currentPatientData = patients[currentPatient];
  
  return {
    handlePrevPatient,
    handleNextPatient,
    canGoPrev,
    canGoNext,
    currentPatientData
  };
};