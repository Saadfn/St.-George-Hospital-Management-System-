export enum Role {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
  STAFF = 'STAFF'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  branchId?: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  gender: 'Male' | 'Female' | 'Other';
  qualifications: string[];
  branchId: string;
  avatar?: string;
  availability: DoctorAvailability[];
  consultationFee: number;
}

export interface DoctorAvailability {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface Patient {
  id: string;
  globalPatientId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  bloodGroup?: string;
  allergies?: string[];
  insuranceProvider?: string;
  insuranceNumber?: string;
  registeredAt: string;
  branchId: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  endTime?: string;
  status: 'Pending' | 'Scheduled' | 'Completed' | 'Cancelled' | 'No-Show';
  type: string;
  notes?: string;
  branchId: string;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  address: string;
  capacity: number;
  contact: string;
  email: string;
  departments: string[];
}

export interface Stat {
  name: string;
  value: number;
  change?: string;
  trend?: 'up' | 'down';
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  diagnosis: string;
  prescription: string;
  doctor: string;
  doctorId: string;
  notes?: string;
  attachments?: string[];
  branchId: string;
}

export interface Ward {
  id: string;
  name: string;
  branchId: string;
  type: 'General' | 'ICU' | 'Emergency' | 'Maternity' | 'Pediatric' | 'Surgery';
  totalBeds: number;
  occupiedBeds: number;
}

export interface Bed {
  id: string;
  wardId: string;
  bedNumber: string;
  status: 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
  patientId?: string;
}

export interface Admission {
  id: string;
  patientId: string;
  patientName: string;
  bedId: string;
  wardId: string;
  wardName: string;
  bedNumber: string;
  admissionDate: string;
  dischargeDate?: string;
  status: 'Active' | 'Discharged' | 'Transferred';
  doctorId: string;
  doctorName: string;
  diagnosis: string;
  notes?: string;
  branchId: string;
}

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  category: string;
  manufacturer: string;
  unitPrice: number;
  stockQuantity: number;
  reorderLevel: number;
  expiryDate: string;
  branchId: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  items: PrescriptionItem[];
  status: 'Pending' | 'Dispensed' | 'Cancelled';
}

export interface PrescriptionItem {
  medicineId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
}

export interface LabTest {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  testType: string;
  requestDate: string;
  status: 'Requested' | 'Sample Collected' | 'Processing' | 'Completed';
  result?: string;
  resultDate?: string;
  notes?: string;
  priority: 'Normal' | 'Urgent';
  branchId: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  date: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
  paymentMethod?: 'Cash' | 'Card' | 'Insurance' | 'Bank Transfer';
  branchId: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  category: 'Consultation' | 'Procedure' | 'Medication' | 'Laboratory' | 'Room' | 'Other';
}

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  module: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export type ViewType =
  | 'dashboard'
  | 'appointments'
  | 'patients'
  | 'doctors'
  | 'wards'
  | 'pharmacy'
  | 'laboratory'
  | 'billing'
  | 'reports'
  | 'settings'
  | 'book-appointment'
  | 'medical-records';
