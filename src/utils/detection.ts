// /utils/detection.ts

export interface DetectionResults {
  OLP: number;
  OLK: number;
  OOML: number;
}

export interface DetectionConfig {
  minDetectionTime: number;
  maxDetectionTime: number;
  supportedFormats: string[];
  maxFileSize: number; // in bytes
}

export interface DetectionStatus {
  isDetecting: boolean;
  progress: number;
  stage: string;
  error?: string;
}

/**
 * Simulate AI detection process
 */
export const simulateDetection = (
  imageFile: File,
  onProgress?: (status: DetectionStatus) => void
): Promise<DetectionResults> => {
  return new Promise((resolve, reject) => {
    const stages = [
      '图像预处理...',
      '特征提取...',
      '模型分析...',
      '结果计算...',
      '检测完成'
    ];
    
    let currentStage = 0;
    let progress = 0;
    
    const updateProgress = () => {
      if (currentStage < stages.length) {
        progress = (currentStage / stages.length) * 100;
        
        if (onProgress) {
          onProgress({
            isDetecting: true,
            progress,
            stage: stages[currentStage]
          });
        }
        
        currentStage++;
        setTimeout(updateProgress, 600); // 600ms per stage
      } else {
        // Generate mock results
        const results = generateMockResults();
        
        if (onProgress) {
          onProgress({
            isDetecting: false,
            progress: 100,
            stage: '检测完成'
          });
        }
        
        resolve(results);
      }
    };
    
    // Start detection
    updateProgress();
  });
};

/**
 * Generate mock detection results
 */
const generateMockResults = (): DetectionResults => {
  // Generate realistic-looking probabilities that sum to approximately 1
  const baseValues = {
    OLP: 0.184,
    OLK: 0.651,
    OOML: 0.121
  };
  
  // Add some randomness to make it more realistic
  const variation = 0.05; // 5% variation
  
  const results = {
    OLP: Math.max(0, Math.min(1, baseValues.OLP + (Math.random() - 0.5) * variation)),
    OLK: Math.max(0, Math.min(1, baseValues.OLK + (Math.random() - 0.5) * variation)),
    OOML: Math.max(0, Math.min(1, baseValues.OOML + (Math.random() - 0.5) * variation))
  };
  
  return results;
};

/**
 * Validate image file for detection
 */
export const validateImageFile = (file: File, config: DetectionConfig): { isValid: boolean; error?: string } => {
  // Check file size
  if (file.size > config.maxFileSize) {
    return {
      isValid: false,
      error: `文件大小超过限制 (${(config.maxFileSize / 1024 / 1024).toFixed(1)}MB)`
    };
  }
  
  // Check file format
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  if (!fileExtension || !config.supportedFormats.includes(fileExtension)) {
    return {
      isValid: false,
      error: `不支持的文件格式。支持的格式: ${config.supportedFormats.join(', ')}`
    };
  }
  
  // Check if it's actually an image
  if (!file.type.startsWith('image/')) {
    return {
      isValid: false,
      error: '请选择有效的图像文件'
    };
  }
  
  return { isValid: true };
};

/**
 * Get detection confidence level
 */
export const getConfidenceLevel = (results: DetectionResults): 'high' | 'medium' | 'low' => {
  const maxValue = Math.max(results.OLP, results.OLK, results.OOML);
  
  if (maxValue >= 0.7) return 'high';
  if (maxValue >= 0.5) return 'medium';
  return 'low';
};

/**
 * Get diagnosis recommendation based on results
 */
export const getDiagnosisRecommendation = (results: DetectionResults): string => {
  const maxValue = Math.max(results.OLP, results.OLK, results.OOML);
  const dominantCondition = Object.entries(results).find(([_, value]) => value === maxValue)?.[0];
  
  switch (dominantCondition) {
    case 'OLK':
      return '口腔白斑病 待排';
    case 'OLP':
      return '口腔扁平苔藓 待排';
    case 'OOML':
      return '口腔其他恶性病变 待排';
    default:
      return '需要进一步检查';
  }
};

/**
 * Format detection results for display
 */
export const formatDetectionResults = (results: DetectionResults): Array<{
  label: string;
  value: number;
  percentage: string;
  confidence: 'high' | 'medium' | 'low';
}> => {
  const labels = {
    OLP: '口腔扁平苔藓',
    OLK: '口腔白斑病',
    OOML: '口腔其他恶性病变'
  };
  
  return Object.entries(results).map(([key, value]) => ({
    label: labels[key as keyof typeof labels],
    value,
    percentage: (value * 100).toFixed(1) + '%',
    confidence: value >= 0.7 ? 'high' : value >= 0.5 ? 'medium' : 'low'
  }));
};

/**
 * Reset detection state
 */
export const resetDetection = (): DetectionStatus => {
  return {
    isDetecting: false,
    progress: 0,
    stage: '准备检测...'
  };
};