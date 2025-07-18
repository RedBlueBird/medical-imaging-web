// hooks/useHandleReport.tsx
import { useCallback } from 'react';
import { Patient } from '@shared/types';
import { OralDiagnosisResponse } from '@/types/oral';

interface UseHandleReportProps {
  patientData: Patient;
  diagnosisResponse: OralDiagnosisResponse | null;
  finding?: string;
  recommendation?: string;
}

interface UseHandleReportReturn {
  handleDownloadReport: () => void;
  handlePrintReport: () => void;
}

export const useHandleReport = ({
  patientData,
  diagnosisResponse,
  finding = '无诊断结果',
  recommendation = 'N/A'
}: UseHandleReportProps): UseHandleReportReturn => {

  // Generate report content as HTML
  const generateReportHTML = useCallback(() => {
    const currentDate = new Date().toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    const reportHTML = `
      <!DOCTYPE html>
      <html lang="zh-CN">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>口腔黏膜潜在恶性疾病诊断报告</title>
        <style>
          body {
            font-family: 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
          }
          .header {
            text-align: center;
            border-bottom: 2px solid #4f46e5;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #4f46e5;
            font-size: 24px;
            margin: 0;
            font-weight: bold;
          }
          .header p {
            color: #666;
            margin: 10px 0 0 0;
            font-size: 14px;
          }
          .section {
            margin-bottom: 25px;
            padding: 20px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background-color: #f9fafb;
          }
          .section h2 {
            color: #374151;
            font-size: 18px;
            margin: 0 0 15px 0;
            border-bottom: 1px solid #d1d5db;
            padding-bottom: 8px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 15px;
          }
          .info-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .info-item:last-child {
            border-bottom: none;
          }
          .info-label {
            font-weight: 600;
            color: #374151;
            min-width: 100px;
          }
          .info-value {
            color: #6b7280;
            text-align: right;
            flex: 1;
            word-wrap: break-word;
          }
          .diagnosis-content {
            background-color: #fff;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #4f46e5;
            margin-top: 10px;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            color: #6b7280;
            font-size: 12px;
          }
          .results-section {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-top: 15px;
          }
          .result-item {
            background-color: #fff;
            padding: 15px;
            border-radius: 6px;
            border: 1px solid #e5e7eb;
            text-align: center;
          }
          .result-label {
            font-weight: 600;
            color: #374151;
            margin-bottom: 8px;
            font-size: 14px;
          }
          .result-value {
            font-size: 18px;
            font-weight: bold;
            color: #4f46e5;
          }
          .no-results {
            text-align: center;
            color: #6b7280;
            font-style: italic;
            padding: 20px;
          }
          @media print {
            body {
              padding: 0;
              background-color: #fff;
            }
            .section {
              break-inside: avoid;
            }
            @page {
              margin: 1in;
            }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>口腔黏膜潜在恶性疾病诊断报告</h1>
          <p>生成时间：${currentDate}</p>
        </div>

        <div class="section">
          <h2>患者信息</h2>
          <div class="info-grid">
            <div>
              <div class="info-item">
                <span class="info-label">患者姓名：</span>
                <span class="info-value">${patientData?.name || 'N/A'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">历史诊断：</span>
                <span class="info-value">${patientData?.history || 'N/A'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">主病案号：</span>
                <span class="info-value">${patientData?.index || 'N/A'}</span>
              </div>
            </div>
            <div>
              <div class="info-item">
                <span class="info-label">诊断时间：</span>
                <span class="info-value">${patientData?.date || 'N/A'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">活检确认：</span>
                <span class="info-value">${patientData?.biopsyConfirmed ? '已活检' : '未活检'}</span>
              </div>
              <div class="info-item">
                <span class="info-label">诊断医师：</span>
                <span class="info-value">${patientData?.doctor || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        ${diagnosisResponse?.data?.results ? `
        <div class="section">
          <h2>检测结果</h2>
          <div class="results-section">
            <div class="result-item">
              <div class="result-label">口腔扁平苔藓<br>(OLP)</div>
              <div class="result-value">${(diagnosisResponse.data.results.OLP * 100).toFixed(1)}%</div>
            </div>
            <div class="result-item">
              <div class="result-label">口腔白斑<br>(OLK)</div>
              <div class="result-value">${(diagnosisResponse.data.results.OLK * 100).toFixed(1)}%</div>
            </div>
            <div class="result-item">
              <div class="result-label">口腔恶性病变<br>(OOML)</div>
              <div class="result-value">${(diagnosisResponse.data.results.OOML * 100).toFixed(1)}%</div>
            </div>
          </div>
        </div>
        ` : `
        <div class="section">
          <h2>检测结果</h2>
          <div class="no-results">暂无检测结果</div>
        </div>
        `}

        <div class="section">
          <h2>辅助诊断结果</h2>
          <div class="diagnosis-content">
            ${finding || '无诊断结果'}
          </div>
        </div>

        <div class="section">
          <h2>诊断建议</h2>
          <div class="diagnosis-content">
            ${recommendation || '无诊断建议'}
          </div>
        </div>

        <div class="footer">
          <p>本报告由口腔黏膜潜在恶性疾病自动化诊断平台生成</p>
          <p>仅供临床参考，不可替代专业医师诊断</p>
          <p>报告生成时间：${currentDate}</p>
        </div>
      </body>
      </html>
    `;

    return reportHTML;
  }, [patientData, diagnosisResponse, finding, recommendation]);

  // Handle download report
  const handleDownloadReport = useCallback(() => {
    try {
      const reportHTML = generateReportHTML();
      const blob = new Blob([reportHTML], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      
      // Generate filename with patient name and date
      const patientName = patientData?.name || '未知患者';
      const dateStr = new Date().toISOString().split('T')[0];
      link.download = `口腔诊断报告_${patientName}_${dateStr}.html`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
      console.log('报告下载成功');
    } catch (error) {
      console.error('下载报告失败:', error);
      alert('报告下载失败，请重试');
    }
  }, [generateReportHTML, patientData?.name]);

  // Handle print report
  const handlePrintReport = useCallback(() => {
    try {
      const reportHTML = generateReportHTML();
      
      // Create a new window for printing
      const printWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
      
      if (printWindow) {
        printWindow.document.write(reportHTML);
        printWindow.document.close();
        
        // Wait for the content to load then print
        printWindow.onload = () => {
          // Small delay to ensure content is fully rendered
          setTimeout(() => {
            printWindow.print();
          }, 500);
          
          // Close the window after printing (optional)
          printWindow.onafterprint = () => {
            printWindow.close();
          };
        };
      } else {
        // Fallback: create a hidden iframe for printing
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0px';
        iframe.style.height = '0px';
        iframe.style.left = '-500px';
        iframe.style.top = '-500px';
        document.body.appendChild(iframe);
        
        const doc = iframe.contentWindow?.document;
        if (doc) {
          doc.write(reportHTML);
          doc.close();
          
          iframe.onload = () => {
            setTimeout(() => {
              iframe.contentWindow?.print();
              
              // Clean up after a delay
              setTimeout(() => {
                if (document.body.contains(iframe)) {
                  document.body.removeChild(iframe);
                }
              }, 1000);
            }, 500);
          };
        }
      }
      
      console.log('报告打印请求已发送');
    } catch (error) {
      console.error('打印报告失败:', error);
      alert('报告打印失败，请重试');
    }
  }, [generateReportHTML]);

  return {
    handleDownloadReport,
    handlePrintReport
  };
};