import mongoose, { Schema } from 'mongoose';
import { Patient } from '@shared/types';

const patientSchema = new Schema<Patient>({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 0, max: 150 },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  email: { type: String, trim: true, lowercase: true },
  phone: { type: String, trim: true },
  medicalHistory: [{ type: String }]
}, {
  timestamps: true
});

export const PatientModel = mongoose.model<Patient>('Patient', patientSchema);