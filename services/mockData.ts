import { Role, User, Appointment, Branch, MedicalRecord } from '../types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Dr. Sarah Smith', email: 'sarah@stgeorge.com', role: Role.DOCTOR, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: '2', name: 'John Doe', email: 'john@gmail.com', role: Role.PATIENT, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: '3', name: 'Admin User', email: 'admin@stgeorge.com', role: Role.ADMIN, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' },
];

export const MOCK_BRANCHES: Branch[] = [
  { id: '1', name: 'St. George Sydney CBD', location: 'Sydney, NSW', capacity: 450, contact: '+61 2 9999 1111' },
  { id: '2', name: 'St. George Melbourne', location: 'Melbourne, VIC', capacity: 320, contact: '+61 3 8888 2222' },
  { id: '3', name: 'St. George Brisbane', location: 'Brisbane, QLD', capacity: 200, contact: '+61 7 7777 3333' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: '101', patientName: 'John Doe', doctorName: 'Dr. Sarah Smith', date: '2023-10-25', time: '09:00 AM', status: 'Scheduled', type: 'General Checkup' },
  { id: '102', patientName: 'Alice Johnson', doctorName: 'Dr. Sarah Smith', date: '2023-10-25', time: '10:30 AM', status: 'Scheduled', type: 'Cardiology' },
  { id: '103', patientName: 'Bob Brown', doctorName: 'Dr. James Wilson', date: '2023-10-24', time: '02:00 PM', status: 'Completed', type: 'Orthopedics' },
];

export const MOCK_RECORDS: MedicalRecord[] = [
  { id: 'r1', date: '2023-09-10', diagnosis: 'Mild Hypertension', prescription: 'Lisinopril 10mg', doctor: 'Dr. Sarah Smith' },
  { id: 'r2', date: '2023-05-15', diagnosis: 'Seasonal Allergies', prescription: 'Cetirizine 10mg', doctor: 'Dr. James Wilson' },
];