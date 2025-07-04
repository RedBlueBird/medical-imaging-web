// src/components/oral/PatientInfoPanel.tsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useColors } from '@/config/colors';
import GlassCard from '@/components/ui/GlassCard';

interface PatientData {
  name: string;
  id: string;
  history: string;
  date: string;
  result: string;
}

interface PatientInfoPanelProps {
  currentPatient: number;
  patientData: PatientData;
  totalPatients: number;
  detectionComplete: boolean;
  onPrevPatient: () => void;
  onNextPatient: () => void;
}

const PatientInfoPanel: React.FC<PatientInfoPanelProps> = ({
  currentPatient,
  patientData,
  totalPatients,
  detectionComplete,
  onPrevPatient,
  onNextPatient
}) => {
  const colors = useColors();
  
  return (
    <div className="space-y-6">
      {/* Patient Navigation */}
      <div className="flex items-center justify-between">
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
      
      {/* Patient Info */}
      <GlassCard className="p-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className={colors.textSecondary}>患者:</span>
            <span className={colors.textPrimary}>{patientData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className={colors.textSecondary}>主病案号:</span>
            <span className={colors.textPrimary}>{patientData.id}</span>
          </div>
          <div className="flex justify-between">
            <span className={colors.textSecondary}>历史诊断:</span>
            <span className={colors.textPrimary}>{patientData.history}</span>
          </div>
          <div className="flex justify-between">
            <span className={colors.textSecondary}>时间:</span>
            <span className={colors.textPrimary}>{patientData.date}</span>
          </div>
        </div>
      </GlassCard>
      
      {/* Diagnosis Results */}
      {detectionComplete && (
        <GlassCard className="p-6">
          <h3 className={`text-lg font-semibold ${colors.textPrimary} mb-4`}>
            辅助诊断结果: {patientData.result}
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
      )}
      
      {/* Knowledge Section Preview */}
      {detectionComplete && (
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
      )}
    </div>
  );
};

export default PatientInfoPanel;