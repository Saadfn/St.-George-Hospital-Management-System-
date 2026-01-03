import {
  UserRole,
  AppointmentStatus,
  AdmissionStatus,
  LabTestStatus,
  PrescriptionStatus,
  PaymentStatus,
  RoomType,
  PaymentMethod,
  User,
  Branch,
  DoctorProfile,
  StaffProfile,
  PatientProfile,
  Appointment,
  MedicalRecord,
  Vitals,
  Prescription,
  PrescriptionItem,
  LabTestType,
  LabTest,
  Medicine,
  Inventory,
  Room,
  Admission,
  Bill,
  BillItem,
  Payment,
  Notification,
  SPECIALIZATIONS,
  DEPARTMENTS
} from '../types';

// ==================== USERS ====================
export const MOCK_USERS: User[] = [
  { id: 'u1', email: 'admin@stgeorge.com.au', name: 'System Administrator', role: UserRole.ADMIN, phone: '+61 2 9999 0001', isActive: true, createdAt: '2023-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' },
  { id: 'u2', email: 'sarah.smith@stgeorge.com.au', name: 'Dr. Sarah Smith', role: UserRole.DOCTOR, phone: '+61 2 9999 0101', isActive: true, createdAt: '2023-01-15T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah' },
  { id: 'u3', email: 'james.wilson@stgeorge.com.au', name: 'Dr. James Wilson', role: UserRole.DOCTOR, phone: '+61 2 9999 0102', isActive: true, createdAt: '2023-02-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James' },
  { id: 'u4', email: 'priya.patel@stgeorge.com.au', name: 'Dr. Priya Patel', role: UserRole.DOCTOR, phone: '+61 2 9999 0103', isActive: true, createdAt: '2023-02-15T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya' },
  { id: 'u5', email: 'michael.chen@stgeorge.com.au', name: 'Dr. Michael Chen', role: UserRole.DOCTOR, phone: '+61 2 9999 0104', isActive: true, createdAt: '2023-03-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael' },
  { id: 'u6', email: 'emma.thompson@stgeorge.com.au', name: 'Dr. Emma Thompson', role: UserRole.DOCTOR, phone: '+61 3 8888 0101', isActive: true, createdAt: '2023-03-15T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' },
  { id: 'u7', email: 'emily.chen@stgeorge.com.au', name: 'Emily Chen', role: UserRole.STAFF, phone: '+61 2 9999 0201', isActive: true, createdAt: '2023-04-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily' },
  { id: 'u8', email: 'david.kumar@stgeorge.com.au', name: 'David Kumar', role: UserRole.STAFF, phone: '+61 2 9999 0202', isActive: true, createdAt: '2023-04-15T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' },
  { id: 'u9', email: 'lisa.wong@stgeorge.com.au', name: 'Lisa Wong', role: UserRole.STAFF, phone: '+61 2 9999 0203', isActive: true, createdAt: '2023-05-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa' },
  { id: 'u10', email: 'john.doe@gmail.com', name: 'John Doe', role: UserRole.PATIENT, phone: '+61 412 345 678', isActive: true, createdAt: '2023-06-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John' },
  { id: 'u11', email: 'alice.johnson@gmail.com', name: 'Alice Johnson', role: UserRole.PATIENT, phone: '+61 423 456 789', isActive: true, createdAt: '2023-06-15T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  { id: 'u12', email: 'bob.brown@gmail.com', name: 'Bob Brown', role: UserRole.PATIENT, phone: '+61 434 567 890', isActive: true, createdAt: '2023-07-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
  { id: 'u13', email: 'sarah.williams@gmail.com', name: 'Sarah Williams', role: UserRole.PATIENT, phone: '+61 445 678 901', isActive: true, createdAt: '2023-07-15T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SarahW' },
];

// ==================== BRANCHES ====================
export const MOCK_BRANCHES: Branch[] = [
  { id: 'b1', name: 'St. George Sydney CBD', code: 'SYD-CBD', address: '123 George Street', city: 'Sydney', state: 'NSW', phone: '+61 2 9999 1111', email: 'sydney@stgeorge.com.au', isActive: true, createdAt: '2020-01-01T00:00:00Z' },
  { id: 'b2', name: 'St. George Melbourne', code: 'MEL-CBD', address: '456 Collins Street', city: 'Melbourne', state: 'VIC', phone: '+61 3 8888 2222', email: 'melbourne@stgeorge.com.au', isActive: true, createdAt: '2020-06-01T00:00:00Z' },
  { id: 'b3', name: 'St. George Brisbane', code: 'BNE-CBD', address: '789 Queen Street', city: 'Brisbane', state: 'QLD', phone: '+61 7 7777 3333', email: 'brisbane@stgeorge.com.au', isActive: true, createdAt: '2021-01-01T00:00:00Z' },
];

// ==================== DOCTOR PROFILES ====================
export const MOCK_DOCTOR_PROFILES: DoctorProfile[] = [
  { id: 'dp1', userId: 'u2', branchId: 'b1', specialization: 'Cardiology', licenseNumber: 'MED-NSW-12345', consultationFee: 250, availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], startTime: '09:00', endTime: '17:00', slotDuration: 30 },
  { id: 'dp2', userId: 'u3', branchId: 'b1', specialization: 'Orthopedics', licenseNumber: 'MED-NSW-12346', consultationFee: 280, availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'], startTime: '08:00', endTime: '16:00', slotDuration: 30 },
  { id: 'dp3', userId: 'u4', branchId: 'b1', specialization: 'Pediatrics', licenseNumber: 'MED-NSW-12347', consultationFee: 200, availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], startTime: '10:00', endTime: '18:00', slotDuration: 30 },
  { id: 'dp4', userId: 'u5', branchId: 'b1', specialization: 'Neurology', licenseNumber: 'MED-NSW-12348', consultationFee: 300, availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], startTime: '09:00', endTime: '17:00', slotDuration: 45 },
  { id: 'dp5', userId: 'u6', branchId: 'b2', specialization: 'General Medicine', licenseNumber: 'MED-VIC-23456', consultationFee: 180, availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], startTime: '08:00', endTime: '16:00', slotDuration: 20 },
];

// ==================== STAFF PROFILES ====================
export const MOCK_STAFF_PROFILES: StaffProfile[] = [
  { id: 'sp1', userId: 'u7', branchId: 'b1', department: 'Reception', employeeId: 'EMP-SYD-001', joinDate: '2023-04-01' },
  { id: 'sp2', userId: 'u8', branchId: 'b1', department: 'Laboratory', employeeId: 'EMP-SYD-002', joinDate: '2023-04-15' },
  { id: 'sp3', userId: 'u9', branchId: 'b1', department: 'Pharmacy', employeeId: 'EMP-SYD-003', joinDate: '2023-05-01' },
];

// ==================== PATIENT PROFILES ====================
export const MOCK_PATIENT_PROFILES: PatientProfile[] = [
  { id: 'pp1', userId: 'u10', patientId: 'STG-2023-00001', dateOfBirth: '1985-03-15', gender: 'Male', bloodGroup: 'O+', address: '45 King Street, Sydney NSW 2000', emergencyContact: 'Jane Doe', emergencyPhone: '+61 412 345 679', allergies: ['Penicillin'], medicalHistory: 'Mild hypertension diagnosed 2023' },
  { id: 'pp2', userId: 'u11', patientId: 'STG-2023-00002', dateOfBirth: '1990-07-22', gender: 'Female', bloodGroup: 'A+', address: '123 Collins Street, Melbourne VIC 3000', emergencyContact: 'Bob Johnson', emergencyPhone: '+61 423 456 790', allergies: [], medicalHistory: 'No significant medical history' },
  { id: 'pp3', userId: 'u12', patientId: 'STG-2023-00003', dateOfBirth: '1978-11-08', gender: 'Male', bloodGroup: 'B-', address: '78 Queen Street, Brisbane QLD 4000', emergencyContact: 'Carol Brown', emergencyPhone: '+61 434 567 891', allergies: ['Aspirin', 'Latex'], medicalHistory: 'Type 2 Diabetes, managed with medication' },
  { id: 'pp4', userId: 'u13', patientId: 'STG-2023-00004', dateOfBirth: '1995-05-30', gender: 'Female', bloodGroup: 'AB+', address: '200 George Street, Sydney NSW 2000', emergencyContact: 'Tom Williams', emergencyPhone: '+61 445 678 902', allergies: [], medicalHistory: 'No significant medical history' },
];

// ==================== APPOINTMENTS ====================
export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'apt1', appointmentNo: 'APT-2024-0001', patientId: 'pp1', doctorId: 'dp1', branchId: 'b1', dateTime: '2024-01-15T09:00:00Z', duration: 30, status: AppointmentStatus.SCHEDULED, reason: 'Annual cardiac checkup', notes: 'Patient requested early morning appointment', createdAt: '2024-01-10T10:00:00Z' },
  { id: 'apt2', appointmentNo: 'APT-2024-0002', patientId: 'pp2', doctorId: 'dp1', branchId: 'b1', dateTime: '2024-01-15T10:30:00Z', duration: 30, status: AppointmentStatus.SCHEDULED, reason: 'Follow-up consultation', createdAt: '2024-01-11T14:00:00Z' },
  { id: 'apt3', appointmentNo: 'APT-2024-0003', patientId: 'pp3', doctorId: 'dp2', branchId: 'b1', dateTime: '2024-01-14T14:00:00Z', duration: 30, status: AppointmentStatus.COMPLETED, reason: 'Knee pain assessment', notes: 'Referred for X-ray', createdAt: '2024-01-08T09:00:00Z' },
  { id: 'apt4', appointmentNo: 'APT-2024-0004', patientId: 'pp4', doctorId: 'dp3', branchId: 'b1', dateTime: '2024-01-16T11:00:00Z', duration: 30, status: AppointmentStatus.CONFIRMED, reason: 'General checkup', createdAt: '2024-01-12T16:00:00Z' },
  { id: 'apt5', appointmentNo: 'APT-2024-0005', patientId: 'pp1', doctorId: 'dp4', branchId: 'b1', dateTime: '2024-01-17T15:00:00Z', duration: 45, status: AppointmentStatus.SCHEDULED, reason: 'Headache evaluation', createdAt: '2024-01-13T11:00:00Z' },
];

// ==================== MEDICAL RECORDS ====================
export const MOCK_MEDICAL_RECORDS: MedicalRecord[] = [
  { id: 'mr1', recordNo: 'MR-2024-0001', patientId: 'pp1', doctorId: 'dp1', appointmentId: 'apt3', branchId: 'b1', chiefComplaint: 'Chest discomfort during exercise', symptoms: 'Shortness of breath, mild chest pain', diagnosis: 'Mild Hypertension', treatmentPlan: 'Lifestyle modifications, medication prescribed', notes: 'Follow-up in 3 months', createdAt: '2023-09-10T10:00:00Z' },
  { id: 'mr2', recordNo: 'MR-2024-0002', patientId: 'pp1', doctorId: 'dp2', branchId: 'b1', chiefComplaint: 'Seasonal allergic reaction', symptoms: 'Sneezing, runny nose, itchy eyes', diagnosis: 'Seasonal Allergies', treatmentPlan: 'Antihistamine as needed', createdAt: '2023-05-15T14:00:00Z' },
  { id: 'mr3', recordNo: 'MR-2024-0003', patientId: 'pp2', doctorId: 'dp2', branchId: 'b2', chiefComplaint: 'Lower back pain for 2 weeks', symptoms: 'Pain radiating to left leg, difficulty sitting', diagnosis: 'Lower Back Pain - Muscular', treatmentPlan: 'Physical therapy, pain management', notes: 'Referred to physiotherapy', createdAt: '2023-08-20T11:00:00Z' },
  { id: 'mr4', recordNo: 'MR-2024-0004', patientId: 'pp3', doctorId: 'dp5', branchId: 'b3', chiefComplaint: 'Routine diabetes checkup', symptoms: 'No acute symptoms', diagnosis: 'Type 2 Diabetes - Controlled', treatmentPlan: 'Continue current medication, diet control', notes: 'HbA1c levels stable', createdAt: '2023-10-05T09:00:00Z' },
];

// ==================== VITALS ====================
export const MOCK_VITALS: Vitals[] = [
  { id: 'v1', medicalRecordId: 'mr1', temperature: 36.8, bloodPressureSys: 145, bloodPressureDia: 92, pulseRate: 78, respiratoryRate: 16, weight: 82, height: 175, bmi: 26.8, recordedAt: '2023-09-10T10:15:00Z' },
  { id: 'v2', medicalRecordId: 'mr3', temperature: 36.5, bloodPressureSys: 120, bloodPressureDia: 80, pulseRate: 72, respiratoryRate: 14, weight: 65, height: 165, bmi: 23.9, recordedAt: '2023-08-20T11:15:00Z' },
  { id: 'v3', medicalRecordId: 'mr4', temperature: 36.6, bloodPressureSys: 130, bloodPressureDia: 85, pulseRate: 76, respiratoryRate: 15, weight: 88, height: 178, bmi: 27.8, recordedAt: '2023-10-05T09:15:00Z' },
];

// ==================== LAB TEST TYPES ====================
export const MOCK_LAB_TEST_TYPES: LabTestType[] = [
  { id: 'ltt1', name: 'Complete Blood Count', code: 'CBC', category: 'Hematology', price: 80, turnaroundTime: '24 hours', description: 'Measures various components of blood', isActive: true },
  { id: 'ltt2', name: 'Lipid Panel', code: 'LIPID', category: 'Chemistry', price: 120, turnaroundTime: '24 hours', description: 'Cholesterol and triglyceride levels', isActive: true },
  { id: 'ltt3', name: 'Liver Function Test', code: 'LFT', category: 'Chemistry', price: 100, turnaroundTime: '24 hours', description: 'Assesses liver health', isActive: true },
  { id: 'ltt4', name: 'Thyroid Function Test', code: 'TFT', category: 'Endocrinology', price: 150, turnaroundTime: '48 hours', description: 'TSH, T3, T4 levels', isActive: true },
  { id: 'ltt5', name: 'HbA1c', code: 'HBA1C', category: 'Diabetes', price: 90, turnaroundTime: '24 hours', description: 'Average blood sugar over 3 months', isActive: true },
  { id: 'ltt6', name: 'MRI Brain', code: 'MRI-BR', category: 'Imaging', price: 850, turnaroundTime: '2-3 days', description: 'Detailed brain imaging', isActive: true },
  { id: 'ltt7', name: 'X-Ray Chest', code: 'XRAY-CH', category: 'Imaging', price: 150, turnaroundTime: '4 hours', description: 'Chest radiograph', isActive: true },
  { id: 'ltt8', name: 'ECG', code: 'ECG', category: 'Cardiology', price: 100, turnaroundTime: '1 hour', description: 'Electrocardiogram', isActive: true },
];

// ==================== LAB TESTS ====================
export const MOCK_LAB_TESTS: LabTest[] = [
  { id: 'lt1', testNo: 'LT-2024-0001', patientId: 'pp1', doctorId: 'dp1', technicianId: 'sp2', testTypeId: 'ltt1', branchId: 'b1', medicalRecordId: 'mr1', status: LabTestStatus.COMPLETED, clinicalNotes: 'Routine checkup', result: 'All values within normal range', technicianNotes: 'Sample quality good', orderedAt: '2024-01-14T09:00:00Z', completedAt: '2024-01-15T10:00:00Z' },
  { id: 'lt2', testNo: 'LT-2024-0002', patientId: 'pp1', doctorId: 'dp1', testTypeId: 'ltt2', branchId: 'b1', status: LabTestStatus.PROCESSING, clinicalNotes: 'Monitor cholesterol levels', orderedAt: '2024-01-14T09:00:00Z' },
  { id: 'lt3', testNo: 'LT-2024-0003', patientId: 'pp2', doctorId: 'dp4', technicianId: 'sp2', testTypeId: 'ltt6', branchId: 'b1', status: LabTestStatus.COMPLETED, clinicalNotes: 'Persistent headaches', result: 'No abnormalities detected', orderedAt: '2024-01-13T14:00:00Z', completedAt: '2024-01-14T16:00:00Z' },
  { id: 'lt4', testNo: 'LT-2024-0004', patientId: 'pp3', doctorId: 'dp5', testTypeId: 'ltt5', branchId: 'b3', status: LabTestStatus.SAMPLE_COLLECTED, clinicalNotes: 'Diabetes monitoring', orderedAt: '2024-01-15T08:00:00Z' },
  { id: 'lt5', testNo: 'LT-2024-0005', patientId: 'pp4', doctorId: 'dp3', testTypeId: 'ltt4', branchId: 'b1', status: LabTestStatus.ORDERED, clinicalNotes: 'Fatigue symptoms', orderedAt: '2024-01-15T11:00:00Z' },
];

// ==================== MEDICINES ====================
export const MOCK_MEDICINES: Medicine[] = [
  { id: 'med1', name: 'Paracetamol 500mg', genericName: 'Paracetamol', code: 'MED-001', category: 'Pain Relief', manufacturer: 'Panacea Biotech', dosageForm: 'Tablet', strength: '500mg', unitPrice: 0.50, requiresPrescription: false, isActive: true },
  { id: 'med2', name: 'Amoxicillin 500mg', genericName: 'Amoxicillin', code: 'MED-002', category: 'Antibiotic', manufacturer: 'Sun Pharma', dosageForm: 'Capsule', strength: '500mg', unitPrice: 1.20, requiresPrescription: true, isActive: true },
  { id: 'med3', name: 'Lisinopril 10mg', genericName: 'Lisinopril', code: 'MED-003', category: 'Cardiovascular', manufacturer: 'Cipla', dosageForm: 'Tablet', strength: '10mg', unitPrice: 0.80, requiresPrescription: true, isActive: true },
  { id: 'med4', name: 'Metformin 500mg', genericName: 'Metformin', code: 'MED-004', category: 'Diabetes', manufacturer: 'Biocon', dosageForm: 'Tablet', strength: '500mg', unitPrice: 0.60, requiresPrescription: true, isActive: true },
  { id: 'med5', name: 'Cetirizine 10mg', genericName: 'Cetirizine', code: 'MED-005', category: 'Antihistamine', manufacturer: 'Dr Reddy', dosageForm: 'Tablet', strength: '10mg', unitPrice: 0.40, requiresPrescription: false, isActive: true },
  { id: 'med6', name: 'Omeprazole 20mg', genericName: 'Omeprazole', code: 'MED-006', category: 'Gastrointestinal', manufacturer: 'Ranbaxy', dosageForm: 'Capsule', strength: '20mg', unitPrice: 0.90, requiresPrescription: true, isActive: true },
  { id: 'med7', name: 'Ibuprofen 400mg', genericName: 'Ibuprofen', code: 'MED-007', category: 'Pain Relief', manufacturer: 'GSK', dosageForm: 'Tablet', strength: '400mg', unitPrice: 0.55, requiresPrescription: false, isActive: true },
  { id: 'med8', name: 'Aspirin 100mg', genericName: 'Aspirin', code: 'MED-008', category: 'Cardiovascular', manufacturer: 'Bayer', dosageForm: 'Tablet', strength: '100mg', unitPrice: 0.30, requiresPrescription: false, isActive: true },
];

// ==================== INVENTORY ====================
export const MOCK_INVENTORY: Inventory[] = [
  { id: 'inv1', medicineId: 'med1', branchId: 'b1', quantity: 5000, reorderLevel: 1000, batchNumber: 'BN-2024-001', expiryDate: '2025-06-30', lastUpdated: '2024-01-10T00:00:00Z' },
  { id: 'inv2', medicineId: 'med2', branchId: 'b1', quantity: 3000, reorderLevel: 500, batchNumber: 'BN-2024-002', expiryDate: '2025-03-15', lastUpdated: '2024-01-10T00:00:00Z' },
  { id: 'inv3', medicineId: 'med3', branchId: 'b1', quantity: 2000, reorderLevel: 400, batchNumber: 'BN-2024-003', expiryDate: '2025-09-20', lastUpdated: '2024-01-10T00:00:00Z' },
  { id: 'inv4', medicineId: 'med4', branchId: 'b1', quantity: 4000, reorderLevel: 800, batchNumber: 'BN-2024-004', expiryDate: '2025-12-01', lastUpdated: '2024-01-10T00:00:00Z' },
  { id: 'inv5', medicineId: 'med5', branchId: 'b1', quantity: 6000, reorderLevel: 1200, batchNumber: 'BN-2024-005', expiryDate: '2025-08-10', lastUpdated: '2024-01-10T00:00:00Z' },
  { id: 'inv6', medicineId: 'med6', branchId: 'b1', quantity: 2500, reorderLevel: 500, batchNumber: 'BN-2024-006', expiryDate: '2025-05-25', lastUpdated: '2024-01-10T00:00:00Z' },
  { id: 'inv7', medicineId: 'med7', branchId: 'b1', quantity: 800, reorderLevel: 1000, batchNumber: 'BN-2024-007', expiryDate: '2025-04-15', lastUpdated: '2024-01-10T00:00:00Z' },
  { id: 'inv8', medicineId: 'med8', branchId: 'b1', quantity: 200, reorderLevel: 500, batchNumber: 'BN-2024-008', expiryDate: '2024-02-28', lastUpdated: '2024-01-10T00:00:00Z' },
];

// ==================== PRESCRIPTIONS ====================
export const MOCK_PRESCRIPTIONS: Prescription[] = [
  { id: 'rx1', prescriptionNo: 'RX-2024-0001', medicalRecordId: 'mr1', patientId: 'pp1', doctorId: 'dp1', branchId: 'b1', status: PrescriptionStatus.DISPENSED, notes: 'Take with food', createdAt: '2023-09-10T10:30:00Z' },
  { id: 'rx2', prescriptionNo: 'RX-2024-0002', medicalRecordId: 'mr2', patientId: 'pp1', doctorId: 'dp2', branchId: 'b1', status: PrescriptionStatus.DISPENSED, createdAt: '2023-05-15T14:30:00Z' },
  { id: 'rx3', prescriptionNo: 'RX-2024-0003', medicalRecordId: 'mr4', patientId: 'pp3', doctorId: 'dp5', branchId: 'b3', status: PrescriptionStatus.PENDING, notes: 'Refill prescription', createdAt: '2023-10-05T09:30:00Z' },
];

// ==================== PRESCRIPTION ITEMS ====================
export const MOCK_PRESCRIPTION_ITEMS: PrescriptionItem[] = [
  { id: 'rxi1', prescriptionId: 'rx1', medicineId: 'med3', dosage: '10mg', frequency: 'Once daily', duration: '30 days', quantity: 30, instructions: 'Take in the morning', isDispensed: true },
  { id: 'rxi2', prescriptionId: 'rx2', medicineId: 'med5', dosage: '10mg', frequency: 'As needed', duration: '14 days', quantity: 14, instructions: 'Take when symptoms occur', isDispensed: true },
  { id: 'rxi3', prescriptionId: 'rx3', medicineId: 'med4', dosage: '500mg', frequency: 'Twice daily', duration: '90 days', quantity: 180, instructions: 'Take with meals', isDispensed: false },
];

// ==================== ROOMS ====================
export const MOCK_ROOMS: Room[] = [
  { id: 'rm1', branchId: 'b1', roomNumber: 'GA-001', roomType: RoomType.GENERAL, capacity: 4, dailyRate: 200, isAvailable: false },
  { id: 'rm2', branchId: 'b1', roomNumber: 'GA-002', roomType: RoomType.GENERAL, capacity: 4, dailyRate: 200, isAvailable: true },
  { id: 'rm3', branchId: 'b1', roomNumber: 'SP-001', roomType: RoomType.SEMI_PRIVATE, capacity: 2, dailyRate: 350, isAvailable: true },
  { id: 'rm4', branchId: 'b1', roomNumber: 'PV-001', roomType: RoomType.PRIVATE, capacity: 1, dailyRate: 500, isAvailable: false },
  { id: 'rm5', branchId: 'b1', roomNumber: 'ICU-001', roomType: RoomType.ICU, capacity: 1, dailyRate: 1200, isAvailable: false },
  { id: 'rm6', branchId: 'b1', roomNumber: 'ICU-002', roomType: RoomType.ICU, capacity: 1, dailyRate: 1200, isAvailable: true },
  { id: 'rm7', branchId: 'b1', roomNumber: 'ER-001', roomType: RoomType.EMERGENCY, capacity: 2, dailyRate: 800, isAvailable: true },
  { id: 'rm8', branchId: 'b1', roomNumber: 'OP-001', roomType: RoomType.OPERATION, capacity: 1, dailyRate: 2000, isAvailable: true },
  { id: 'rm9', branchId: 'b1', roomNumber: 'MAT-001', roomType: RoomType.MATERNITY, capacity: 2, dailyRate: 450, isAvailable: true },
  { id: 'rm10', branchId: 'b1', roomNumber: 'PED-001', roomType: RoomType.PEDIATRIC, capacity: 2, dailyRate: 300, isAvailable: true },
];

// ==================== ADMISSIONS ====================
export const MOCK_ADMISSIONS: Admission[] = [
  { id: 'adm1', admissionNo: 'ADM-2024-0001', patientId: 'pp1', doctorId: 'dp1', roomId: 'rm1', branchId: 'b1', admissionDate: '2024-01-10T08:00:00Z', status: AdmissionStatus.ADMITTED, admissionReason: 'Cardiac observation after chest pain episode' },
  { id: 'adm2', admissionNo: 'ADM-2024-0002', patientId: 'pp2', doctorId: 'dp4', roomId: 'rm5', branchId: 'b1', admissionDate: '2024-01-12T10:00:00Z', status: AdmissionStatus.ADMITTED, admissionReason: 'Post-operative monitoring after neurological procedure' },
  { id: 'adm3', admissionNo: 'ADM-2024-0003', patientId: 'pp3', doctorId: 'dp2', roomId: 'rm4', branchId: 'b1', admissionDate: '2024-01-08T14:00:00Z', dischargeDate: '2024-01-14T11:00:00Z', status: AdmissionStatus.DISCHARGED, admissionReason: 'Knee surgery recovery', dischargeNotes: 'Full recovery, follow-up in 2 weeks' },
];

// ==================== BILLS ====================
export const MOCK_BILLS: Bill[] = [
  { id: 'bill1', billNo: 'INV-2024-0001', patientId: 'pp1', branchId: 'b1', appointmentId: 'apt3', subtotal: 480, taxAmount: 48, discountAmount: 0, totalAmount: 528, paymentStatus: PaymentStatus.PENDING, createdAt: '2024-01-14T16:00:00Z' },
  { id: 'bill2', billNo: 'INV-2024-0002', patientId: 'pp2', branchId: 'b1', admissionId: 'adm2', subtotal: 2150, taxAmount: 215, discountAmount: 100, totalAmount: 2265, paymentStatus: PaymentStatus.PAID, createdAt: '2024-01-13T10:00:00Z', paidAt: '2024-01-13T14:00:00Z' },
  { id: 'bill3', billNo: 'INV-2024-0003', patientId: 'pp3', branchId: 'b1', admissionId: 'adm3', subtotal: 6850, taxAmount: 685, discountAmount: 500, totalAmount: 7035, paymentStatus: PaymentStatus.OVERDUE, createdAt: '2024-01-08T14:00:00Z' },
];

// ==================== BILL ITEMS ====================
export const MOCK_BILL_ITEMS: BillItem[] = [
  { id: 'bi1', billId: 'bill1', description: 'Cardiology Consultation', itemType: 'CONSULTATION', quantity: 1, unitPrice: 250, amount: 250 },
  { id: 'bi2', billId: 'bill1', description: 'ECG Test', itemType: 'PROCEDURE', quantity: 1, unitPrice: 150, amount: 150 },
  { id: 'bi3', billId: 'bill1', description: 'Blood Test - CBC', itemType: 'LAB_TEST', quantity: 1, unitPrice: 80, amount: 80 },
  { id: 'bi4', billId: 'bill2', description: 'Neurology Consultation', itemType: 'CONSULTATION', quantity: 1, unitPrice: 300, amount: 300 },
  { id: 'bi5', billId: 'bill2', description: 'MRI Brain Scan', itemType: 'PROCEDURE', quantity: 1, unitPrice: 850, amount: 850 },
  { id: 'bi6', billId: 'bill2', description: 'ICU Room - 2 days', itemType: 'ROOM', quantity: 2, unitPrice: 500, amount: 1000 },
  { id: 'bi7', billId: 'bill3', description: 'Orthopedic Surgery', itemType: 'PROCEDURE', quantity: 1, unitPrice: 5000, amount: 5000 },
  { id: 'bi8', billId: 'bill3', description: 'Private Room - 6 days', itemType: 'ROOM', quantity: 6, unitPrice: 200, amount: 1200 },
  { id: 'bi9', billId: 'bill3', description: 'Medications', itemType: 'MEDICATION', quantity: 1, unitPrice: 350, amount: 350 },
  { id: 'bi10', billId: 'bill3', description: 'Post-op Physiotherapy', itemType: 'OTHER', quantity: 3, unitPrice: 100, amount: 300 },
];

// ==================== PAYMENTS ====================
export const MOCK_PAYMENTS: Payment[] = [
  { id: 'pay1', billId: 'bill2', receiptNo: 'RCP-2024-0001', amount: 2265, method: PaymentMethod.INSURANCE, transactionRef: 'INS-CLAIM-12345', paidAt: '2024-01-13T14:00:00Z' },
];

// ==================== NOTIFICATIONS ====================
export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'notif1', userId: 'u10', title: 'Appointment Confirmed', message: 'Your appointment with Dr. Sarah Smith on Jan 15, 2024 has been confirmed.', type: 'success', isRead: false, createdAt: '2024-01-11T10:00:00Z' },
  { id: 'notif2', userId: 'u10', title: 'Lab Results Ready', message: 'Your CBC test results are now available. Please log in to view.', type: 'info', isRead: true, createdAt: '2024-01-15T12:00:00Z' },
  { id: 'notif3', userId: 'u2', title: 'New Appointment Request', message: 'John Doe has requested an appointment for cardiac consultation.', type: 'info', isRead: false, createdAt: '2024-01-10T14:00:00Z' },
  { id: 'notif4', userId: 'u7', title: 'Low Stock Alert', message: 'Ibuprofen 400mg is running low on stock. Current quantity: 800', type: 'warning', isRead: false, createdAt: '2024-01-15T08:00:00Z' },
];

// ==================== HELPER FUNCTIONS ====================

// Get user with profile
export const getUserWithProfile = (userId: string) => {
  const user = MOCK_USERS.find(u => u.id === userId);
  if (!user) return null;

  if (user.role === UserRole.DOCTOR) {
    const profile = MOCK_DOCTOR_PROFILES.find(p => p.userId === userId);
    return { ...user, profile };
  }
  if (user.role === UserRole.STAFF) {
    const profile = MOCK_STAFF_PROFILES.find(p => p.userId === userId);
    return { ...user, profile };
  }
  if (user.role === UserRole.PATIENT) {
    const profile = MOCK_PATIENT_PROFILES.find(p => p.userId === userId);
    return { ...user, profile };
  }
  return user;
};

// Get doctor profile with user data
export const getDoctorWithUser = (doctorProfileId: string) => {
  const profile = MOCK_DOCTOR_PROFILES.find(p => p.id === doctorProfileId);
  if (!profile) return null;
  const user = MOCK_USERS.find(u => u.id === profile.userId);
  const branch = MOCK_BRANCHES.find(b => b.id === profile.branchId);
  return { ...profile, user, branch };
};

// Get patient profile with user data
export const getPatientWithUser = (patientProfileId: string) => {
  const profile = MOCK_PATIENT_PROFILES.find(p => p.id === patientProfileId);
  if (!profile) return null;
  const user = MOCK_USERS.find(u => u.id === profile.userId);
  return { ...profile, user };
};

// Get appointment with related data
export const getAppointmentWithDetails = (appointmentId: string) => {
  const appointment = MOCK_APPOINTMENTS.find(a => a.id === appointmentId);
  if (!appointment) return null;

  const patient = getPatientWithUser(appointment.patientId);
  const doctor = getDoctorWithUser(appointment.doctorId);
  const branch = MOCK_BRANCHES.find(b => b.id === appointment.branchId);

  return { ...appointment, patient, doctor, branch };
};

// Get inventory with medicine details
export const getInventoryWithMedicine = (inventoryId: string) => {
  const inventory = MOCK_INVENTORY.find(i => i.id === inventoryId);
  if (!inventory) return null;
  const medicine = MOCK_MEDICINES.find(m => m.id === inventory.medicineId);
  const branch = MOCK_BRANCHES.find(b => b.id === inventory.branchId);
  return { ...inventory, medicine, branch };
};

// Export constants for backward compatibility
export const SPECIALTIES = SPECIALIZATIONS;

export const APPOINTMENT_TYPES = [
  'General Consultation',
  'Follow-up Visit',
  'Annual Checkup',
  'Specialist Referral',
  'Lab Work',
  'Vaccination',
  'Pre-operative Assessment',
  'Post-operative Follow-up',
];

export const TEST_TYPES = [
  'Complete Blood Count (CBC)',
  'Lipid Panel',
  'Liver Function Test',
  'Kidney Function Test',
  'Thyroid Function Test',
  'HbA1c',
  'Blood Glucose',
  'Urinalysis',
  'ECG',
  'Echocardiogram',
  'X-Ray',
  'CT Scan',
  'MRI',
  'Ultrasound',
];
