import React from 'react';
import { Download, Printer, X } from 'lucide-react';
import {Patient} from '@/types/patient';
import { useColors } from '@/config/colors';
import GlassCard from '@/components/ui/GlassCard';

// Types
interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientData: Patient;
  reportConfirmed: boolean;
  onReportConfirmedChange: (confirmed: boolean) => void;
  onDownloadReport: () => void;
  onPrintReport: () => void;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  patientData,
  reportConfirmed,
  onReportConfirmedChange,
  onDownloadReport,
  onPrintReport
}) => {
  const colors = useColors();
  
  // Safety check for patientData
  const safePatientData = patientData
  
  if (!isOpen) return null;
  
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
                    <span className={colors.textPrimary}>{safePatientData.id}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={colors.textSecondary}>诊断时间:</span>
                    <span className={colors.textPrimary}>{safePatientData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={colors.textSecondary}>活检确认:</span>
                    <span className={colors.textPrimary}>未活检</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={colors.textSecondary}>诊断医师:</span>
                    <span className={colors.textPrimary}>张三</span>
                  </div>
                </div>
              </div>
              
              {/* Diagnosis Results Section */}
              <div className="border-t border-white/20 pt-4">
                <h4 className={`font-medium ${colors.textPrimary} mb-2`}>
                  辅助诊断结果
                </h4>
                <p className={`${colors.textPrimary} mb-4`}>
                  {safePatientData.result}
                </p>
                
                <h4 className={`font-medium ${colors.textPrimary} mb-2`}>
                  辅助诊断结论
                </h4>
                <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
                  经AI辅助系统诊断，该患者可能患有口腔白斑病。口腔白斑病不是癌症，但是有一定的癌变风险，建议前往专业口腔黏膜科室接受进一步诊断，提高警惕，严密观察，并必要时可进行多次组织活检。
                </p>
                <p className={`${colors.textSecondary} text-sm leading-relaxed mt-4`}>
                  口腔白斑病治疗第一步是去除任何可能的刺激因素，去除残根、残冠及不良修复体，纠正不良生活习惯。例如戒烟戒酒，不吃刺激食品和过烫、粗糙食物等，然后根据不同的病情决定用药还是采用其他治疗方案。定期随访是非常重要的，如果观察到白斑增厚、变硬、出现溃疡等的时候，应及时手术切除。
                </p>
              </div>
              
              {/* Confirmation and Action Buttons */}
              <div className="flex items-center justify-between border-t border-white/20 pt-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="confirm"
                    checked={reportConfirmed}
                    onChange={(e) => onReportConfirmedChange(e.target.checked)}
                    className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-500 focus:ring-blue-500"
                  />
                  <label htmlFor="confirm" className={`text-sm ${colors.textSecondary}`}>
                    确认医嘱
                  </label>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={onDownloadReport}
                    disabled={!reportConfirmed}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      reportConfirmed 
                        ? colors.buttonPrimary 
                        : 'bg-gray-500/50 cursor-not-allowed'
                    } ${colors.textLight} flex items-center gap-2`}
                  >
                    <Download className="w-4 h-4" />
                    下载
                  </button>
                  
                  <button
                    onClick={onPrintReport}
                    disabled={!reportConfirmed}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      reportConfirmed 
                        ? colors.buttonPrimary 
                        : 'bg-gray-500/50 cursor-not-allowed'
                    } ${colors.textLight} flex items-center gap-2`}
                  >
                    <Printer className="w-4 h-4" />
                    打印
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