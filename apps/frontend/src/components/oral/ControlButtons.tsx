// src/components/oral/ControlButtons.tsx
import React from 'react';
import { Upload, Download, BookOpen, Eye } from 'lucide-react';
import { useColors } from '@/config/colors';

interface ControlButtonsProps {
  buttonsEnabled: boolean;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onShowInstructions: () => void;
  onShowReport: () => void;
  onShowKnowledge: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  buttonsEnabled,
  onFileUpload,
  onShowInstructions,
  onShowReport,
  onShowKnowledge
}) => {
  const colors = useColors();
  
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <label className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 cursor-pointer ${colors.buttonPrimary} ${colors.textLight} border ${colors.borderAccent} ${colors.shadow} flex items-center gap-2`}>
        <Upload className="w-5 h-5" />
        选择待检图片文件
        <input
          type="file"
          accept="image/*"
          onChange={onFileUpload}
          className="hidden"
        />
      </label>
      
      <button
        onClick={onShowInstructions}
        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${colors.buttonGhost} ${colors.textLight} border ${colors.glassBorder} flex items-center gap-2`}
      >
        <Eye className="w-5 h-5" />
        图像导入说明
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
        onClick={onShowKnowledge}
        disabled={!buttonsEnabled}
        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${buttonsEnabled ? colors.buttonPrimary : 'bg-gray-500/50 cursor-not-allowed'} ${colors.textLight} border ${colors.borderAccent} ${colors.shadow} flex items-center gap-2`}
      >
        <BookOpen className="w-5 h-5" />
        医学知识宣讲
      </button>
    </div>
  );
};

export default ControlButtons;