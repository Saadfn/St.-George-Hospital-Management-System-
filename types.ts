// ==================== ENUMS ====================

export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  STAFF = 'STAFF',
  PATIENT = 'PATIENT'
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

export enum AdmissionStatus {
  ADMITTED = 'ADMITTED',
  DISCHARGED = 'DISCHARGED',
  TRANSFERRED = 'TRANSFERRED'
}

export enum LabTestStatus {
  ORDERED = 'ORDERED',
  SAMPLE_COLLECTED = 'SAMPLE_COLLECTED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum PrescriptionStatus {
  PENDING = 'PENDING',
  PARTIALLY_DISPENSED = 'PARTIALLY_DISPENSED',
  DISPENSED = 'DISPENSED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PARTIAL = 'PARTIAL',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

export enum RoomType {
  GENERAL = 'GENERAL',
  SEMI_PRIVATE = 'SEMI_PRIVATE',
  PRIVATE = 'PRIVATE',
  ICU = 'ICU',
  EMERGENCY = 'EMERGENCY',
  OPERATION = 'OPERATION',
  MATERNITY = 'MATERNITY',
  PEDIATRIC = 'PEDIATRIC'
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  INSURANCE = 'INSURANCE',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

// ==================== CORE ENTITIES ====================

export interface User {
  id: string;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  avatar?: string;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  isActive: boolean;
  createdAt: string;
}

// ==================== PROFILE ENTITIES ====================

export interface DoctorProfile {
  id: string;
  userId: string;
  user?: User;
  branchId: string;
  branch?: Branch;
  specialization: string;
  licenseNumber: string;
  consultationFee: number;
  availableDays: string[];
  startTime: string;
  endTime: string;
  slotDuration: number;
}

export interface StaffProfile {
  id: string;
  userId: string;
  user?: User;
  branchId: string;
  branch?: Branch;
  department: string;
  employeeId: string;
  joinDate: string;
}

export interface PatientProfile {
  id: string;
  userId: string;
  user?: User;
  patientId: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  bloodGroup: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  allergies: string[];
  medicalHistory: string;
}

// ==================== APPOINTMENT & MEDICAL ====================

export interface Appointment {
  id: string;
  appointmentNo: string;
  patientId: string;
  patient?: PatientProfile;
  doctorId: string;
  doctor?: DoctorProfile;
  branchId: string;
  branch?: Branch;
  dateTime: string;
  duration: number;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  createdAt: string;
}

export interface MedicalRecord {
  id: string;
  recordNo: string;
  patientId: string;
  patient?: PatientProfile;
  doctorId: string;
  doctor?: DoctorProfile;
  appointmentId?: string;
  appointment?: Appointment;
  branchId: string;
  branch?: Branch;
  chiefComplaint: string;
  symptoms: string;
  diagnosis: string;
  treatmentPlan: string;
  notes?: string;
  vitals?: Vitals;
  createdAt: string;
}

export interface Vitals {
  id: string;
  medicalRecordId: string;
  temperature: number;
  bloodPressureSys: number;
  bloodPressureDia: number;
  pulseRate: number;
  respiratoryRate: number;
  weight: number;
  height: number;
  bmi: number;
  recordedAt: string;
}

// ==================== PRESCRIPTION ====================

export interface Prescription {
  id: string;
  prescriptionNo: string;
  medicalRecordId: string;
  patientId: string;
  patient?: PatientProfile;
  doctorId: string;
  doctor?: DoctorProfile;
  branchId: string;
  status: PrescriptionStatus;
  notes?: string;
  items?: PrescriptionItem[];
  createdAt: string;
}

export interface PrescriptionItem {
  id: string;
  prescriptionId: string;
  medicineId: string;
  medicine?: Medicine;
  dosage: string;
  frequency: string;
  duration: string;
  quantity: number;
  instructions?: string;
  isDispensed: boolean;
}

// ==================== LAB TESTS ====================

export interface LabTestType {
  id: string;
  name: string;
  code: string;
  category: string;
  price: number;
  turnaroundTime: string;
  description?: string;
  isActive: boolean;
}

export interface LabTest {
  id: string;
  testNo: string;
  patientId: string;
  patient?: PatientProfile;
  doctorId: string;
  doctor?: DoctorProfile;
  technicianId?: string;
  technician?: StaffProfile;
  testTypeId: string;
  testType?: LabTestType;
  branchId: string;
  medicalRecordId?: string;
  status: LabTestStatus;
  clinicalNotes?: string;
  result?: string;
  technicianNotes?: string;
  reportUrl?: string;
  orderedAt: string;
  completedAt?: string;
}

// ==================== PHARMACY ====================

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  code: string;
  category: string;
  manufacturer: string;
  dosageForm: string;
  strength: string;
  unitPrice: number;
  requiresPrescription: boolean;
  isActive: boolean;
}

export interface Inventory {
  id: string;
  medicineId: string;
  medicine?: Medicine;
  branchId: string;
  branch?: Branch;
  quantity: number;
  reorderLevel: number;
  batchNumber: string;
  expiryDate: string;
  lastUpdated: string;
}

// ==================== ROOMS & ADMISSIONS ====================

export interface Room {
  id: string;
  branchId: string;
  branch?: Branch;
  roomNumber: string;
  roomType: RoomType;
  capacity: number;
  dailyRate: number;
  isAvailable: boolean;
}

export interface Admission {
  id: string;
  admissionNo: string;
  patientId: string;
  patient?: PatientProfile;
  doctorId: string;
  doctor?: DoctorProfile;
  roomId: string;
  room?: Room;
  branchId: string;
  branch?: Branch;
  admissionDate: string;
  dischargeDate?: string;
  status: AdmissionStatus;
  admissionReason: string;
  dischargeNotes?: string;
}

// ==================== BILLING ====================

export interface Bill {
  id: string;
  billNo: string;
  patientId: string;
  patient?: PatientProfile;
  branchId: string;
  appointmentId?: string;
  admissionId?: string;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  items?: BillItem[];
  payments?: Payment[];
  createdAt: string;
  paidAt?: string;
}

export interface BillItem {
  id: string;
  billId: string;
  description: string;
  itemType: 'CONSULTATION' | 'PROCEDURE' | 'MEDICATION' | 'LAB_TEST' | 'ROOM' | 'OTHER';
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Payment {
  id: string;
  billId: string;
  receiptNo: string;
  amount: number;
  method: PaymentMethod;
  transactionRef?: string;
  paidAt: string;
}

// ==================== NOTIFICATIONS & AUDIT ====================

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  user?: User;
  action: string;
  entityType: string;
  entityId: string;
  oldValue?: any;
  newValue?: any;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
}

export interface SystemSetting {
  id: string;
  key: string;
  value: string;
  description?: string;
}

// ==================== UI STATE ====================

export type ViewType =
  | 'dashboard'
  | 'appointments'
  | 'patients'
  | 'doctors'
  | 'staff'
  | 'medical-records'
  | 'prescriptions'
  | 'lab-tests'
  | 'pharmacy'
  | 'inventory'
  | 'rooms'
  | 'admissions'
  | 'billing'
  | 'payments'
  | 'reports'
  | 'notifications'
  | 'audit-logs'
  | 'settings'
  | 'book-appointment'
  | 'my-records'
  | 'my-prescriptions'
  | 'my-bills';

// ==================== DASHBOARD STATS ====================

export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalStaff: number;
  todayAppointments: number;
  pendingAppointments: number;
  activeAdmissions: number;
  availableBeds: number;
  pendingLabTests: number;
  lowStockItems: number;
  pendingBills: number;
  todayRevenue: number;
  monthlyRevenue: number;
}

// ==================== CONSTANTS ====================

export const SPECIALIZATIONS = [
  'General Medicine',
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Pediatrics',
  'Oncology',
  'Dermatology',
  'Ophthalmology',
  'ENT',
  'Gynecology',
  'Urology',
  'Psychiatry',
  'Emergency Medicine',
  'Radiology',
  'Pathology',
  'Anesthesiology',
  'Gastroenterology',
  'Pulmonology',
  'Nephrology',
  'Endocrinology'
];

export const DEPARTMENTS = [
  'Reception',
  'Nursing',
  'Laboratory',
  'Pharmacy',
  'Radiology',
  'Administration',
  'Housekeeping',
  'Security',
  'IT',
  'Finance',
  'HR',
  'Maintenance'
];

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
