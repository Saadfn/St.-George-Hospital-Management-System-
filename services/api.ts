import {
  UserRole,
  AppointmentStatus,
  AdmissionStatus,
  LabTestStatus,
  PrescriptionStatus,
  PaymentStatus,
  PaymentMethod,
  User,
  Branch,
  DoctorProfile,
  StaffProfile,
  PatientProfile,
  Appointment,
  MedicalRecord,
  LabTestType,
  LabTest,
  Medicine,
  Inventory,
  Room,
  Admission,
  Bill,
  Payment,
  Notification,
  DashboardStats,
  SPECIALIZATIONS
} from '../types';
import {
  MOCK_USERS,
  MOCK_BRANCHES,
  MOCK_DOCTOR_PROFILES,
  MOCK_STAFF_PROFILES,
  MOCK_PATIENT_PROFILES,
  MOCK_APPOINTMENTS,
  MOCK_MEDICAL_RECORDS,
  MOCK_LAB_TEST_TYPES,
  MOCK_LAB_TESTS,
  MOCK_MEDICINES,
  MOCK_INVENTORY,
  MOCK_ROOMS,
  MOCK_ADMISSIONS,
  MOCK_BILLS,
  MOCK_PAYMENTS,
  MOCK_NOTIFICATIONS,
  getDoctorWithUser,
  getPatientWithUser
} from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mutable copies of data
let users = [...MOCK_USERS];
let appointments = [...MOCK_APPOINTMENTS];
let patientProfiles = [...MOCK_PATIENT_PROFILES];
let admissions = [...MOCK_ADMISSIONS];
let labTests = [...MOCK_LAB_TESTS];
let bills = [...MOCK_BILLS];
let payments = [...MOCK_PAYMENTS];
let inventory = [...MOCK_INVENTORY];
let rooms = [...MOCK_ROOMS];
let notifications = [...MOCK_NOTIFICATIONS];
let medicalRecords = [...MOCK_MEDICAL_RECORDS];

// Extended doctor type for UI compatibility
export interface DoctorWithDetails extends DoctorProfile {
  user?: User;
  branch?: Branch;
  name?: string;
  email?: string;
  specialty?: string;
  gender?: string;
  qualifications?: string[];
  avatar?: string;
  availability?: { dayOfWeek: number; startTime: string; endTime: string }[];
}

// Extended patient type for UI compatibility
export interface PatientWithDetails extends PatientProfile {
  user?: User;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  globalPatientId?: string;
  registeredAt?: string;
}

// Extended appointment type for UI compatibility
export interface AppointmentWithDetails extends Appointment {
  patientName?: string;
  doctorName?: string;
  date?: string;
  time?: string;
  type?: string;
}

// Extended lab test type for UI compatibility
export interface LabTestWithDetails extends LabTest {
  patientName?: string;
  doctorName?: string;
  testType?: string;
  requestDate?: string;
  resultDate?: string;
  priority?: string;
}

// Extended inventory type for UI compatibility
export interface InventoryWithDetails extends Inventory {
  medicine?: Medicine;
  name?: string;
  genericName?: string;
  category?: string;
  manufacturer?: string;
  unitPrice?: number;
  stockQuantity?: number;
}

// Extended admission type for UI compatibility
export interface AdmissionWithDetails extends Admission {
  patientName?: string;
  doctorName?: string;
  roomNumber?: string;
  roomType?: string;
  wardName?: string;
  bedNumber?: string;
  diagnosis?: string;
}

// Extended bill type for UI compatibility
export interface BillWithDetails extends Bill {
  patientName?: string;
  invoiceNumber?: string;
  date?: string;
  dueDate?: string;
  total?: number;
  status?: string;
}

// Helper to convert doctor profile to UI format
const doctorToUI = (profile: DoctorProfile): DoctorWithDetails => {
  const user = MOCK_USERS.find(u => u.id === profile.userId);
  const branch = MOCK_BRANCHES.find(b => b.id === profile.branchId);
  const dayMap: Record<string, number> = {
    'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
    'Thursday': 4, 'Friday': 5, 'Saturday': 6
  };
  return {
    ...profile,
    user,
    branch,
    name: user?.name,
    email: user?.email,
    specialty: profile.specialization,
    gender: 'Male', // Default, could be extended
    qualifications: ['MBBS', 'MD'],
    avatar: user?.avatar,
    availability: profile.availableDays.map(day => ({
      dayOfWeek: dayMap[day] || 0,
      startTime: profile.startTime,
      endTime: profile.endTime
    }))
  };
};

// Helper to convert patient profile to UI format
const patientToUI = (profile: PatientProfile): PatientWithDetails => {
  const user = MOCK_USERS.find(u => u.id === profile.userId);
  const nameParts = user?.name?.split(' ') || ['', ''];
  return {
    ...profile,
    user,
    firstName: nameParts[0],
    lastName: nameParts.slice(1).join(' '),
    email: user?.email,
    phone: user?.phone,
    globalPatientId: profile.patientId,
    registeredAt: user?.createdAt?.split('T')[0]
  };
};

// Helper to convert appointment to UI format
const appointmentToUI = (apt: Appointment): AppointmentWithDetails => {
  const patient = getPatientWithUser(apt.patientId);
  const doctor = getDoctorWithUser(apt.doctorId);
  const dateTime = new Date(apt.dateTime);
  return {
    ...apt,
    patientName: patient?.user?.name || 'Unknown Patient',
    doctorName: doctor?.user?.name || 'Unknown Doctor',
    date: dateTime.toISOString().split('T')[0],
    time: dateTime.toTimeString().slice(0, 5),
    type: apt.reason
  };
};

// Helper to convert lab test to UI format
const labTestToUI = (test: LabTest): LabTestWithDetails => {
  const patient = getPatientWithUser(test.patientId);
  const doctor = getDoctorWithUser(test.doctorId);
  const testType = MOCK_LAB_TEST_TYPES.find(t => t.id === test.testTypeId);
  return {
    ...test,
    patientName: patient?.user?.name || 'Unknown Patient',
    doctorName: doctor?.user?.name || 'Unknown Doctor',
    testType: testType?.name || 'Unknown Test',
    requestDate: test.orderedAt?.split('T')[0],
    resultDate: test.completedAt?.split('T')[0],
    priority: 'Normal'
  };
};

// Helper to convert inventory to UI format
const inventoryToUI = (inv: Inventory): InventoryWithDetails => {
  const medicine = MOCK_MEDICINES.find(m => m.id === inv.medicineId);
  return {
    ...inv,
    medicine,
    name: medicine?.name,
    genericName: medicine?.genericName,
    category: medicine?.category,
    manufacturer: medicine?.manufacturer,
    unitPrice: medicine?.unitPrice,
    stockQuantity: inv.quantity
  };
};

// Helper to convert admission to UI format
const admissionToUI = (adm: Admission): AdmissionWithDetails => {
  const patient = getPatientWithUser(adm.patientId);
  const doctor = getDoctorWithUser(adm.doctorId);
  const room = MOCK_ROOMS.find(r => r.id === adm.roomId);
  return {
    ...adm,
    patientName: patient?.user?.name || 'Unknown Patient',
    doctorName: doctor?.user?.name || 'Unknown Doctor',
    roomNumber: room?.roomNumber,
    roomType: room?.roomType,
    wardName: room?.roomType,
    bedNumber: room?.roomNumber,
    diagnosis: adm.admissionReason
  };
};

// Helper to convert bill to UI format
const billToUI = (bill: Bill): BillWithDetails => {
  const patient = getPatientWithUser(bill.patientId);
  const createdDate = new Date(bill.createdAt);
  const dueDate = new Date(createdDate);
  dueDate.setDate(dueDate.getDate() + 14);
  return {
    ...bill,
    patientName: patient?.user?.name || 'Unknown Patient',
    invoiceNumber: bill.billNo,
    date: createdDate.toISOString().split('T')[0],
    dueDate: dueDate.toISOString().split('T')[0],
    total: bill.totalAmount,
    status: bill.paymentStatus
  };
};

export const api = {
  auth: {
    login: async (role: UserRole): Promise<User> => {
      await delay(500);
      const user = users.find(u => u.role === role && u.isActive);
      if (!user) throw new Error('User not found');
      return user;
    },
    getUserById: async (id: string): Promise<User | undefined> => {
      await delay(200);
      return users.find(u => u.id === id);
    }
  },

  branches: {
    list: async (): Promise<Branch[]> => {
      await delay(300);
      return MOCK_BRANCHES;
    },
    getById: async (id: string): Promise<Branch | undefined> => {
      await delay(200);
      return MOCK_BRANCHES.find(b => b.id === id);
    }
  },

  doctors: {
    list: async (): Promise<DoctorWithDetails[]> => {
      await delay(300);
      return MOCK_DOCTOR_PROFILES.map(doctorToUI);
    },
    getById: async (id: string): Promise<DoctorWithDetails | undefined> => {
      await delay(200);
      const profile = MOCK_DOCTOR_PROFILES.find(d => d.id === id);
      return profile ? doctorToUI(profile) : undefined;
    },
    getByUserId: async (userId: string): Promise<DoctorWithDetails | undefined> => {
      await delay(200);
      const profile = MOCK_DOCTOR_PROFILES.find(d => d.userId === userId);
      return profile ? doctorToUI(profile) : undefined;
    },
    search: async (filters: { specialty?: string; gender?: string; branchId?: string }): Promise<DoctorWithDetails[]> => {
      await delay(300);
      let result = MOCK_DOCTOR_PROFILES.map(doctorToUI);
      if (filters.specialty) {
        result = result.filter(d => d.specialization === filters.specialty);
      }
      if (filters.gender) {
        result = result.filter(d => d.gender === filters.gender);
      }
      if (filters.branchId) {
        result = result.filter(d => d.branchId === filters.branchId);
      }
      return result;
    }
  },

  patients: {
    list: async (): Promise<PatientWithDetails[]> => {
      await delay(300);
      return patientProfiles.map(patientToUI);
    },
    getById: async (id: string): Promise<PatientWithDetails | undefined> => {
      await delay(200);
      const profile = patientProfiles.find(p => p.id === id);
      return profile ? patientToUI(profile) : undefined;
    },
    getByUserId: async (userId: string): Promise<PatientWithDetails | undefined> => {
      await delay(200);
      const profile = patientProfiles.find(p => p.userId === userId);
      return profile ? patientToUI(profile) : undefined;
    },
    getByGlobalId: async (globalId: string): Promise<PatientWithDetails | undefined> => {
      await delay(200);
      const profile = patientProfiles.find(p => p.patientId === globalId);
      return profile ? patientToUI(profile) : undefined;
    },
    create: async (patient: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      dateOfBirth: string;
      gender: 'Male' | 'Female' | 'Other';
      address: string;
      emergencyContact: { name: string; phone: string; relationship: string };
      bloodGroup?: string;
      allergies?: string[];
      branchId: string;
    }): Promise<PatientWithDetails> => {
      await delay(400);
      const userId = `u${users.length + 1}`;
      const newUser: User = {
        id: userId,
        email: patient.email,
        name: `${patient.firstName} ${patient.lastName}`,
        role: UserRole.PATIENT,
        phone: patient.phone,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${patient.firstName}`
      };
      users.push(newUser);

      const newProfile: PatientProfile = {
        id: `pp${patientProfiles.length + 1}`,
        userId,
        patientId: `STG-${new Date().getFullYear()}-${String(patientProfiles.length + 1).padStart(5, '0')}`,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        bloodGroup: patient.bloodGroup || '',
        address: patient.address,
        emergencyContact: patient.emergencyContact.name,
        emergencyPhone: patient.emergencyContact.phone,
        allergies: patient.allergies || [],
        medicalHistory: ''
      };
      patientProfiles.push(newProfile);
      return patientToUI(newProfile);
    },
    update: async (id: string, data: Partial<PatientProfile>): Promise<PatientWithDetails> => {
      await delay(300);
      const idx = patientProfiles.findIndex(p => p.id === id);
      if (idx === -1) throw new Error('Patient not found');
      patientProfiles[idx] = { ...patientProfiles[idx], ...data };
      return patientToUI(patientProfiles[idx]);
    },
    search: async (query: string): Promise<PatientWithDetails[]> => {
      await delay(300);
      const q = query.toLowerCase();
      return patientProfiles
        .filter(p => {
          const user = MOCK_USERS.find(u => u.id === p.userId);
          return user?.name.toLowerCase().includes(q) ||
            p.patientId.toLowerCase().includes(q) ||
            user?.email.toLowerCase().includes(q);
        })
        .map(patientToUI);
    }
  },

  appointments: {
    list: async (): Promise<AppointmentWithDetails[]> => {
      await delay(400);
      return appointments.map(appointmentToUI);
    },
    getById: async (id: string): Promise<AppointmentWithDetails | undefined> => {
      await delay(200);
      const apt = appointments.find(a => a.id === id);
      return apt ? appointmentToUI(apt) : undefined;
    },
    getByDoctor: async (doctorId: string): Promise<AppointmentWithDetails[]> => {
      await delay(300);
      return appointments.filter(a => a.doctorId === doctorId).map(appointmentToUI);
    },
    getByDoctorName: async (doctorName: string): Promise<AppointmentWithDetails[]> => {
      await delay(300);
      const doctor = MOCK_DOCTOR_PROFILES.find(d => {
        const user = MOCK_USERS.find(u => u.id === d.userId);
        return user?.name === doctorName;
      });
      if (!doctor) return [];
      return appointments.filter(a => a.doctorId === doctor.id).map(appointmentToUI);
    },
    getByPatient: async (patientId: string): Promise<AppointmentWithDetails[]> => {
      await delay(300);
      return appointments.filter(a => a.patientId === patientId).map(appointmentToUI);
    },
    create: async (appointment: Omit<AppointmentWithDetails, 'id' | 'appointmentNo' | 'createdAt'>): Promise<AppointmentWithDetails> => {
      await delay(400);
      const newAppointment: Appointment = {
        id: `apt${appointments.length + 1}`,
        appointmentNo: `APT-${new Date().getFullYear()}-${String(appointments.length + 1).padStart(4, '0')}`,
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        branchId: appointment.branchId,
        dateTime: `${appointment.date}T${appointment.time}:00Z`,
        duration: appointment.duration || 30,
        status: AppointmentStatus.SCHEDULED,
        reason: appointment.type || appointment.reason || '',
        notes: appointment.notes,
        createdAt: new Date().toISOString()
      };
      appointments.push(newAppointment);
      return appointmentToUI(newAppointment);
    },
    update: async (id: string, data: Partial<AppointmentWithDetails>): Promise<AppointmentWithDetails> => {
      await delay(300);
      const idx = appointments.findIndex(a => a.id === id);
      if (idx === -1) throw new Error('Appointment not found');

      // Handle status conversion
      if (data.status) {
        const statusMap: Record<string, AppointmentStatus> = {
          'Scheduled': AppointmentStatus.SCHEDULED,
          'Confirmed': AppointmentStatus.CONFIRMED,
          'In Progress': AppointmentStatus.IN_PROGRESS,
          'Completed': AppointmentStatus.COMPLETED,
          'Cancelled': AppointmentStatus.CANCELLED,
          'No Show': AppointmentStatus.NO_SHOW,
          'Pending': AppointmentStatus.SCHEDULED
        };
        data.status = statusMap[data.status as string] || data.status;
      }

      appointments[idx] = { ...appointments[idx], ...data as Partial<Appointment> };
      return appointmentToUI(appointments[idx]);
    },
    cancel: async (id: string): Promise<void> => {
      await delay(200);
      const idx = appointments.findIndex(a => a.id === id);
      if (idx !== -1) {
        appointments[idx].status = AppointmentStatus.CANCELLED;
      }
    },
    getAvailableSlots: async (doctorId: string, date: string): Promise<string[]> => {
      await delay(300);
      const doctor = MOCK_DOCTOR_PROFILES.find(d => d.id === doctorId);
      if (!doctor) return [];

      const dayOfWeek = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });
      if (!doctor.availableDays.includes(dayOfWeek)) return [];

      const bookedSlots = appointments
        .filter(a => a.doctorId === doctorId && a.dateTime.startsWith(date) && a.status !== AppointmentStatus.CANCELLED)
        .map(a => new Date(a.dateTime).toTimeString().slice(0, 5));

      const slots: string[] = [];
      const start = parseInt(doctor.startTime.split(':')[0]);
      const end = parseInt(doctor.endTime.split(':')[0]);

      for (let h = start; h < end; h++) {
        const time = `${String(h).padStart(2, '0')}:00`;
        if (!bookedSlots.includes(time)) {
          slots.push(time);
        }
        const halfHour = `${String(h).padStart(2, '0')}:30`;
        if (!bookedSlots.includes(halfHour)) {
          slots.push(halfHour);
        }
      }
      return slots;
    }
  },

  records: {
    list: async (): Promise<MedicalRecord[]> => {
      await delay(300);
      return medicalRecords;
    },
    getByPatient: async (patientId: string): Promise<MedicalRecord[]> => {
      await delay(300);
      return medicalRecords.filter(r => r.patientId === patientId);
    },
    getById: async (id: string): Promise<MedicalRecord | undefined> => {
      await delay(200);
      return medicalRecords.find(r => r.id === id);
    }
  },

  rooms: {
    list: async (): Promise<Room[]> => {
      await delay(300);
      return rooms;
    },
    getById: async (id: string): Promise<Room | undefined> => {
      await delay(200);
      return rooms.find(r => r.id === id);
    },
    getByBranch: async (branchId: string): Promise<Room[]> => {
      await delay(300);
      return rooms.filter(r => r.branchId === branchId);
    },
    getAvailable: async (branchId?: string): Promise<Room[]> => {
      await delay(300);
      let result = rooms.filter(r => r.isAvailable);
      if (branchId) {
        result = result.filter(r => r.branchId === branchId);
      }
      return result;
    },
    updateAvailability: async (id: string, isAvailable: boolean): Promise<Room> => {
      await delay(200);
      const idx = rooms.findIndex(r => r.id === id);
      if (idx === -1) throw new Error('Room not found');
      rooms[idx] = { ...rooms[idx], isAvailable };
      return rooms[idx];
    }
  },

  // Ward management (using rooms grouped by type)
  wards: {
    list: async (): Promise<{ id: string; name: string; branchId: string; type: string; totalBeds: number; occupiedBeds: number }[]> => {
      await delay(300);
      const wardTypes = [...new Set(rooms.map(r => r.roomType))];
      return wardTypes.map((type, index) => {
        const roomsOfType = rooms.filter(r => r.roomType === type);
        return {
          id: `w${index + 1}`,
          name: `${type} Ward`,
          branchId: 'b1',
          type,
          totalBeds: roomsOfType.reduce((sum, r) => sum + r.capacity, 0),
          occupiedBeds: roomsOfType.filter(r => !r.isAvailable).reduce((sum, r) => sum + r.capacity, 0)
        };
      });
    },
    getById: async (id: string): Promise<{ id: string; name: string; branchId: string; type: string; totalBeds: number; occupiedBeds: number } | undefined> => {
      await delay(200);
      const wards = await api.wards.list();
      return wards.find(w => w.id === id);
    },
    getByBranch: async (branchId: string): Promise<{ id: string; name: string; branchId: string; type: string; totalBeds: number; occupiedBeds: number }[]> => {
      await delay(300);
      const wards = await api.wards.list();
      return wards.filter(w => w.branchId === branchId);
    }
  },

  // Beds (simplified to rooms)
  beds: {
    list: async (): Promise<Room[]> => {
      await delay(300);
      return rooms;
    },
    getByWard: async (wardType: string): Promise<Room[]> => {
      await delay(300);
      return rooms.filter(r => r.roomType === wardType);
    },
    getAvailable: async (wardType?: string): Promise<Room[]> => {
      await delay(300);
      let result = rooms.filter(r => r.isAvailable);
      if (wardType) {
        result = result.filter(r => r.roomType === wardType);
      }
      return result;
    },
    updateStatus: async (id: string, status: string, patientId?: string): Promise<Room> => {
      await delay(200);
      const idx = rooms.findIndex(r => r.id === id);
      if (idx === -1) throw new Error('Room not found');
      rooms[idx] = { ...rooms[idx], isAvailable: status === 'Available' };
      return rooms[idx];
    }
  },

  admissions: {
    list: async (): Promise<AdmissionWithDetails[]> => {
      await delay(300);
      return admissions.map(admissionToUI);
    },
    getActive: async (): Promise<AdmissionWithDetails[]> => {
      await delay(300);
      return admissions.filter(a => a.status === AdmissionStatus.ADMITTED).map(admissionToUI);
    },
    getByPatient: async (patientId: string): Promise<AdmissionWithDetails[]> => {
      await delay(300);
      return admissions.filter(a => a.patientId === patientId).map(admissionToUI);
    },
    create: async (admission: Omit<Admission, 'id' | 'admissionNo'>): Promise<AdmissionWithDetails> => {
      await delay(400);
      const newAdmission: Admission = {
        ...admission,
        id: `adm${admissions.length + 1}`,
        admissionNo: `ADM-${new Date().getFullYear()}-${String(admissions.length + 1).padStart(4, '0')}`
      };
      admissions.push(newAdmission);

      // Mark room as unavailable
      const roomIdx = rooms.findIndex(r => r.id === admission.roomId);
      if (roomIdx !== -1) {
        rooms[roomIdx] = { ...rooms[roomIdx], isAvailable: false };
      }

      return admissionToUI(newAdmission);
    },
    discharge: async (id: string): Promise<AdmissionWithDetails> => {
      await delay(300);
      const idx = admissions.findIndex(a => a.id === id);
      if (idx === -1) throw new Error('Admission not found');

      admissions[idx] = {
        ...admissions[idx],
        status: AdmissionStatus.DISCHARGED,
        dischargeDate: new Date().toISOString()
      };

      // Mark room as available
      const roomIdx = rooms.findIndex(r => r.id === admissions[idx].roomId);
      if (roomIdx !== -1) {
        rooms[roomIdx] = { ...rooms[roomIdx], isAvailable: true };
      }

      return admissionToUI(admissions[idx]);
    }
  },

  pharmacy: {
    list: async (): Promise<InventoryWithDetails[]> => {
      await delay(300);
      return inventory.map(inventoryToUI);
    },
    getById: async (id: string): Promise<InventoryWithDetails | undefined> => {
      await delay(200);
      const inv = inventory.find(i => i.id === id);
      return inv ? inventoryToUI(inv) : undefined;
    },
    getLowStock: async (): Promise<InventoryWithDetails[]> => {
      await delay(300);
      return inventory.filter(i => i.quantity <= i.reorderLevel).map(inventoryToUI);
    },
    getExpiringSoon: async (days: number = 30): Promise<InventoryWithDetails[]> => {
      await delay(300);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() + days);
      return inventory.filter(i => new Date(i.expiryDate) <= cutoff).map(inventoryToUI);
    },
    updateStock: async (id: string, quantity: number): Promise<InventoryWithDetails> => {
      await delay(200);
      const idx = inventory.findIndex(i => i.id === id);
      if (idx === -1) throw new Error('Inventory item not found');
      inventory[idx] = { ...inventory[idx], quantity, lastUpdated: new Date().toISOString() };
      return inventoryToUI(inventory[idx]);
    },
    search: async (query: string): Promise<InventoryWithDetails[]> => {
      await delay(300);
      const q = query.toLowerCase();
      return inventory
        .filter(i => {
          const medicine = MOCK_MEDICINES.find(m => m.id === i.medicineId);
          return medicine?.name.toLowerCase().includes(q) ||
            medicine?.genericName.toLowerCase().includes(q) ||
            medicine?.category.toLowerCase().includes(q);
        })
        .map(inventoryToUI);
    }
  },

  laboratory: {
    list: async (): Promise<LabTestWithDetails[]> => {
      await delay(300);
      return labTests.map(labTestToUI);
    },
    getTestTypes: async (): Promise<LabTestType[]> => {
      await delay(200);
      return MOCK_LAB_TEST_TYPES;
    },
    getByPatient: async (patientId: string): Promise<LabTestWithDetails[]> => {
      await delay(300);
      return labTests.filter(t => t.patientId === patientId).map(labTestToUI);
    },
    getByDoctor: async (doctorId: string): Promise<LabTestWithDetails[]> => {
      await delay(300);
      return labTests.filter(t => t.doctorId === doctorId).map(labTestToUI);
    },
    getPending: async (): Promise<LabTestWithDetails[]> => {
      await delay(300);
      return labTests.filter(t => t.status !== LabTestStatus.COMPLETED).map(labTestToUI);
    },
    create: async (test: Omit<LabTest, 'id' | 'testNo' | 'orderedAt'>): Promise<LabTestWithDetails> => {
      await delay(400);
      const newTest: LabTest = {
        ...test,
        id: `lt${labTests.length + 1}`,
        testNo: `LT-${new Date().getFullYear()}-${String(labTests.length + 1).padStart(4, '0')}`,
        orderedAt: new Date().toISOString()
      };
      labTests.push(newTest);
      return labTestToUI(newTest);
    },
    updateStatus: async (id: string, status: string, result?: string): Promise<LabTestWithDetails> => {
      await delay(300);
      const idx = labTests.findIndex(t => t.id === id);
      if (idx === -1) throw new Error('Test not found');

      const statusMap: Record<string, LabTestStatus> = {
        'Requested': LabTestStatus.ORDERED,
        'Ordered': LabTestStatus.ORDERED,
        'Sample Collected': LabTestStatus.SAMPLE_COLLECTED,
        'Processing': LabTestStatus.PROCESSING,
        'Completed': LabTestStatus.COMPLETED,
        'Cancelled': LabTestStatus.CANCELLED
      };

      labTests[idx] = {
        ...labTests[idx],
        status: statusMap[status] || status as LabTestStatus,
        result,
        completedAt: status === 'Completed' ? new Date().toISOString() : undefined
      };
      return labTestToUI(labTests[idx]);
    }
  },

  billing: {
    list: async (): Promise<BillWithDetails[]> => {
      await delay(300);
      return bills.map(billToUI);
    },
    getById: async (id: string): Promise<BillWithDetails | undefined> => {
      await delay(200);
      const bill = bills.find(b => b.id === id);
      return bill ? billToUI(bill) : undefined;
    },
    getByPatient: async (patientId: string): Promise<BillWithDetails[]> => {
      await delay(300);
      return bills.filter(b => b.patientId === patientId).map(billToUI);
    },
    getPending: async (): Promise<BillWithDetails[]> => {
      await delay(300);
      return bills.filter(b => b.paymentStatus === PaymentStatus.PENDING || b.paymentStatus === PaymentStatus.OVERDUE).map(billToUI);
    },
    create: async (bill: Omit<Bill, 'id' | 'billNo' | 'createdAt'>): Promise<BillWithDetails> => {
      await delay(400);
      const newBill: Bill = {
        ...bill,
        id: `bill${bills.length + 1}`,
        billNo: `INV-${new Date().getFullYear()}-${String(bills.length + 1).padStart(4, '0')}`,
        createdAt: new Date().toISOString()
      };
      bills.push(newBill);
      return billToUI(newBill);
    },
    updateStatus: async (id: string, status: string, paymentMethod?: string): Promise<BillWithDetails> => {
      await delay(300);
      const idx = bills.findIndex(b => b.id === id);
      if (idx === -1) throw new Error('Bill not found');

      const statusMap: Record<string, PaymentStatus> = {
        'Pending': PaymentStatus.PENDING,
        'Partial': PaymentStatus.PARTIAL,
        'Paid': PaymentStatus.PAID,
        'Overdue': PaymentStatus.OVERDUE,
        'Cancelled': PaymentStatus.CANCELLED
      };

      const methodMap: Record<string, PaymentMethod> = {
        'Cash': PaymentMethod.CASH,
        'Card': PaymentMethod.CARD,
        'Insurance': PaymentMethod.INSURANCE,
        'Bank Transfer': PaymentMethod.BANK_TRANSFER
      };

      bills[idx] = {
        ...bills[idx],
        paymentStatus: statusMap[status] || status as PaymentStatus,
        paidAt: status === 'Paid' ? new Date().toISOString() : undefined
      };

      // Create payment record if paid
      if (status === 'Paid' && paymentMethod) {
        const newPayment: Payment = {
          id: `pay${payments.length + 1}`,
          billId: id,
          receiptNo: `RCP-${new Date().getFullYear()}-${String(payments.length + 1).padStart(4, '0')}`,
          amount: bills[idx].totalAmount,
          method: methodMap[paymentMethod] || PaymentMethod.CASH,
          paidAt: new Date().toISOString()
        };
        payments.push(newPayment);
      }

      return billToUI(bills[idx]);
    }
  },

  notifications: {
    list: async (userId: string): Promise<Notification[]> => {
      await delay(300);
      return notifications.filter(n => n.userId === userId);
    },
    markAsRead: async (id: string): Promise<Notification> => {
      await delay(200);
      const idx = notifications.findIndex(n => n.id === id);
      if (idx === -1) throw new Error('Notification not found');
      notifications[idx] = { ...notifications[idx], isRead: true };
      return notifications[idx];
    },
    getUnreadCount: async (userId: string): Promise<number> => {
      await delay(100);
      return notifications.filter(n => n.userId === userId && !n.isRead).length;
    }
  },

  reports: {
    getDashboardStats: async (): Promise<DashboardStats> => {
      await delay(500);
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      const doctorCount = MOCK_DOCTOR_PROFILES.length;
      const staffCount = MOCK_STAFF_PROFILES.length;
      const patientCount = patientProfiles.length;

      const todayAppointments = appointments.filter(a => {
        const aptDate = new Date(a.dateTime);
        return aptDate >= todayStart && aptDate <= todayEnd;
      }).length;

      const pendingAppointments = appointments.filter(
        a => a.status === AppointmentStatus.SCHEDULED || a.status === AppointmentStatus.CONFIRMED
      ).length;

      const activeAdmissions = admissions.filter(a => a.status === AdmissionStatus.ADMITTED).length;
      const availableBeds = rooms.filter(r => r.isAvailable).reduce((sum, r) => sum + r.capacity, 0);
      const pendingLabTests = labTests.filter(t => t.status !== LabTestStatus.COMPLETED && t.status !== LabTestStatus.CANCELLED).length;
      const lowStockItems = inventory.filter(i => i.quantity <= i.reorderLevel).length;
      const pendingBills = bills.filter(b => b.paymentStatus === PaymentStatus.PENDING || b.paymentStatus === PaymentStatus.OVERDUE).length;

      const todayRevenue = bills
        .filter(b => {
          if (!b.paidAt) return false;
          const paidDate = new Date(b.paidAt);
          return paidDate >= todayStart && paidDate <= todayEnd;
        })
        .reduce((sum, b) => sum + b.totalAmount, 0);

      const monthStart = new Date();
      monthStart.setDate(1);
      monthStart.setHours(0, 0, 0, 0);

      const monthlyRevenue = bills
        .filter(b => {
          if (!b.paidAt) return false;
          const paidDate = new Date(b.paidAt);
          return paidDate >= monthStart;
        })
        .reduce((sum, b) => sum + b.totalAmount, 0);

      return {
        totalPatients: patientCount,
        totalDoctors: doctorCount,
        totalStaff: staffCount,
        todayAppointments,
        pendingAppointments,
        activeAdmissions,
        availableBeds,
        pendingLabTests,
        lowStockItems,
        pendingBills,
        todayRevenue,
        monthlyRevenue
      };
    },
    getAppointmentsByDate: async (startDate: string, endDate: string): Promise<AppointmentWithDetails[]> => {
      await delay(300);
      return appointments
        .filter(a => {
          const aptDate = a.dateTime.split('T')[0];
          return aptDate >= startDate && aptDate <= endDate;
        })
        .map(appointmentToUI);
    },
    getRevenueByPeriod: async (startDate: string, endDate: string): Promise<{ date: string; amount: number }[]> => {
      await delay(400);
      const result: { date: string; amount: number }[] = [];
      const filtered = bills.filter(b => {
        if (b.paymentStatus !== PaymentStatus.PAID || !b.paidAt) return false;
        const paidDate = b.paidAt.split('T')[0];
        return paidDate >= startDate && paidDate <= endDate;
      });

      const grouped = filtered.reduce((acc, bill) => {
        const date = bill.paidAt!.split('T')[0];
        acc[date] = (acc[date] || 0) + bill.totalAmount;
        return acc;
      }, {} as Record<string, number>);

      Object.entries(grouped).forEach(([date, amount]) => {
        result.push({ date, amount });
      });

      return result.sort((a, b) => a.date.localeCompare(b.date));
    }
  }
};
