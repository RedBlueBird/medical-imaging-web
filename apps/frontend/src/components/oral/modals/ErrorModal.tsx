// src/components/oral/modals/ErrorModal.tsx
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useColors } from '@/config/colors';
import Modal from '@/components/ui/Modal';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose }) => {
  const colors = useColors();
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="错误提示"
      maxWidth="lg"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-red-400" />
          <span className={`${colors.textPrimary} font-medium`}>在检测过程中出现了错误！</span>
        </div>
        <div className={`${colors.textSecondary} space-y-2 mb-6`}>
          <p>请检查：</p>
          <p>（1）待检的每个文件应为图片格式（以.jpg.jpeg.png结尾）</p>
          <p>（2）每个病人的子文件夹格式应为：</p>
          <p className="ml-4">"患者姓名-主病案号-病名（历史诊断）-YYMMDD-Y有活检确认N无活检确认"</p>
          <p>如：张三-88888888-口腔扁平苔藓-250101-N</p>
          <p className="mt-4">如未能解决问题，请联系技术人员提供支持。</p>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`px-6 py-3 rounded-xl font-medium ${colors.buttonPrimary} ${colors.textLight} transition-colors`}
          >
            返回
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;