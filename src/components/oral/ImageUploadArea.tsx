// src/components/oral/ImageUploadArea.tsx
import React from 'react';
import { Upload } from 'lucide-react';
import { useColors } from '@/config/colors';
import GlassCard from '@/components/ui/GlassCard';

interface ImageUploadAreaProps {
  selectedImage: string | null;
  mockResults: { [key: string]: number };
  detectionComplete: boolean;
  expandedResults: boolean;
  onExpandedResults: (expanded: boolean) => void;
}

const ImageUploadArea: React.FC<ImageUploadAreaProps> = ({
  selectedImage,
  mockResults,
  detectionComplete,
  expandedResults,
  onExpandedResults
}) => {
  const colors = useColors();
  
  return (
    <div className="space-y-4">
      <div className="aspect-square border-2 border-dashed border-white/30 rounded-xl flex items-center justify-center bg-white/5 min-h-[400px]">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        ) : (
          <div className="text-center">
            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className={`${colors.textSecondary} text-lg`}>
              请选择图片文件
            </p>
          </div>
        )}
      </div>
      
      {/* Detection Results */}
      {detectionComplete && (
        <GlassCard className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg font-semibold ${colors.textPrimary}`}>
              辅助检查结果
            </h3>
            <button
              onClick={() => onExpandedResults(!expandedResults)}
              className={`px-4 py-2 rounded-lg ${colors.buttonGhost} transition-colors`}
            >
              {expandedResults ? '收起' : '展开'}
            </button>
          </div>
          
          {expandedResults && (
            <div className="space-y-2">
              {Object.entries(mockResults).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className={colors.textSecondary}>{key}:</span>
                  <span className={colors.textPrimary}>{value.toFixed(3)}</span>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      )}
    </div>
  );
};

export default ImageUploadArea;