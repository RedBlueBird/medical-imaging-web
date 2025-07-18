// src/components/oral/ControlButtons.tsx
import React from 'react';
import Link from 'next/link';
import { Upload, Eye, ArrowLeft } from 'lucide-react';
import { useColors } from '@/config/colors';

interface ControlButtonsProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onShowInstructions: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onFileUpload,
  onShowInstructions
}) => {
  const colors = useColors();
  
  return (
    <div className="flex justify-between items-center mb-8">
      {/* Left side - Main control buttons */}
      <div className="flex flex-wrap gap-4">
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
      </div>

      {/* Right side - Return button */}
      <Link 
        href="/"
        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${colors.buttonGhost} ${colors.textLight} border ${colors.glassBorder} flex items-center gap-2 no-underline`}
      >
        <ArrowLeft className="w-5 h-5" />
        返回
      </Link>
    </div>
  );
};

export default ControlButtons;