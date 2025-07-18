// apps/backend/src/services/patient.service.ts
import { Patient, CreatePatientRequest, UpdatePatientRequest } from '@shared/types';
import { PatientModel } from '../models/Patient';
import { createError } from '../middleware/error.middleware';

export class PatientService {
  async getAllPatients(): Promise<Patient[]> {
    const patients = await PatientModel.find().sort({ createdAt: -1 });
    return patients.map(patient => patient.toObject());
  }

  async getPatientById(id: string): Promise<Patient> {
    const patient = await PatientModel.findOne({ id });
    if (!patient) {
      throw createError('Patient not found', 404);
    }
    return patient.toObject();
  }

  async createPatient(patientData: CreatePatientRequest): Promise<Patient> {
    const patient = new PatientModel(patientData);
    const savedPatient = await patient.save();
    return savedPatient.toObject();
  }

  async updatePatient(updateData: UpdatePatientRequest): Promise<Patient> {
    const { id, ...data } = updateData;
    const patient = await PatientModel.findByIdAndUpdate(id, data, { new: true });
    if (!patient) {
      throw createError('Patient not found', 404);
    }
    return patient.toObject();
  }

  async deletePatient(id: string): Promise<void> {
    const patient = await PatientModel.findByIdAndDelete(id);
    if (!patient) {
      throw createError('Patient not found', 404);
    }
  }
}