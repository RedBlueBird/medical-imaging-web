// src/components/oral/modals/KnowledgeModal.tsx
import React from 'react';
import { useColors } from '@/config/colors';
import Modal from '@/components/ui/Modal';

interface KnowledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KnowledgeModal: React.FC<KnowledgeModalProps> = ({ isOpen, onClose }) => {
  const colors = useColors();
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="医学知识宣讲"
      maxWidth="4xl"
    >
      <div className="p-6 space-y-6">
        <div>
          <h3 className={`text-xl font-semibold ${colors.textPrimary} mb-4`}>为什么会生口腔白斑?</h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className={`font-medium ${colors.textPrimary} mb-2`}>1.吸烟等理化刺激</h4>
              <p className={`${colors.textSecondary} leading-relaxed`}>
                与白斑的发生密切相关，白斑的发生率与吸烟时间的长短及吸烟量呈正比关系。发病部位与烟接触口腔的方式、烟雾刺激的部位有关。吸烟对口腔黏膜可以产生物理、化学刺激引起口腔黏膜的病理性变化。吸烟时产生的高温对口腔有灼伤作用，引起局部黏膜充血、水肿，同时烟和烟燃烧时产生的烟雾中含有尼古丁、焦油、二苯蔥等致癌物质。这些有害的物质可直接进入口腔黏膜上皮，破坏黏膜上皮，通过长期慢性刺激，使局部形成一种慢性炎症过程，机体产生一种防御性的增生反应。
              </p>
            </div>
            <div>
              <h4 className={`font-medium ${colors.textPrimary} mb-2`}>2、与局部刺激有关</h4>
              <p className={`${colors.textSecondary} leading-relaxed`}>
                饮酒、进食过烫或酸辣食物、嚼槟榔等均与白斑形成相关。食用刺激性食物如烫、辣、硬食会使上消化道黏膜组织发生不同程度的损伤，轻者导致黏膜充血、水肿、变性、渗出，形成炎症，重者可导致黏膜糜烂、溃疡等。长期反复的刺激会使黏膜发生慢性炎症，进而发生白斑样改变。
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default KnowledgeModal;