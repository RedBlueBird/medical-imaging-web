export const API_ENDPOINTS = {
  PATIENTS: '/api/patients',
  DIAGNOSIS: '/api/diagnosis',
  REPORTS: '/api/reports',
  UPLOAD: '/api/upload',
  AUTH: '/api/auth'
} as const;

export const DIAGNOSIS_TYPES = {
  GASTRITIS: 'gastritis',
  ORAL: 'oral'
} as const;

export const SEVERITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const;

export const FILE_LIMITS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp']
} as const;
