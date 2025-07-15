// utils/fileValidation.ts
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp'
];

export const ALLOWED_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp'
];

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const validateFile = (file: File): FileValidationResult => {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `文件大小超过限制（最大${MAX_FILE_SIZE / 1024 / 1024}MB）`
    };
  }
  
  // Check file type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `不支持的文件类型。支持的格式：${ALLOWED_EXTENSIONS.join(', ')}`
    };
  }
  
  // Check file extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => 
    fileName.endsWith(ext)
  );
  
  if (!hasValidExtension) {
    return {
      isValid: false,
      error: `不支持的文件扩展名。支持的格式：${ALLOWED_EXTENSIONS.join(', ')}`
    };
  }
  
  return { isValid: true };
};

export const validatePatientFolderName = (folderName: string): FileValidationResult => {
  // Expected format: "患者姓名-主病案号-病名（历史诊断）-YYMMDD-Y有活检确认N无活检确认"
  const parts = folderName.split('-');
  
  if (parts.length !== 5) {
    return {
      isValid: false,
      error: '文件夹名称格式错误。正确格式：患者姓名-主病案号-病名-YYMMDD-Y/N'
    };
  }
  
  const [name, id, diagnosis, date, biopsy] = parts;
  
  // Validate patient name
  if (!name || name.trim().length === 0) {
    return {
      isValid: false,
      error: '患者姓名不能为空'
    };
  }
  
  // Validate patient ID
  if (!id || !/^\d{8}$/.test(id)) {
    return {
      isValid: false,
      error: '主病案号必须为8位数字'
    };
  }
  
  // Validate date format (YYMMDD)
  if (!date || !/^\d{6}$/.test(date)) {
    return {
      isValid: false,
      error: '日期格式错误，应为YYMMDD格式'
    };
  }
  
  // Validate biopsy confirmation
  if (!biopsy || !['Y', 'N'].includes(biopsy.toUpperCase())) {
    return {
      isValid: false,
      error: '活检确认字段必须为Y或N'
    };
  }
  
  return { isValid: true };
};

export const parsePatientFolderName = (folderName: string) => {
  const parts = folderName.split('-');
  if (parts.length !== 5) return null;
  
  const [name, id, diagnosis, date, biopsy] = parts;
  
  return {
    name: name.trim(),
    id: id.trim(),
    diagnosis: diagnosis.trim(),
    date: date.trim(),
    biopsyConfirmed: biopsy.toUpperCase() === 'Y'
  };
};