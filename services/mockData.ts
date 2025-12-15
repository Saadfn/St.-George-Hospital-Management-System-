import {
  Role,
  User,
  Doctor,
  Patient,
  Appointment,
  Branch,
  MedicalRecord,
  Ward,
  Bed,
  Admission,
  Medicine,
  LabTest,
  Invoice
} from '../types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Dr. Sarah Smith', email: 'sarah@stgeorge.com', role: Role.DOCTOR, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', branchId: '1' },
  { id: '2', name: 'John Doe', email: 'john@gmail.com', role: Role.PATIENT, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', branchId: '1' },
  { id: '3', name: 'Admin User', email: 'admin@stgeorge.com', role: Role.ADMIN, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin', branchId: '1' },
  { id: '4', name: 'Emily Chen', email: 'emily@stgeorge.com', role: Role.STAFF, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily', branchId: '1' },
];

export const MOCK_BRANCHES: Branch[] = [
  { id: '1', name: 'St. George Sydney CBD', location: 'Sydney, NSW', address: '123 George Street, Sydney NSW 2000', capacity: 450, contact: '+61 2 9999 1111', email: 'sydney@stgeorge.com.au', departments: ['Cardiology', 'Neurology', 'Orthopedics', 'General Medicine', 'Emergency', 'Pediatrics'] },
  { id: '2', name: 'St. George Melbourne', location: 'Melbourne, VIC', address: '456 Collins Street, Melbourne VIC 3000', capacity: 320, contact: '+61 3 8888 2222', email: 'melbourne@stgeorge.com.au', departments: ['Cardiology', 'Oncology', 'General Medicine', 'Emergency', 'Maternity'] },
  { id: '3', name: 'St. George Brisbane', location: 'Brisbane, QLD', address: '789 Queen Street, Brisbane QLD 4000', capacity: 200, contact: '+61 7 7777 3333', email: 'brisbane@stgeorge.com.au', departments: ['General Medicine', 'Emergency', 'Pediatrics', 'Dermatology'] },
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'd1',
    name: 'Dr. Sarah Smith',
    email: 'sarah.smith@stgeorge.com',
    specialty: 'Cardiology',
    gender: 'Female',
    qualifications: ['MBBS', 'MD Cardiology', 'FRACP'],
    branchId: '1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 3, startTime: '09:00', endTime: '13:00' },
      { dayOfWeek: 4, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 5, startTime: '09:00', endTime: '15:00' },
    ],
    consultationFee: 250
  },
  {
    id: 'd2',
    name: 'Dr. James Wilson',
    email: 'james.wilson@stgeorge.com',
    specialty: 'Orthopedics',
    gender: 'Male',
    qualifications: ['MBBS', 'MS Orthopedics', 'FRACS'],
    branchId: '1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    availability: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '16:00' },
      { dayOfWeek: 2, startTime: '08:00', endTime: '16:00' },
      { dayOfWeek: 4, startTime: '08:00', endTime: '16:00' },
      { dayOfWeek: 5, startTime: '08:00', endTime: '12:00' },
    ],
    consultationFee: 280
  },
  {
    id: 'd3',
    name: 'Dr. Priya Patel',
    email: 'priya.patel@stgeorge.com',
    specialty: 'Pediatrics',
    gender: 'Female',
    qualifications: ['MBBS', 'DCH', 'FRACP'],
    branchId: '1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    availability: [
      { dayOfWeek: 1, startTime: '10:00', endTime: '18:00' },
      { dayOfWeek: 2, startTime: '10:00', endTime: '18:00' },
      { dayOfWeek: 3, startTime: '10:00', endTime: '18:00' },
      { dayOfWeek: 4, startTime: '10:00', endTime: '18:00' },
    ],
    consultationFee: 200
  },
  {
    id: 'd4',
    name: 'Dr. Michael Chen',
    email: 'michael.chen@stgeorge.com',
    specialty: 'Neurology',
    gender: 'Male',
    qualifications: ['MBBS', 'MD Neurology', 'PhD'],
    branchId: '1',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    availability: [
      { dayOfWeek: 2, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 4, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 5, startTime: '09:00', endTime: '17:00' },
    ],
    consultationFee: 300
  },
  {
    id: 'd5',
    name: 'Dr. Emma Thompson',
    email: 'emma.thompson@stgeorge.com',
    specialty: 'General Medicine',
    gender: 'Female',
    qualifications: ['MBBS', 'FRACGP'],
    branchId: '2',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    availability: [
      { dayOfWeek: 1, startTime: '08:00', endTime: '16:00' },
      { dayOfWeek: 2, startTime: '08:00', endTime: '16:00' },
      { dayOfWeek: 3, startTime: '08:00', endTime: '16:00' },
      { dayOfWeek: 4, startTime: '08:00', endTime: '16:00' },
      { dayOfWeek: 5, startTime: '08:00', endTime: '16:00' },
    ],
    consultationFee: 180
  },
  {
    id: 'd6',
    name: 'Dr. Robert Kim',
    email: 'robert.kim@stgeorge.com',
    specialty: 'Oncology',
    gender: 'Male',
    qualifications: ['MBBS', 'MD Oncology', 'FRACP'],
    branchId: '2',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
    availability: [
      { dayOfWeek: 1, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 3, startTime: '09:00', endTime: '17:00' },
      { dayOfWeek: 5, startTime: '09:00', endTime: '17:00' },
    ],
    consultationFee: 350
  },
];

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 'p1',
    globalPatientId: 'STG-2023-00001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+61 412 345 678',
    dateOfBirth: '1985-03-15',
    gender: 'Male',
    address: '45 King Street, Sydney NSW 2000',
    emergencyContact: { name: 'Jane Doe', phone: '+61 412 345 679', relationship: 'Spouse' },
    bloodGroup: 'O+',
    allergies: ['Penicillin'],
    insuranceProvider: 'Medibank',
    insuranceNumber: 'MED-123456',
    registeredAt: '2023-01-15',
    branchId: '1'
  },
  {
    id: 'p2',
    globalPatientId: 'STG-2023-00002',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@email.com',
    phone: '+61 423 456 789',
    dateOfBirth: '1990-07-22',
    gender: 'Female',
    address: '123 Collins Street, Melbourne VIC 3000',
    emergencyContact: { name: 'Bob Johnson', phone: '+61 423 456 790', relationship: 'Brother' },
    bloodGroup: 'A+',
    allergies: [],
    insuranceProvider: 'Bupa',
    insuranceNumber: 'BUPA-789012',
    registeredAt: '2023-03-20',
    branchId: '2'
  },
  {
    id: 'p3',
    globalPatientId: 'STG-2023-00003',
    firstName: 'Bob',
    lastName: 'Brown',
    email: 'bob.brown@email.com',
    phone: '+61 434 567 890',
    dateOfBirth: '1978-11-08',
    gender: 'Male',
    address: '78 Queen Street, Brisbane QLD 4000',
    emergencyContact: { name: 'Carol Brown', phone: '+61 434 567 891', relationship: 'Wife' },
    bloodGroup: 'B-',
    allergies: ['Aspirin', 'Latex'],
    insuranceProvider: 'HCF',
    insuranceNumber: 'HCF-345678',
    registeredAt: '2023-02-10',
    branchId: '3'
  },
  {
    id: 'p4',
    globalPatientId: 'STG-2023-00004',
    firstName: 'Sarah',
    lastName: 'Williams',
    email: 'sarah.williams@email.com',
    phone: '+61 445 678 901',
    dateOfBirth: '1995-05-30',
    gender: 'Female',
    address: '200 George Street, Sydney NSW 2000',
    emergencyContact: { name: 'Tom Williams', phone: '+61 445 678 902', relationship: 'Father' },
    bloodGroup: 'AB+',
    allergies: [],
    registeredAt: '2023-04-05',
    branchId: '1'
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: '101', patientId: 'p1', patientName: 'John Doe', doctorId: 'd1', doctorName: 'Dr. Sarah Smith', date: '2024-01-15', time: '09:00', status: 'Scheduled', type: 'Cardiology Consultation', branchId: '1' },
  { id: '102', patientId: 'p2', patientName: 'Alice Johnson', doctorId: 'd1', doctorName: 'Dr. Sarah Smith', date: '2024-01-15', time: '10:30', status: 'Scheduled', type: 'Follow-up', branchId: '1' },
  { id: '103', patientId: 'p3', patientName: 'Bob Brown', doctorId: 'd2', doctorName: 'Dr. James Wilson', date: '2024-01-14', time: '14:00', status: 'Completed', type: 'Orthopedic Consultation', branchId: '1' },
  { id: '104', patientId: 'p4', patientName: 'Sarah Williams', doctorId: 'd3', doctorName: 'Dr. Priya Patel', date: '2024-01-16', time: '11:00', status: 'Pending', type: 'General Checkup', branchId: '1' },
  { id: '105', patientId: 'p1', patientName: 'John Doe', doctorId: 'd4', doctorName: 'Dr. Michael Chen', date: '2024-01-17', time: '15:00', status: 'Scheduled', type: 'Neurology Consultation', branchId: '1' },
];

export const MOCK_RECORDS: MedicalRecord[] = [
  { id: 'r1', patientId: 'p1', date: '2023-09-10', diagnosis: 'Mild Hypertension', prescription: 'Lisinopril 10mg once daily', doctor: 'Dr. Sarah Smith', doctorId: 'd1', notes: 'Blood pressure elevated. Lifestyle modifications recommended.', branchId: '1' },
  { id: 'r2', patientId: 'p1', date: '2023-05-15', diagnosis: 'Seasonal Allergies', prescription: 'Cetirizine 10mg as needed', doctor: 'Dr. James Wilson', doctorId: 'd2', branchId: '1' },
  { id: 'r3', patientId: 'p2', date: '2023-08-20', diagnosis: 'Lower Back Pain', prescription: 'Ibuprofen 400mg, Physical therapy', doctor: 'Dr. James Wilson', doctorId: 'd2', notes: 'Referred to physiotherapy', branchId: '2' },
  { id: 'r4', patientId: 'p3', date: '2023-10-05', diagnosis: 'Type 2 Diabetes', prescription: 'Metformin 500mg twice daily', doctor: 'Dr. Emma Thompson', doctorId: 'd5', notes: 'Diet control essential. Follow-up in 3 months.', branchId: '3' },
];

export const MOCK_WARDS: Ward[] = [
  { id: 'w1', name: 'General Ward A', branchId: '1', type: 'General', totalBeds: 30, occupiedBeds: 22 },
  { id: 'w2', name: 'General Ward B', branchId: '1', type: 'General', totalBeds: 30, occupiedBeds: 18 },
  { id: 'w3', name: 'ICU', branchId: '1', type: 'ICU', totalBeds: 15, occupiedBeds: 12 },
  { id: 'w4', name: 'Emergency Ward', branchId: '1', type: 'Emergency', totalBeds: 20, occupiedBeds: 8 },
  { id: 'w5', name: 'Maternity Ward', branchId: '1', type: 'Maternity', totalBeds: 25, occupiedBeds: 15 },
  { id: 'w6', name: 'Pediatric Ward', branchId: '1', type: 'Pediatric', totalBeds: 20, occupiedBeds: 10 },
  { id: 'w7', name: 'Surgery Recovery', branchId: '1', type: 'Surgery', totalBeds: 15, occupiedBeds: 9 },
];

export const MOCK_BEDS: Bed[] = [
  { id: 'b1', wardId: 'w1', bedNumber: 'GA-001', status: 'Occupied', patientId: 'p1' },
  { id: 'b2', wardId: 'w1', bedNumber: 'GA-002', status: 'Available' },
  { id: 'b3', wardId: 'w1', bedNumber: 'GA-003', status: 'Occupied', patientId: 'p3' },
  { id: 'b4', wardId: 'w1', bedNumber: 'GA-004', status: 'Maintenance' },
  { id: 'b5', wardId: 'w3', bedNumber: 'ICU-001', status: 'Occupied', patientId: 'p2' },
  { id: 'b6', wardId: 'w3', bedNumber: 'ICU-002', status: 'Available' },
  { id: 'b7', wardId: 'w4', bedNumber: 'ER-001', status: 'Available' },
  { id: 'b8', wardId: 'w4', bedNumber: 'ER-002', status: 'Reserved' },
];

export const MOCK_ADMISSIONS: Admission[] = [
  { id: 'a1', patientId: 'p1', patientName: 'John Doe', bedId: 'b1', wardId: 'w1', wardName: 'General Ward A', bedNumber: 'GA-001', admissionDate: '2024-01-10', status: 'Active', doctorId: 'd1', doctorName: 'Dr. Sarah Smith', diagnosis: 'Cardiac Observation', branchId: '1' },
  { id: 'a2', patientId: 'p2', patientName: 'Alice Johnson', bedId: 'b5', wardId: 'w3', wardName: 'ICU', bedNumber: 'ICU-001', admissionDate: '2024-01-12', status: 'Active', doctorId: 'd4', doctorName: 'Dr. Michael Chen', diagnosis: 'Post-operative monitoring', branchId: '1' },
  { id: 'a3', patientId: 'p3', patientName: 'Bob Brown', bedId: 'b3', wardId: 'w1', wardName: 'General Ward A', bedNumber: 'GA-003', admissionDate: '2024-01-08', dischargeDate: '2024-01-14', status: 'Discharged', doctorId: 'd2', doctorName: 'Dr. James Wilson', diagnosis: 'Knee surgery recovery', branchId: '1' },
];

export const MOCK_MEDICINES: Medicine[] = [
  { id: 'm1', name: 'Paracetamol 500mg', genericName: 'Paracetamol', category: 'Pain Relief', manufacturer: 'Panacea Biotech', unitPrice: 0.50, stockQuantity: 5000, reorderLevel: 1000, expiryDate: '2025-06-30', branchId: '1' },
  { id: 'm2', name: 'Amoxicillin 500mg', genericName: 'Amoxicillin', category: 'Antibiotic', manufacturer: 'Sun Pharma', unitPrice: 1.20, stockQuantity: 3000, reorderLevel: 500, expiryDate: '2025-03-15', branchId: '1' },
  { id: 'm3', name: 'Lisinopril 10mg', genericName: 'Lisinopril', category: 'Cardiovascular', manufacturer: 'Cipla', unitPrice: 0.80, stockQuantity: 2000, reorderLevel: 400, expiryDate: '2025-09-20', branchId: '1' },
  { id: 'm4', name: 'Metformin 500mg', genericName: 'Metformin', category: 'Diabetes', manufacturer: 'Biocon', unitPrice: 0.60, stockQuantity: 4000, reorderLevel: 800, expiryDate: '2025-12-01', branchId: '1' },
  { id: 'm5', name: 'Cetirizine 10mg', genericName: 'Cetirizine', category: 'Antihistamine', manufacturer: 'Dr Reddy', unitPrice: 0.40, stockQuantity: 6000, reorderLevel: 1200, expiryDate: '2025-08-10', branchId: '1' },
  { id: 'm6', name: 'Omeprazole 20mg', genericName: 'Omeprazole', category: 'Gastrointestinal', manufacturer: 'Ranbaxy', unitPrice: 0.90, stockQuantity: 2500, reorderLevel: 500, expiryDate: '2025-05-25', branchId: '1' },
  { id: 'm7', name: 'Ibuprofen 400mg', genericName: 'Ibuprofen', category: 'Pain Relief', manufacturer: 'GSK', unitPrice: 0.55, stockQuantity: 800, reorderLevel: 1000, expiryDate: '2025-04-15', branchId: '1' },
  { id: 'm8', name: 'Aspirin 100mg', genericName: 'Aspirin', category: 'Cardiovascular', manufacturer: 'Bayer', unitPrice: 0.30, stockQuantity: 200, reorderLevel: 500, expiryDate: '2024-02-28', branchId: '1' },
];

export const MOCK_LAB_TESTS: LabTest[] = [
  { id: 'lt1', patientId: 'p1', patientName: 'John Doe', doctorId: 'd1', doctorName: 'Dr. Sarah Smith', testType: 'Complete Blood Count (CBC)', requestDate: '2024-01-14', status: 'Completed', result: 'All values within normal range', resultDate: '2024-01-15', priority: 'Normal', branchId: '1' },
  { id: 'lt2', patientId: 'p1', patientName: 'John Doe', doctorId: 'd1', doctorName: 'Dr. Sarah Smith', testType: 'Lipid Panel', requestDate: '2024-01-14', status: 'Processing', priority: 'Normal', branchId: '1' },
  { id: 'lt3', patientId: 'p2', patientName: 'Alice Johnson', doctorId: 'd4', doctorName: 'Dr. Michael Chen', testType: 'MRI Brain', requestDate: '2024-01-13', status: 'Completed', result: 'No abnormalities detected', resultDate: '2024-01-14', priority: 'Urgent', branchId: '1' },
  { id: 'lt4', patientId: 'p3', patientName: 'Bob Brown', doctorId: 'd5', doctorName: 'Dr. Emma Thompson', testType: 'HbA1c', requestDate: '2024-01-15', status: 'Sample Collected', priority: 'Normal', branchId: '3' },
  { id: 'lt5', patientId: 'p4', patientName: 'Sarah Williams', doctorId: 'd3', doctorName: 'Dr. Priya Patel', testType: 'Thyroid Function Test', requestDate: '2024-01-15', status: 'Requested', priority: 'Normal', branchId: '1' },
];

export const MOCK_INVOICES: Invoice[] = [
  {
    id: 'inv1',
    invoiceNumber: 'INV-2024-0001',
    patientId: 'p1',
    patientName: 'John Doe',
    date: '2024-01-14',
    dueDate: '2024-01-28',
    items: [
      { description: 'Cardiology Consultation', quantity: 1, unitPrice: 250, total: 250, category: 'Consultation' },
      { description: 'ECG Test', quantity: 1, unitPrice: 150, total: 150, category: 'Procedure' },
      { description: 'Blood Test - CBC', quantity: 1, unitPrice: 80, total: 80, category: 'Laboratory' },
    ],
    subtotal: 480,
    tax: 48,
    discount: 0,
    total: 528,
    status: 'Pending',
    branchId: '1'
  },
  {
    id: 'inv2',
    invoiceNumber: 'INV-2024-0002',
    patientId: 'p2',
    patientName: 'Alice Johnson',
    date: '2024-01-13',
    dueDate: '2024-01-27',
    items: [
      { description: 'Neurology Consultation', quantity: 1, unitPrice: 300, total: 300, category: 'Consultation' },
      { description: 'MRI Brain Scan', quantity: 1, unitPrice: 850, total: 850, category: 'Procedure' },
      { description: 'ICU Room - 2 days', quantity: 2, unitPrice: 500, total: 1000, category: 'Room' },
    ],
    subtotal: 2150,
    tax: 215,
    discount: 100,
    total: 2265,
    status: 'Paid',
    paymentMethod: 'Insurance',
    branchId: '1'
  },
  {
    id: 'inv3',
    invoiceNumber: 'INV-2024-0003',
    patientId: 'p3',
    patientName: 'Bob Brown',
    date: '2024-01-08',
    dueDate: '2024-01-22',
    items: [
      { description: 'Orthopedic Surgery', quantity: 1, unitPrice: 5000, total: 5000, category: 'Procedure' },
      { description: 'General Ward - 6 days', quantity: 6, unitPrice: 200, total: 1200, category: 'Room' },
      { description: 'Medications', quantity: 1, unitPrice: 350, total: 350, category: 'Medication' },
      { description: 'Post-op Physiotherapy', quantity: 3, unitPrice: 100, total: 300, category: 'Other' },
    ],
    subtotal: 6850,
    tax: 685,
    discount: 500,
    total: 7035,
    status: 'Overdue',
    branchId: '1'
  },
];

export const SPECIALTIES = [
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
];

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
