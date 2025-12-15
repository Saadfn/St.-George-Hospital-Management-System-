import {
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
  Invoice,
  Role
} from '../types';
import {
  MOCK_USERS,
  MOCK_DOCTORS,
  MOCK_PATIENTS,
  MOCK_APPOINTMENTS,
  MOCK_BRANCHES,
  MOCK_RECORDS,
  MOCK_WARDS,
  MOCK_BEDS,
  MOCK_ADMISSIONS,
  MOCK_MEDICINES,
  MOCK_LAB_TESTS,
  MOCK_INVOICES
} from './mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let appointments = [...MOCK_APPOINTMENTS];
let patients = [...MOCK_PATIENTS];
let admissions = [...MOCK_ADMISSIONS];
let labTests = [...MOCK_LAB_TESTS];
let invoices = [...MOCK_INVOICES];
let medicines = [...MOCK_MEDICINES];
let beds = [...MOCK_BEDS];

export const api = {
  auth: {
    login: async (role: Role): Promise<User> => {
      await delay(500);
      const user = MOCK_USERS.find(u => u.role === role);
      if (!user) throw new Error('User not found');
      return user;
    }
  },

  doctors: {
    list: async (): Promise<Doctor[]> => {
      await delay(300);
      return MOCK_DOCTORS;
    },
    getById: async (id: string): Promise<Doctor | undefined> => {
      await delay(200);
      return MOCK_DOCTORS.find(d => d.id === id);
    },
    search: async (filters: { specialty?: string; gender?: string; branchId?: string }): Promise<Doctor[]> => {
      await delay(300);
      let result = [...MOCK_DOCTORS];
      if (filters.specialty) {
        result = result.filter(d => d.specialty === filters.specialty);
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
    list: async (): Promise<Patient[]> => {
      await delay(300);
      return patients;
    },
    getById: async (id: string): Promise<Patient | undefined> => {
      await delay(200);
      return patients.find(p => p.id === id);
    },
    getByGlobalId: async (globalId: string): Promise<Patient | undefined> => {
      await delay(200);
      return patients.find(p => p.globalPatientId === globalId);
    },
    create: async (patient: Omit<Patient, 'id' | 'globalPatientId' | 'registeredAt'>): Promise<Patient> => {
      await delay(400);
      const newPatient: Patient = {
        ...patient,
        id: `p${patients.length + 1}`,
        globalPatientId: `STG-${new Date().getFullYear()}-${String(patients.length + 1).padStart(5, '0')}`,
        registeredAt: new Date().toISOString().split('T')[0]
      };
      patients.push(newPatient);
      return newPatient;
    },
    update: async (id: string, data: Partial<Patient>): Promise<Patient> => {
      await delay(300);
      const idx = patients.findIndex(p => p.id === id);
      if (idx === -1) throw new Error('Patient not found');
      patients[idx] = { ...patients[idx], ...data };
      return patients[idx];
    },
    search: async (query: string): Promise<Patient[]> => {
      await delay(300);
      const q = query.toLowerCase();
      return patients.filter(p =>
        p.firstName.toLowerCase().includes(q) ||
        p.lastName.toLowerCase().includes(q) ||
        p.globalPatientId.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q)
      );
    }
  },

  appointments: {
    list: async (): Promise<Appointment[]> => {
      await delay(400);
      return appointments;
    },
    getByDoctor: async (doctorId: string): Promise<Appointment[]> => {
      await delay(300);
      return appointments.filter(a => a.doctorId === doctorId);
    },
    getByDoctorName: async (doctorName: string): Promise<Appointment[]> => {
      await delay(300);
      return appointments.filter(a => a.doctorName === doctorName);
    },
    getByPatient: async (patientId: string): Promise<Appointment[]> => {
      await delay(300);
      return appointments.filter(a => a.patientId === patientId);
    },
    create: async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
      await delay(400);
      const newAppointment: Appointment = {
        ...appointment,
        id: `${Date.now()}`
      };
      appointments.push(newAppointment);
      return newAppointment;
    },
    update: async (id: string, data: Partial<Appointment>): Promise<Appointment> => {
      await delay(300);
      const idx = appointments.findIndex(a => a.id === id);
      if (idx === -1) throw new Error('Appointment not found');
      appointments[idx] = { ...appointments[idx], ...data };
      return appointments[idx];
    },
    cancel: async (id: string): Promise<void> => {
      await delay(200);
      const idx = appointments.findIndex(a => a.id === id);
      if (idx !== -1) {
        appointments[idx].status = 'Cancelled';
      }
    },
    getAvailableSlots: async (doctorId: string, date: string): Promise<string[]> => {
      await delay(300);
      const doctor = MOCK_DOCTORS.find(d => d.id === doctorId);
      if (!doctor) return [];

      const dayOfWeek = new Date(date).getDay();
      const availability = doctor.availability.find(a => a.dayOfWeek === dayOfWeek);
      if (!availability) return [];

      const bookedSlots = appointments
        .filter(a => a.doctorId === doctorId && a.date === date && a.status !== 'Cancelled')
        .map(a => a.time);

      const slots: string[] = [];
      const start = parseInt(availability.startTime.split(':')[0]);
      const end = parseInt(availability.endTime.split(':')[0]);

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
      return MOCK_RECORDS;
    },
    getByPatient: async (patientId: string): Promise<MedicalRecord[]> => {
      await delay(300);
      return MOCK_RECORDS.filter(r => r.patientId === patientId);
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

  wards: {
    list: async (): Promise<Ward[]> => {
      await delay(300);
      return MOCK_WARDS;
    },
    getById: async (id: string): Promise<Ward | undefined> => {
      await delay(200);
      return MOCK_WARDS.find(w => w.id === id);
    },
    getByBranch: async (branchId: string): Promise<Ward[]> => {
      await delay(300);
      return MOCK_WARDS.filter(w => w.branchId === branchId);
    }
  },

  beds: {
    list: async (): Promise<Bed[]> => {
      await delay(300);
      return beds;
    },
    getByWard: async (wardId: string): Promise<Bed[]> => {
      await delay(300);
      return beds.filter(b => b.wardId === wardId);
    },
    getAvailable: async (wardId?: string): Promise<Bed[]> => {
      await delay(300);
      let result = beds.filter(b => b.status === 'Available');
      if (wardId) {
        result = result.filter(b => b.wardId === wardId);
      }
      return result;
    },
    updateStatus: async (id: string, status: Bed['status'], patientId?: string): Promise<Bed> => {
      await delay(200);
      const idx = beds.findIndex(b => b.id === id);
      if (idx === -1) throw new Error('Bed not found');
      beds[idx] = { ...beds[idx], status, patientId };
      return beds[idx];
    }
  },

  admissions: {
    list: async (): Promise<Admission[]> => {
      await delay(300);
      return admissions;
    },
    getActive: async (): Promise<Admission[]> => {
      await delay(300);
      return admissions.filter(a => a.status === 'Active');
    },
    getByPatient: async (patientId: string): Promise<Admission[]> => {
      await delay(300);
      return admissions.filter(a => a.patientId === patientId);
    },
    create: async (admission: Omit<Admission, 'id'>): Promise<Admission> => {
      await delay(400);
      const newAdmission: Admission = {
        ...admission,
        id: `a${admissions.length + 1}`
      };
      admissions.push(newAdmission);
      return newAdmission;
    },
    discharge: async (id: string): Promise<Admission> => {
      await delay(300);
      const idx = admissions.findIndex(a => a.id === id);
      if (idx === -1) throw new Error('Admission not found');
      admissions[idx] = {
        ...admissions[idx],
        status: 'Discharged',
        dischargeDate: new Date().toISOString().split('T')[0]
      };
      const bedIdx = beds.findIndex(b => b.id === admissions[idx].bedId);
      if (bedIdx !== -1) {
        beds[bedIdx] = { ...beds[bedIdx], status: 'Available', patientId: undefined };
      }
      return admissions[idx];
    }
  },

  pharmacy: {
    list: async (): Promise<Medicine[]> => {
      await delay(300);
      return medicines;
    },
    getById: async (id: string): Promise<Medicine | undefined> => {
      await delay(200);
      return medicines.find(m => m.id === id);
    },
    getLowStock: async (): Promise<Medicine[]> => {
      await delay(300);
      return medicines.filter(m => m.stockQuantity <= m.reorderLevel);
    },
    getExpiringSoon: async (days: number = 30): Promise<Medicine[]> => {
      await delay(300);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() + days);
      return medicines.filter(m => new Date(m.expiryDate) <= cutoff);
    },
    updateStock: async (id: string, quantity: number): Promise<Medicine> => {
      await delay(200);
      const idx = medicines.findIndex(m => m.id === id);
      if (idx === -1) throw new Error('Medicine not found');
      medicines[idx] = { ...medicines[idx], stockQuantity: quantity };
      return medicines[idx];
    },
    search: async (query: string): Promise<Medicine[]> => {
      await delay(300);
      const q = query.toLowerCase();
      return medicines.filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.genericName.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q)
      );
    }
  },

  laboratory: {
    list: async (): Promise<LabTest[]> => {
      await delay(300);
      return labTests;
    },
    getByPatient: async (patientId: string): Promise<LabTest[]> => {
      await delay(300);
      return labTests.filter(t => t.patientId === patientId);
    },
    getByDoctor: async (doctorId: string): Promise<LabTest[]> => {
      await delay(300);
      return labTests.filter(t => t.doctorId === doctorId);
    },
    getPending: async (): Promise<LabTest[]> => {
      await delay(300);
      return labTests.filter(t => t.status !== 'Completed');
    },
    create: async (test: Omit<LabTest, 'id'>): Promise<LabTest> => {
      await delay(400);
      const newTest: LabTest = {
        ...test,
        id: `lt${labTests.length + 1}`
      };
      labTests.push(newTest);
      return newTest;
    },
    updateStatus: async (id: string, status: LabTest['status'], result?: string): Promise<LabTest> => {
      await delay(300);
      const idx = labTests.findIndex(t => t.id === id);
      if (idx === -1) throw new Error('Test not found');
      labTests[idx] = {
        ...labTests[idx],
        status,
        result,
        resultDate: status === 'Completed' ? new Date().toISOString().split('T')[0] : undefined
      };
      return labTests[idx];
    }
  },

  billing: {
    list: async (): Promise<Invoice[]> => {
      await delay(300);
      return invoices;
    },
    getById: async (id: string): Promise<Invoice | undefined> => {
      await delay(200);
      return invoices.find(i => i.id === id);
    },
    getByPatient: async (patientId: string): Promise<Invoice[]> => {
      await delay(300);
      return invoices.filter(i => i.patientId === patientId);
    },
    getPending: async (): Promise<Invoice[]> => {
      await delay(300);
      return invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue');
    },
    create: async (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>): Promise<Invoice> => {
      await delay(400);
      const newInvoice: Invoice = {
        ...invoice,
        id: `inv${invoices.length + 1}`,
        invoiceNumber: `INV-${new Date().getFullYear()}-${String(invoices.length + 1).padStart(4, '0')}`
      };
      invoices.push(newInvoice);
      return newInvoice;
    },
    updateStatus: async (id: string, status: Invoice['status'], paymentMethod?: Invoice['paymentMethod']): Promise<Invoice> => {
      await delay(300);
      const idx = invoices.findIndex(i => i.id === id);
      if (idx === -1) throw new Error('Invoice not found');
      invoices[idx] = { ...invoices[idx], status, paymentMethod };
      return invoices[idx];
    }
  },

  reports: {
    getDashboardStats: async (): Promise<{
      totalPatients: number;
      totalAppointments: number;
      activeAdmissions: number;
      pendingLabTests: number;
      lowStockMedicines: number;
      pendingInvoices: number;
      totalRevenue: number;
    }> => {
      await delay(500);
      return {
        totalPatients: patients.length,
        totalAppointments: appointments.filter(a => a.status === 'Scheduled').length,
        activeAdmissions: admissions.filter(a => a.status === 'Active').length,
        pendingLabTests: labTests.filter(t => t.status !== 'Completed').length,
        lowStockMedicines: medicines.filter(m => m.stockQuantity <= m.reorderLevel).length,
        pendingInvoices: invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').length,
        totalRevenue: invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.total, 0)
      };
    },
    getAppointmentsByDate: async (startDate: string, endDate: string): Promise<Appointment[]> => {
      await delay(300);
      return appointments.filter(a => a.date >= startDate && a.date <= endDate);
    },
    getRevenueByPeriod: async (startDate: string, endDate: string): Promise<{ date: string; amount: number }[]> => {
      await delay(400);
      const result: { date: string; amount: number }[] = [];
      const filtered = invoices.filter(i => i.status === 'Paid' && i.date >= startDate && i.date <= endDate);
      const grouped = filtered.reduce((acc, inv) => {
        acc[inv.date] = (acc[inv.date] || 0) + inv.total;
        return acc;
      }, {} as Record<string, number>);
      Object.entries(grouped).forEach(([date, amount]) => {
        result.push({ date, amount });
      });
      return result.sort((a, b) => a.date.localeCompare(b.date));
    }
  }
};
