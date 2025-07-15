// src/components/oral/BottomControls.tsx
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useColors } from '@/config/colors';

interface BottomControlsProps {
  selectedImage: string | null;
  isDetecting: boolean;
  onStartDetection: () => void;
  onGoBack?: () => void; // Made optional since we're using Link now
}

const BottomControls: React.FC<BottomControlsProps> = ({
  selectedImage,
  isDetecting,
  onStartDetection,
  onGoBack
}) => {
  const colors = useColors();
  
  return (
    <div className="flex justify-between items-center mt-8">
      <Link 
        href="/"
        className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${colors.buttonGhost} ${colors.textLight} border ${colors.glassBorder} flex items-center gap-2 no-underline`}
      >
        <ArrowLeft className="w-5 h-5" />
        返回
      </Link>
      
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
  );
};

export default BottomControls;