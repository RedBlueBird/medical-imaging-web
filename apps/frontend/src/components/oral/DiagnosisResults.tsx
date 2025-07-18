// src/components/oral/DiagnosisResults.tsx
'use client'
import React from 'react';
import { useColors } from '@/config/colors';
import GlassCard from '@/components/ui/GlassCard';
import { DetectionResults } from '@/types/oral';
import { Patient } from '@shared/types';

interface DiagnosisResultsProps {
  results?: DetectionResults;
  finding?: string;
  recommendation?: string;
  patientData: Patient;
}

const DiagnosisResults: React.FC<DiagnosisResultsProps> = ({ 
  results = { OLP: 0.000, OLK: 0.000, OOML: 0.000 },
  finding = '无诊断结果',
  recommendation = 'N/A',
  patientData
}) => {
  const colors = useColors();
  
  return (
    <div className="space-y-6">
      {/* Combined Patient Info and Detection Results Card */}
      <GlassCard className="p-4">
        <h3 className={`text-sm font-semibold ${colors.textPrimary} mb-3`}>
          患者信息
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
          <div className="flex justify-between">
            <span className={`${colors.textSecondary} text-sm`}>患者:</span>
            <span className={`${colors.textPrimary} text-sm`}>{patientData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className={`${colors.textSecondary} text-sm`}>主病案号:</span>
            <span className={`${colors.textPrimary} text-sm`}>{patientData.index}</span>
          </div>
          <div className="flex justify-between">
            <span className={`${colors.textSecondary} text-sm`}>历史诊断:</span>
            <span className={`${colors.textPrimary} text-sm`}>{patientData.history}</span>
          </div>
          <div className="flex justify-between">
            <span className={`${colors.textSecondary} text-sm`}>时间:</span>
            <span className={`${colors.textPrimary} text-sm`}>{patientData.date}</span>
          </div>
        </div>
        
        {/* Detection Results Section - Always show with default values */}
        <div className="border-t border-white/10 pt-3">
          <h3 className={`text-sm font-semibold ${colors.textPrimary} mb-3`}>
            辅助检查结果
          </h3>
          <div className="space-y-2">
            {Object.entries(results).map(([key, value]) => {
              // Calculate bar width (0 to 100%)
              const barWidth = Math.min(Math.max(value * 100, 0), 100);
              
              // Calculate color based on value (yellow to orange)
              const colorIntensity = Math.min(Math.max(value, 0), 1);
              const backgroundColor = `hsl(${45 - (colorIntensity * 25)}, 100%, ${60 - (colorIntensity * 10)}%)`;
              
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className={`${colors.textSecondary} text-sm`}>{key}:</span>
                    <span className={`${colors.textPrimary} text-sm font-medium`}>{value.toFixed(3)}</span>
                  </div>
                  <div className="w-full bg-gray-200/20 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${barWidth}%`,
                        backgroundColor: backgroundColor
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>
      
      {/* Diagnosis Result Summary - Only show if detection is complete */}
      {(
        <GlassCard className="p-6">
          <div className="flex justify-between items-center mb-4">
            <span className={`text-md font-semibold ${colors.textPrimary}`}>辅助诊断结果:</span>
            <span className={`${colors.textSecondary}`}>{finding}</span>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className={`font-medium ${colors.textPrimary} mb-2`}>诊断建议</h4>
              <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
                {recommendation}
              </p>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default DiagnosisResults;