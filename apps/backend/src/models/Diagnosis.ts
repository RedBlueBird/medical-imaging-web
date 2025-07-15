import mongoose, { Schema } from 'mongoose';
import { DiagnosisResult } from '@shared/types';

const diagnosisSchema = new Schema<DiagnosisResult>({
  patientId: { type: String, required: true },
  type: { type: String, required: true, enum: ['gastritis', 'oral'] },
  imageUrl: { type: String, required: true },
  results: {
    confidence: { type: Number, required: true, min: 0, max: 1 },
    findings: [{ type: String, required: true }],
    recommendation: { type: String, required: true },
    severity: { type: String, enum: ['low', 'medium', 'high'] }
  }
}, {
  timestamps: true
});

export const DiagnosisModel = mongoose.model<DiagnosisResult>('Diagnosis', diagnosisSchema);