// data/mockResults.ts
import { DetectionResults, DiagnosisRecommendation } from '../types/oral';

export const mockResults: DetectionResults = {
  OLP: 0.184,
  OLK: 0.651,
  OOML: 0.121
};

export const diagnosisRecommendations: DiagnosisRecommendation = {
  title: '诊断建议',
  description: '口腔白斑病不是癌症，但是有一定的癌变风险，建议前往专业口腔黏膜科室接受进一步诊断，提高警惕，严密观察，并必要时可进行多次组织活检。',
  suggestions: [
    '去除任何可能的刺激因素，去除残根、残冠及不良修复体',
    '纠正不良生活习惯，例如戒烟戒酒',
    '不吃刺激食品和过烫、粗糙食物等',
    '定期随访是非常重要的',
    '如果观察到白斑增厚、变硬、出现溃疡等的时候，应及时手术切除'
  ]
};

export const generateRandomResults = (): DetectionResults => {
  const total = 1.0;
  const olp = Math.random() * 0.4; // 0-0.4
  const olk = Math.random() * 0.8; // 0-0.8
  const remaining = total - olp - olk;
  const ooml = Math.max(0, Math.min(remaining, Math.random() * 0.3)); // 0-0.3
  
  return {
    OLP: Number(olp.toFixed(3)),
    OLK: Number(olk.toFixed(3)),
    OOML: Number(ooml.toFixed(3))
  };
};

export const getResultsInterpretation = (results: DetectionResults): string => {
  const highest = Math.max(results.OLP, results.OLK, results.OOML);
  
  if (highest === results.OLK) {
    return '口腔白斑病 待排';
  } else if (highest === results.OLP) {
    return '口腔扁平苔藓 待排';
  } else {
    return '其他口腔黏膜疾病 待排';
  }
};