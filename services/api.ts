import { User, Appointment, Branch, MedicalRecord, Role } from '../types';
import { MOCK_USERS, MOCK_APPOINTMENTS, MOCK_BRANCHES, MOCK_RECORDS } from './mockData';

// Simulating network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  auth: {
    login: async (role: Role): Promise<User> => {
      await delay(500);
      const user = MOCK_USERS.find(u => u.role === role);
      if (!user) throw new Error('User not found');
      return user;
    }
  },
  appointments: {
    list: async (): Promise<Appointment[]> => {
      await delay(400);
      return MOCK_APPOINTMENTS;
    },
    getByDoctor: async (doctorName: string): Promise<Appointment[]> => {
      await delay(300);
      return MOCK_APPOINTMENTS.filter(a => a.doctorName === doctorName);
    },
    getByPatient: async (patientName: string): Promise<Appointment[]> => {
      await delay(300);
      return MOCK_APPOINTMENTS.filter(a => a.patientName === patientName);
    }
  },
  records: {
    list: async (): Promise<MedicalRecord[]> => {
      await delay(300);
      return MOCK_RECORDS;
    }
  },
  branches: {
    list: async (): Promise<Branch[]> => {
      await delay(300);
      return MOCK_BRANCHES;
    }
  }
};