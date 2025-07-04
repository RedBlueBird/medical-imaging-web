// types/patient.types.ts
export interface Patient {
  name: string;
  id: string;
  history: string;
  date: string;
  result: string;
  biopsyConfirmed?: boolean;
  doctor?: string;
}

export interface PatientNavigationState {
  currentPatient: number;
  totalPatients: number;
}

export interface PatientFormData {
  name: string;
  id: string;
  history: string;
  date: string;
  biopsyConfirmed: boolean;
  notes?: string;
}