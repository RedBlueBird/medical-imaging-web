// /utils/reportGeneration.ts

export interface PatientData {
  name: string;
  id: string;
  history: string;
  date: string;
  result: string;
  doctor?: string;
  biopsyConfirmed?: boolean;
}

export interface DiagnosisResults {
  OLP: number;
  OLK: number;
  OOML: number;
}

export interface ReportData {
  patient: PatientData;
  results: DiagnosisResults;
  diagnosisDate: string;
  diagnosisDoctor: string;
  conclusion: string;
  recommendations: string;
  treatment: string;
}

/**
 * Generate a comprehensive medical report
 */
export const generateReport = (
  patientData: PatientData,
  results: DiagnosisResults,
  diagnosisDoctor: string = '张三'
): ReportData => {
  const conclusion = `经AI辅助系统诊断，该患者可能患有口腔白斑病。口腔白斑病不是癌症，但是有一定的癌变风险，建议前往专业口腔黏膜科室接受进一步诊断，提高警惕，严密观察，并必要时可进行多次组织活检。`;

  const recommendations = `口腔白斑病不是癌症，但是有一定的癌变风险，建议前往专业口腔黏膜科室接受进一步诊断，提高警惕，严密观察，并必要时可进行多次组织活检。`;

  const treatment = `口腔白斑病治疗第一步是去除任何可能的刺激因素，去除残根、残冠及不良修复体，纠正不良生活习惯。例如戒烟戒酒，不吃刺激食品和过烫、粗糙食物等，然后根据不同的病情决定用药还是采用其他治疗方案。定期随访是非常重要的，如果观察到白斑增厚、变硬、出现溃疡等的时候，应及时手术切除。`;

  return {
    patient: patientData,
    results,
    diagnosisDate: new Date().toLocaleDateString('zh-CN'),
    diagnosisDoctor,
    conclusion,
    recommendations,
    treatment
  };
};

/**
 * Download report as PDF (mock implementation)
 */
export const downloadReportAsPDF = (reportData: ReportData): void => {
  // Mock PDF generation - in real implementation, you would use a library like jsPDF
  const link = document.createElement('a');
  link.download = `oral_diagnosis_report_${reportData.patient.id}.pdf`;
  link.href = '#'; // In real implementation, this would be a blob URL
  link.click();
  
  // For demonstration, we'll create a text file instead
  const reportText = formatReportAsText(reportData);
  const blob = new Blob([reportText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const actualLink = document.createElement('a');
  actualLink.download = `oral_diagnosis_report_${reportData.patient.id}.txt`;
  actualLink.href = url;
  actualLink.click();
  
  URL.revokeObjectURL(url);
};

/**
 * Print report
 */
export const printReport = (): void => {
  window.print();
};

/**
 * Format report data as text
 */
const formatReportAsText = (reportData: ReportData): string => {
  return `
口腔黏膜潜在恶性疾病诊断报告
=====================================

患者信息:
- 患者姓名: ${reportData.patient.name}
- 主病案号: ${reportData.patient.id}
- 历史诊断: ${reportData.patient.history}
- 诊断时间: ${reportData.diagnosisDate}
- 诊断医师: ${reportData.diagnosisDoctor}
- 活检确认: ${reportData.patient.biopsyConfirmed ? '已活检' : '未活检'}

检测结果:
- OLP: ${reportData.results.OLP.toFixed(3)}
- OLK: ${reportData.results.OLK.toFixed(3)}
- OOML: ${reportData.results.OOML.toFixed(3)}

辅助诊断结果: ${reportData.patient.result}

辅助诊断结论:
${reportData.conclusion}

治疗建议:
${reportData.treatment}

报告生成时间: ${new Date().toLocaleString('zh-CN')}
`;
};

/**
 * Validate report data before generation
 */
export const validateReportData = (patientData: PatientData, results: DiagnosisResults): boolean => {
  if (!patientData.name || !patientData.id || !patientData.result) {
    return false;
  }
  
  if (!results.OLP && !results.OLK && !results.OOML) {
    return false;
  }
  
  return true;
};