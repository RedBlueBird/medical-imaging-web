// hooks/useDetection.ts
import { useCallback } from 'react';
import { simulateDetection } from '../utils/detection';
import { DetectionResults } from '../types/oral.types.ts';

interface UseDetectionProps {
  selectedImage: string | null;
  onDetectionStart: () => void;
  onDetectionComplete: (results: DetectionResults) => void;
  onDetectionError: (error: string) => void;
}

interface UseDetectionReturn {
  handleStartDetection: () => void;
  canStartDetection: boolean;
}

export const useDetection = ({
  selectedImage,
  onDetectionStart,
  onDetectionComplete,
  onDetectionError
}: UseDetectionProps): UseDetectionReturn => {
  
  const handleStartDetection = useCallback(async () => {
    if (!selectedImage) return;
    
    try {
      onDetectionStart();
      const results = await simulateDetection(selectedImage);
      onDetectionComplete(results);
    } catch (error) {
      onDetectionError(error instanceof Error ? error.message : 'Detection failed');
    }
  }, [selectedImage, onDetectionStart, onDetectionComplete, onDetectionError]);
  
  const canStartDetection = Boolean(selectedImage);
  
  return {
    handleStartDetection,
    canStartDetection
  };
};