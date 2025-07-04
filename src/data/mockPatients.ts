// data/mockPatients.ts
import { Patient } from '../types/patient.types';

export const mockPatients: Patient[] = [
  {
    name: '买买提',
    id: '88888888',
    history: '无',
    date: '2025年6月20日',
    result: '口腔白斑病 待排',
    biopsyConfirmed: false,
    doctor: '张三'
  },
  {
    name: '张三',
    id: '88888889',
    history: '口腔扁平苔藓',
    date: '2025年6月21日',
    result: '口腔白斑病 待排',
    biopsyConfirmed: false,
    doctor: '李四'
  },
  {
    name: '李四',
    id: '88888890',
    history: '口腔溃疡',
    date: '2025年6月22日',
    result: '口腔白斑病 待排',
    biopsyConfirmed: true,
    doctor: '王五'
  }
];

export const getPatientById = (id: string): Patient | undefined => {
  return mockPatients.find(patient => patient.id === id);
};

export const getPatientsByDoctor = (doctorName: string): Patient[] => {
  return mockPatients.filter(patient => patient.doctor === doctorName);
};

export const getTotalPatients = (): number => {
  return mockPatients.length;
};