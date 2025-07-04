// data/medicalKnowledge.ts
import { KnowledgeSection } from '../types/oral';

export const oralKnowledgeData: KnowledgeSection[] = [
  {
    id: 'oral-leukoplakia-causes',
    title: '为什么会生口腔白斑?',
    content: '口腔白斑病是一种常见的口腔黏膜疾病，其发生与多种因素相关：',
    subsections: [
      {
        title: '1. 吸烟等理化刺激',
        content: '与白斑的发生密切相关，白斑的发生率与吸烟时间的长短及吸烟量呈正比关系。发病部位与烟接触口腔的方式、烟雾刺激的部位有关。吸烟时产生的高温对口腔有灼伤作用，引起局部黏膜充血、水肿，同时烟和烟燃烧时产生的烟雾中含有尼古丁、焦油、二苯蔥等致癌物质。这些有害的物质可直接进入口腔黏膜上皮，破坏黏膜上皮，通过长期慢性刺激，使局部形成一种慢性炎症过程，机体产生一种防御性的增生反应。'
      },
      {
        title: '2. 与局部刺激有关',
        content: '饮酒、进食过烫或酸辣食物、嚼槟榔等均与白斑形成相关。食用刺激性食物如烫、辣、硬食会使上消化道黏膜组织发生不同程度的损伤，轻者导致黏膜充血、水肿、变性、渗出，形成炎症，重者可导致黏膜糜烂、溃疡等。长期反复的刺激会使黏膜发生慢性炎症，进而发生白斑样改变。'
      },
      {
        title: '3. 遗传因素',
        content: '家族史与口腔白斑病的发生存在一定关系，某些基因变异可能增加患病风险。'
      },
      {
        title: '4. 免疫因素',
        content: '机体免疫功能异常可能导致口腔黏膜的正常防御机制受损，从而诱发白斑病变。'
      }
    ]
  },
  {
    id: 'oral-leukoplakia-treatment',
    title: '口腔白斑病的治疗方法',
    content: '口腔白斑病的治疗应采取综合性方法：',
    subsections: [
      {
        title: '1. 去除刺激因素',
        content: '这是治疗的第一步，包括戒烟戒酒、去除残根残冠、更换不良修复体、避免进食刺激性食物等。'
      },
      {
        title: '2. 药物治疗',
        content: '根据病变的性质和程度，可选用维生素A、维生素E、免疫调节剂等药物治疗。'
      },
      {
        title: '3. 手术治疗',
        content: '对于有恶变倾向的白斑，应及时进行手术切除。手术方式包括传统切除、激光切除、冷冻治疗等。'
      },
      {
        title: '4. 定期随访',
        content: '所有口腔白斑病患者都应定期随访，观察病变的变化情况，及时发现恶变征象。'
      }
    ]
  },
  {
    id: 'oral-leukoplakia-prevention',
    title: '口腔白斑病的预防',
    content: '预防口腔白斑病的关键在于避免危险因素：',
    subsections: [
      {
        title: '1. 戒烟戒酒',
        content: '吸烟和饮酒是口腔白斑病的主要危险因素，戒烟戒酒是预防的重要措施。'
      },
      {
        title: '2. 注意口腔卫生',
        content: '保持良好的口腔卫生习惯，及时治疗口腔疾病，去除残根残冠。'
      },
      {
        title: '3. 合理饮食',
        content: '避免进食过烫、过辣、过硬的食物，多食新鲜蔬菜水果，补充维生素。'
      },
      {
        title: '4. 定期检查',
        content: '定期进行口腔检查，及时发现和处理口腔问题。'
      }
    ]
  }
];

export const getKnowledgeById = (id: string): KnowledgeSection | undefined => {
  return oralKnowledgeData.find(section => section.id === id);
};

export const getAllKnowledgeSections = (): KnowledgeSection[] => {
  return oralKnowledgeData;
};