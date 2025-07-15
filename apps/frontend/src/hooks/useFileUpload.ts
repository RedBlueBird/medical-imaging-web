// hooks/useFileUpload.ts
import { useCallback } from 'react';
import { validateFile } from '../utils/fileValidation';

interface UseFileUploadProps {
  onImageSelect: (image: string) => void;
  onDetectionReset: () => void;
  onError: (error: string) => void;
}

interface UseFileUploadReturn {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useFileUpload = ({ 
  onImageSelect, 
  onDetectionReset, 
  onError 
}: UseFileUploadProps): UseFileUploadReturn => {
  
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      onError(validation.error || 'Invalid file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        onImageSelect(result);
        onDetectionReset();
      }
    };
    
    reader.onerror = () => {
      onError('Failed to read file');
    };
    
    reader.readAsDataURL(file);
  }, [onImageSelect, onDetectionReset, onError]);
  
  return {
    handleFileUpload
  };
};