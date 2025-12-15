export enum Role {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  type: string;
  notes?: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  capacity: number;
  contact: string;
}

export interface Stat {
  name: string;
  value: number;
  change?: string;
  trend?: 'up' | 'down';
}

export interface MedicalRecord {
  id: string;
  date: string;
  diagnosis: string;
  prescription: string;
  doctor: string;
}