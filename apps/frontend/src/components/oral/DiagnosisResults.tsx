// src/components/oral/DiagnosisResults.tsx
'use client'
import React from 'react';
import { useColors } from '@/config/colors';
import GlassCard from '@/components/ui/GlassCard';

interface DiagnosisResultsProps {
  expandedResults: boolean;
  onToggleExpanded: () => void;
  results?: Record<string, number>;
  patientResult?: string;
}

const DiagnosisResults: React.FC<DiagnosisResultsProps> = ({ 
  expandedResults, 
  onToggleExpanded,
  results = { OLP: 0.184, OLK: 0.651, OOML: 0.121 }, // Default mock results
  patientResult = '口腔白斑病 待排'
}) => {
  const colors = useColors();
  
  return (
    <div className="space-y-4">
      {/* Detection Results Card */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-semibold ${colors.textPrimary}`}>
            辅助检查结果
          </h3>
          <button
            onClick={onToggleExpanded}
            className={`px-4 py-2 rounded-lg ${colors.buttonGhost} transition-colors`}
          >
            {expandedResults ? '收起' : '展开'}
          </button>
        </div>
        
        {expandedResults && (
          <div className="space-y-2">
            {Object.entries(results).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className={colors.textSecondary}>{key}:</span>
                <span className={colors.textPrimary}>{value.toFixed(3)}</span>
              </div>
            ))}
          </div>
        )}
      </GlassCard>
      
      {/* Diagnosis Result Summary */}
      <GlassCard className="p-6">
        <h3 className={`text-lg font-semibold ${colors.textPrimary} mb-4`}>
          辅助诊断结果: {patientResult}
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className={`font-medium ${colors.textPrimary} mb-2`}>诊断建议</h4>
            <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
              口腔白斑病不是癌症，但是有一定的癌变风险，建议前往专业口腔黏膜科室接受进一步诊断，提高警惕，严密观察，并必要时可进行多次组织活检。
            </p>
          </div>
        </div>
      </GlassCard>
      
      {/* Knowledge Section Preview */}
      <GlassCard className="p-6">
        <h3 className={`text-lg font-semibold ${colors.textPrimary} mb-4`}>
          为什么会生口腔白斑?
        </h3>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className={`font-medium ${colors.textPrimary} mb-2`}>1.吸烟等理化刺激</h4>
            <p className={`${colors.textSecondary} leading-relaxed`}>
              与白斑的发生密切相关，白斑的发生率与吸烟时间的长短及吸烟量呈正比关系...
            </p>
          </div>
          <div>
            <h4 className={`font-medium ${colors.textPrimary} mb-2`}>2、与局部刺激有关</h4>
            <p className={`${colors.textSecondary} leading-relaxed`}>
              饮酒、进食过烫或酸辣食物、嚼槟榔等均与白斑形成相关...
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default DiagnosisResults;