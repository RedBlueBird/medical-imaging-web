// src/components/oral/BottomControls.tsx
import React from 'react';
import { ChevronLeft, ChevronRight, Download, BookOpen } from 'lucide-react';
import { useColors } from '@/config/colors';

interface BottomControlsProps {
  selectedImage: string | null;
  isDetecting: boolean;
  onStartDetection: () => void;
  currentPatient: number;
  totalPatients: number;
  onPrevPatient: () => void;
  onNextPatient: () => void;
  buttonsEnabled: boolean;
  onShowReport: () => void;
  onShowKnowledge: () => void;
}

const BottomControls: React.FC<BottomControlsProps> = ({
  selectedImage,
  isDetecting,
  onStartDetection,
  currentPatient,
  totalPatients,
  onPrevPatient,
  onNextPatient,
  buttonsEnabled,
  onShowReport,
  onShowKnowledge
}) => {
  const colors = useColors();
  
  return (
    <div className="flex justify-between items-center mt-8">
      {/* Left side - Patient Navigation - Takes half width */}
      <div className="flex items-center justify-between w-1/2">
        <button
          onClick={onPrevPatient}
          disabled={currentPatient === 0}
          className={`p-3 rounded-lg ${currentPatient === 0 ? 'bg-gray-500/50 cursor-not-allowed' : colors.buttonGhost} transition-colors`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <span className={`${colors.textPrimary} font-medium`}>
          前一患者 | 后一患者
        </span>
        
        <button
          onClick={onNextPatient}
          disabled={currentPatient === totalPatients - 1}
          className={`p-3 rounded-lg ${currentPatient === totalPatients - 1 ? 'bg-gray-500/50 cursor-not-allowed' : colors.buttonGhost} transition-colors`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      {/* Right side - Knowledge, Report and Detection buttons */}
      <div className="flex items-center gap-4">
        <button
          onClick={onShowKnowledge}
          disabled={!buttonsEnabled}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${buttonsEnabled ? colors.buttonPrimary : 'bg-gray-500/50 cursor-not-allowed'} ${colors.textLight} border ${colors.borderAccent} ${colors.shadow} flex items-center gap-2`}
        >
          <BookOpen className="w-5 h-5" />
          医学知识宣讲
        </button>
        
        <button
          onClick={onShowReport}
          disabled={!buttonsEnabled}
          className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${buttonsEnabled ? colors.buttonPrimary : 'bg-gray-500/50 cursor-not-allowed'} ${colors.textLight} border ${colors.borderAccent} ${colors.shadow} flex items-center gap-2`}
        >
          <Download className="w-5 h-5" />
          下载报告
        </button>
        
        <button
          onClick={onStartDetection}
          disabled={!selectedImage || isDetecting}
          className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
            selectedImage && !isDetecting 
              ? colors.buttonPrimary 
              : 'bg-gray-500/50 cursor-not-allowed'
          } ${colors.textLight} border ${colors.borderAccent} ${colors.shadow}`}
        >
          {isDetecting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              检测中...
            </div>
          ) : (
            '开始检测'
          )}
        </button>
      </div>
    </div>
  );
};

export default BottomControls;