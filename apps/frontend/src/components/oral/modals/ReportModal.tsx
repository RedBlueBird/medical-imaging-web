import React from 'react';
import { Download, Printer, X } from 'lucide-react';
import { Patient } from '@shared/types';
import { useColors } from '@/config/colors';
import { useHandleReport } from '@/hooks/useHandleReport';
import { OralDiagnosisResponse } from '@/types/oral';
import GlassCard from '@/components/ui/GlassCard';

// Types
interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientData: Patient;
  finding?: string;
  recommendation?: string;
  diagnosisResponse?: OralDiagnosisResponse | null;
  onDownloadReport?: () => void; // Keep for backward compatibility
  onPrintReport?: () => void; // Keep for backward compatibility
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  patientData,
  finding = '无诊断结果',
  recommendation = 'N/A',
  diagnosisResponse = null,
  onDownloadReport: legacyDownloadReport,
  onPrintReport: legacyPrintReport
}) => {
  const colors = useColors();
  
  // Use the custom hook for report handling
  const { handleDownloadReport, handlePrintReport } = useHandleReport({
    patientData,
    diagnosisResponse,
    finding,
    recommendation
  });
  
  // Safety check for patientData
  const safePatientData = patientData;
  
  if (!isOpen) return null;
  
  // Use the hook handlers or fallback to legacy handlers
  const onDownload = handleDownloadReport || legacyDownloadReport || (() => {});
  const onPrint = handlePrintReport || legacyPrintReport || (() => {});
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="max-w-4xl max-h-[90vh] w-full mx-4 relative">
        <GlassCard className="w-full overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-white/20">
            <h2 className={`text-2xl font-bold ${colors.textPrimary}`}>
              报告查看与保存
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg ${colors.buttonGhost} transition-colors`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(90vh-100px)]">
            <div className="p-6 space-y-6">
              {/* Patient Information Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={colors.textSecondary}>患者姓名:</span>
                    <span className={colors.textPrimary}>{safePatientData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={colors.textSecondary}>历史诊断:</span>
                    <span className={colors.textPrimary}>{safePatientData.history}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={colors.textSecondary}>主病案号:</span>
                    <span className={colors.textPrimary}>{safePatientData.index}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={colors.textSecondary}>诊断时间:</span>
                    <span className={colors.textPrimary}>{safePatientData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={colors.textSecondary}>活检确认:</span>
                    <span className={colors.textPrimary}>{safePatientData.biopsyConfirmed ? '已活检' : '未活检'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={colors.textSecondary}>诊断医师:</span>
                    <span className={colors.textPrimary}>{safePatientData.doctor}</span>
                  </div>
                </div>
              </div>
              
              {/* Detection Results Section - Only show if diagnosis response exists */}
              {diagnosisResponse?.data?.results && (
                <div className="border-t border-white/20 pt-4">
                  <h4 className={`font-medium ${colors.textPrimary} mb-4`}>
                    检测结果概览
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className={`text-2xl font-bold ${colors.textPrimary} mb-1`}>
                        {(diagnosisResponse.data.results.OLP * 100).toFixed(1)}%
                      </div>
                      <div className={`text-sm ${colors.textSecondary}`}>
                        口腔扁平苔藓 (OLP)
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className={`text-2xl font-bold ${colors.textPrimary} mb-1`}>
                        {(diagnosisResponse.data.results.OLK * 100).toFixed(1)}%
                      </div>
                      <div className={`text-sm ${colors.textSecondary}`}>
                        口腔白斑 (OLK)
                      </div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-lg">
                      <div className={`text-2xl font-bold ${colors.textPrimary} mb-1`}>
                        {(diagnosisResponse.data.results.OOML * 100).toFixed(1)}%
                      </div>
                      <div className={`text-sm ${colors.textSecondary}`}>
                        口腔恶性病变 (OOML)
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Diagnosis Results Section */}
              <div className="border-t border-white/20 pt-4">
                <h4 className={`font-medium ${colors.textPrimary} mb-2`}>
                  辅助诊断结果
                </h4>
                <div className={`p-4 bg-white/5 rounded-lg ${colors.textSecondary}`}>
                  {finding}
                </div>
                
                <h4 className={`font-medium ${colors.textPrimary} mb-2 mt-4`}>
                  诊断建议
                </h4>
                <div className={`p-4 bg-white/5 rounded-lg ${colors.textSecondary} text-sm leading-relaxed`}>
                  {recommendation}
                </div>
              </div>
              
              {/* Confirmation and Action Buttons */}
              <div className="flex justify-end border-t border-white/20 pt-4">                
                <div className="flex gap-3">
                  <button
                    onClick={onDownload}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${colors.buttonPrimary} ${colors.textLight} flex items-center gap-2 hover:scale-105`}
                  >
                    <Download className="w-4 h-4" />
                    下载报告
                  </button>
                  
                  <button
                    onClick={onPrint}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${colors.buttonPrimary} ${colors.textLight} flex items-center gap-2 hover:scale-105`}
                  >
                    <Printer className="w-4 h-4" />
                    打印报告
                  </button>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default ReportModal;