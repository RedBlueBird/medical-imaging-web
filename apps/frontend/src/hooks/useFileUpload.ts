// hooks/useFileUpload.ts
import { useCallback } from 'react';

interface UseFileUploadProps {
  onImageSelect: (image: string | null, file: File | null) => void;
  onDetectionReset: () => void;
  onError: (error: string) => void;
}

interface UseFileUploadReturn {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validateFile: (file: File) => { isValid: boolean; error?: string };
}

export const useFileUpload = ({
  onImageSelect,
  onDetectionReset,
  onError
}: UseFileUploadProps): UseFileUploadReturn => {
  
  const validateFile = useCallback((file: File): { isValid: boolean; error?: string } => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    // Check file size
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: `文件大小超过限制 (${(maxSize / 1024 / 1024).toFixed(1)}MB)`
      };
    }
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: `不支持的文件格式。支持的格式: JPEG, PNG, WebP`
      };
    }
    
    return { isValid: true };
  }, []);
  
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) {
      onImageSelect(null, null);
      return;
    }
    
    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      onError(validation.error || 'Invalid file');
      return;
    }
    
    // Reset previous detection results
    onDetectionReset();
    
    // Create image preview URL
    const imageUrl = URL.createObjectURL(file);
    
    // Update state with both image URL and file
    onImageSelect(imageUrl, file);
    
    // Clear input value to allow re-uploading the same file
    event.target.value = '';
  }, [onImageSelect, onDetectionReset, onError, validateFile]);
  
  return {
    handleFileUpload,
    validateFile
  };
};