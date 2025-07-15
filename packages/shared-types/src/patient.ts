// packages/shared-types/src/patient.ts
export interface Patient {
  id?: string; // Optional for creation, required after saving
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  email?: string;
  phone?: string;
  medicalHistory?: string[];
  createdAt?: Date; // Added by timestamps: true
  updatedAt?: Date; // Added by timestamps: true
}

export interface CreatePatientRequest {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  email?: string;
  phone?: string;
  medicalHistory?: string[];
}

export interface UpdatePatientRequest extends Partial<CreatePatientRequest> {
  id: string;
}