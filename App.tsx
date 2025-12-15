import React, { useState, useEffect } from 'react';
import {
  Role,
  User,
  Appointment,
  Branch,
  MedicalRecord,
  Doctor,
  Patient,
  Ward,
  Admission,
  Medicine,
  LabTest,
  Invoice,
  ViewType
} from './types';
import { api } from './services/api';
import { SPECIALTIES, APPOINTMENT_TYPES, TEST_TYPES } from './services/mockData';
import { AIAssistant } from './components/AIAssistant';

// Icons as components
const Icons = {
  Dashboard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>,
  Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
  Users: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>,
  User: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>,
  Bed: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>,
  Pill: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>,
  Flask: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
  DollarSign: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  Chart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
  Heart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>,
  Clock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  Plus: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>,
  Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
  Check: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>,
  X: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>,
  FileText: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>,
  AlertTriangle: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>,
};

// Stat Card Component
const StatCard = ({ title, value, icon, trend, color = 'sky' }: { title: string; value: string | number; icon: React.ReactNode; trend?: string; color?: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <div className={`p-2 bg-${color}-50 rounded-lg text-${color}-500`}>{icon}</div>
    </div>
    <div className="flex items-end justify-between">
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      {trend && <span className="text-emerald-500 text-xs font-medium bg-emerald-50 px-2 py-1 rounded">{trend}</span>}
    </div>
  </div>
);

// Modal Component
const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors"><Icons.X /></button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">{children}</div>
      </div>
    </div>
  );
};

// Admin Dashboard
const AdminDashboard = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.branches.list().then(setBranches);
    api.reports.getDashboardStats().then(setStats);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Hospital Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value={stats?.totalPatients || 0} icon={<Icons.Users />} trend="+5.2%" />
        <StatCard title="Active Admissions" value={stats?.activeAdmissions || 0} icon={<Icons.Bed />} />
        <StatCard title="Pending Lab Tests" value={stats?.pendingLabTests || 0} icon={<Icons.Flask />} />
        <StatCard title="Revenue (Total)" value={`$${(stats?.totalRevenue || 0).toLocaleString()}`} icon={<Icons.DollarSign />} trend="+12%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Branch Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
                <tr>
                  <th className="px-6 py-4">Branch Name</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Capacity</th>
                  <th className="px-6 py-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {branches.map(branch => (
                  <tr key={branch.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{branch.name}</td>
                    <td className="px-6 py-4 text-slate-600">{branch.location}</td>
                    <td className="px-6 py-4 text-slate-600">{branch.capacity} Beds</td>
                    <td className="px-6 py-4 text-right">
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Operational</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Quick Alerts</h3>
          </div>
          <div className="p-4 space-y-3">
            {stats?.lowStockMedicines > 0 && (
              <div className="flex items-center p-4 bg-amber-50 border border-amber-100 rounded-lg">
                <Icons.AlertTriangle />
                <span className="ml-3 text-amber-800">{stats.lowStockMedicines} medicines are low on stock</span>
              </div>
            )}
            {stats?.pendingInvoices > 0 && (
              <div className="flex items-center p-4 bg-red-50 border border-red-100 rounded-lg">
                <Icons.DollarSign />
                <span className="ml-3 text-red-800">{stats.pendingInvoices} pending invoices require attention</span>
              </div>
            )}
            <div className="flex items-center p-4 bg-sky-50 border border-sky-100 rounded-lg">
              <Icons.Calendar />
              <span className="ml-3 text-sky-800">{stats?.totalAppointments || 0} appointments scheduled today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Doctor Dashboard
const DoctorDashboard = ({ user }: { user: User }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.appointments.getByDoctorName(user.name).then(data => {
      setAppointments(data);
      setLoading(false);
    });
  }, [user]);

  const handleStatusUpdate = async (id: string, status: Appointment['status']) => {
    await api.appointments.update(id, { status });
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">My Appointments</h2>
        <div className="text-sm text-slate-500">{new Date().toLocaleDateString()}</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Today's Appointments" value={appointments.filter(a => a.status === 'Scheduled').length} icon={<Icons.Calendar />} />
        <StatCard title="Pending Approval" value={appointments.filter(a => a.status === 'Pending').length} icon={<Icons.Clock />} />
        <StatCard title="Completed" value={appointments.filter(a => a.status === 'Completed').length} icon={<Icons.Check />} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Appointment Queue</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading appointments...</div>
          ) : appointments.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No appointments found</div>
          ) : (
            appointments.map(apt => (
              <div key={apt.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-primary font-bold">
                      {apt.patientName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800">{apt.patientName}</h4>
                      <p className="text-sm text-slate-500">{apt.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-slate-500">
                      <span className="flex items-center"><Icons.Calendar /><span className="ml-2">{apt.date}</span></span>
                      <span className="flex items-center mt-1"><Icons.Clock /><span className="ml-2">{apt.time}</span></span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      apt.status === 'Scheduled' ? 'bg-sky-100 text-sky-700' :
                      apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      apt.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {apt.status}
                    </span>
                    {apt.status === 'Pending' && (
                      <div className="flex space-x-2">
                        <button onClick={() => handleStatusUpdate(apt.id, 'Scheduled')} className="p-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200">
                          <Icons.Check />
                        </button>
                        <button onClick={() => handleStatusUpdate(apt.id, 'Cancelled')} className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                          <Icons.X />
                        </button>
                      </div>
                    )}
                    {apt.status === 'Scheduled' && (
                      <button onClick={() => handleStatusUpdate(apt.id, 'Completed')} className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 text-sm">
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Patient Dashboard with Booking
const PatientDashboard = ({ user, onNavigate }: { user: User; onNavigate: (view: ViewType) => void }) => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    api.records.list().then(setRecords);
    api.appointments.list().then(data => {
      setAppointments(data.filter(a => a.status !== 'Completed' && a.status !== 'Cancelled'));
    });
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">My Health Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-xl text-white shadow-lg">
          <h3 className="font-semibold text-lg mb-2">Book an Appointment</h3>
          <p className="text-white/80 text-sm mb-4">Schedule a consultation with our specialists</p>
          <button
            onClick={() => onNavigate('book-appointment')}
            className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            <Icons.Plus />
            <span className="ml-2">Book Now</span>
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-semibold text-slate-800 mb-4">Upcoming Appointments</h3>
          {appointments.length === 0 ? (
            <p className="text-slate-500 text-sm">No upcoming appointments</p>
          ) : (
            <div className="space-y-3">
              {appointments.slice(0, 2).map(apt => (
                <div key={apt.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">{apt.doctorName}</p>
                    <p className="text-sm text-slate-500">{apt.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-800">{apt.date}</p>
                    <p className="text-sm text-slate-500">{apt.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">Medical History</h3>
          <button onClick={() => onNavigate('medical-records')} className="text-primary text-sm font-medium hover:underline">View All</button>
        </div>
        <div className="divide-y divide-slate-100">
          {records.slice(0, 3).map(record => (
            <div key={record.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="font-medium text-slate-800">{record.diagnosis}</h4>
                  <p className="text-sm text-slate-500 mt-1">Prescribed: {record.prescription}</p>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-slate-500">
                    <span className="block text-xs uppercase tracking-wider font-semibold text-slate-400">Doctor</span>
                    {record.doctor}
                  </div>
                  <div className="text-slate-500">
                    <span className="block text-xs uppercase tracking-wider font-semibold text-slate-400">Date</span>
                    {record.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Appointment Booking View
const BookAppointment = ({ onBack }: { onBack: () => void }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [filters, setFilters] = useState({ specialty: '', gender: '' });
  const [booking, setBooking] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api.doctors.list().then(data => {
      setDoctors(data);
      setFilteredDoctors(data);
    });
  }, []);

  useEffect(() => {
    let result = [...doctors];
    if (filters.specialty) result = result.filter(d => d.specialty === filters.specialty);
    if (filters.gender) result = result.filter(d => d.gender === filters.gender);
    setFilteredDoctors(result);
  }, [filters, doctors]);

  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      api.appointments.getAvailableSlots(selectedDoctor.id, selectedDate).then(setAvailableSlots);
    } else {
      setAvailableSlots([]);
    }
    setSelectedSlot('');
  }, [selectedDoctor, selectedDate]);

  const handleBook = async () => {
    if (!selectedDoctor || !selectedDate || !selectedSlot || !appointmentType) return;
    setBooking(true);
    try {
      await api.appointments.create({
        patientId: 'p1',
        patientName: 'John Doe',
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        date: selectedDate,
        time: selectedSlot,
        status: 'Pending',
        type: appointmentType,
        branchId: selectedDoctor.branchId
      });
      setSuccess(true);
    } catch (e) {
      console.error(e);
    }
    setBooking(false);
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto text-center py-12">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icons.Check />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Appointment Requested!</h2>
        <p className="text-slate-600 mb-6">Your appointment with {selectedDoctor?.name} on {selectedDate} at {selectedSlot} has been requested. You will receive a confirmation once approved.</p>
        <button onClick={onBack} className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-sky-600 transition-colors">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        <h2 className="text-2xl font-bold text-slate-800">Book an Appointment</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h3 className="font-semibold text-slate-800 mb-4">Find a Doctor</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Specialty</label>
                <select
                  value={filters.specialty}
                  onChange={e => setFilters(f => ({ ...f, specialty: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Specialties</option>
                  {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Gender Preference</label>
                <select
                  value={filters.gender}
                  onChange={e => setFilters(f => ({ ...f, gender: e.target.value }))}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Any</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>

          {/* Doctor List */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-semibold text-slate-800">Available Doctors ({filteredDoctors.length})</h3>
            </div>
            <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
              {filteredDoctors.map(doctor => (
                <div
                  key={doctor.id}
                  onClick={() => setSelectedDoctor(doctor)}
                  className={`p-4 cursor-pointer transition-colors ${selectedDoctor?.id === doctor.id ? 'bg-sky-50 border-l-4 border-primary' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-center space-x-4">
                    <img src={doctor.avatar} alt={doctor.name} className="w-12 h-12 rounded-full bg-slate-200" />
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{doctor.name}</h4>
                      <p className="text-sm text-slate-500">{doctor.specialty}</p>
                      <p className="text-xs text-slate-400">{doctor.qualifications.join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-slate-800">${doctor.consultationFee}</p>
                      <p className="text-xs text-slate-500">per visit</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 h-fit sticky top-4">
          <h3 className="font-semibold text-slate-800 mb-4">Appointment Details</h3>

          {selectedDoctor ? (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-medium text-slate-800">{selectedDoctor.name}</p>
                    <p className="text-sm text-slate-500">{selectedDoctor.specialty}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {availableSlots.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Available Times</label>
                  <div className="grid grid-cols-3 gap-2">
                    {availableSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-2 px-3 text-sm rounded-lg border transition-colors ${
                          selectedSlot === slot
                            ? 'bg-primary text-white border-primary'
                            : 'border-slate-300 hover:border-primary'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedDate && availableSlots.length === 0 && (
                <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">No available slots on this date</p>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Appointment Type</label>
                <select
                  value={appointmentType}
                  onChange={e => setAppointmentType(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select type...</option>
                  {APPOINTMENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <button
                onClick={handleBook}
                disabled={!selectedDate || !selectedSlot || !appointmentType || booking}
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {booking ? 'Booking...' : 'Request Appointment'}
              </button>
            </div>
          ) : (
            <p className="text-slate-500 text-center py-8">Select a doctor to continue</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Staff Dashboard
const StaffDashboard = ({ onNavigate }: { onNavigate: (view: ViewType) => void }) => {
  const [stats, setStats] = useState<any>(null);
  const [pendingAppointments, setPendingAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    api.reports.getDashboardStats().then(setStats);
    api.appointments.list().then(data => {
      setPendingAppointments(data.filter(a => a.status === 'Pending'));
    });
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Staff Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value={stats?.totalPatients || 0} icon={<Icons.Users />} />
        <StatCard title="Today's Appointments" value={stats?.totalAppointments || 0} icon={<Icons.Calendar />} />
        <StatCard title="Active Admissions" value={stats?.activeAdmissions || 0} icon={<Icons.Bed />} />
        <StatCard title="Pending Tests" value={stats?.pendingLabTests || 0} icon={<Icons.Flask />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
          <h3 className="font-semibold text-slate-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => onNavigate('patients')} className="p-4 bg-sky-50 rounded-lg hover:bg-sky-100 transition-colors text-left">
              <Icons.Users />
              <p className="font-medium text-slate-800 mt-2">Register Patient</p>
              <p className="text-sm text-slate-500">New patient registration</p>
            </button>
            <button onClick={() => onNavigate('appointments')} className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors text-left">
              <Icons.Calendar />
              <p className="font-medium text-slate-800 mt-2">Appointments</p>
              <p className="text-sm text-slate-500">Manage bookings</p>
            </button>
            <button onClick={() => onNavigate('wards')} className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
              <Icons.Bed />
              <p className="font-medium text-slate-800 mt-2">Bed Management</p>
              <p className="text-sm text-slate-500">Ward occupancy</p>
            </button>
            <button onClick={() => onNavigate('billing')} className="p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors text-left">
              <Icons.DollarSign />
              <p className="font-medium text-slate-800 mt-2">Billing</p>
              <p className="text-sm text-slate-500">Process payments</p>
            </button>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-semibold text-slate-800">Pending Appointment Approvals</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {pendingAppointments.length === 0 ? (
              <div className="p-6 text-center text-slate-500">No pending approvals</div>
            ) : (
              pendingAppointments.slice(0, 4).map(apt => (
                <div key={apt.id} className="p-4 hover:bg-slate-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{apt.patientName}</p>
                      <p className="text-sm text-slate-500">{apt.doctorName} - {apt.date}</p>
                    </div>
                    <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs">Pending</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Patient Management View
const PatientManagement = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'Male' as 'Male' | 'Female' | 'Other',
    address: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    bloodGroup: '',
    allergies: '',
    branchId: '1'
  });

  useEffect(() => {
    api.patients.list().then(data => {
      setPatients(data);
      setLoading(false);
    });
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      const data = await api.patients.list();
      setPatients(data);
    } else {
      const data = await api.patients.search(searchQuery);
      setPatients(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient = await api.patients.create({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      address: formData.address,
      emergencyContact: {
        name: formData.emergencyContactName,
        phone: formData.emergencyContactPhone,
        relationship: formData.emergencyContactRelation
      },
      bloodGroup: formData.bloodGroup || undefined,
      allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()) : [],
      branchId: formData.branchId
    });
    setPatients(prev => [...prev, newPatient]);
    setShowModal(false);
    setFormData({
      firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '',
      gender: 'Male', address: '', emergencyContactName: '', emergencyContactPhone: '',
      emergencyContactRelation: '', bloodGroup: '', allergies: '', branchId: '1'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-slate-800">Patient Management</h2>
        <button onClick={() => setShowModal(true)} className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-sky-600 transition-colors">
          <Icons.Plus />
          <span className="ml-2">Register Patient</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Icons.Search />
            <input
              type="text"
              placeholder="Search by name, ID, or email..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button onClick={handleSearch} className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
            Search
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Patient ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">DOB</th>
                <th className="px-6 py-4">Blood Group</th>
                <th className="px-6 py-4">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : patients.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">No patients found</td></tr>
              ) : (
                patients.map(patient => (
                  <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-primary">{patient.globalPatientId}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{patient.firstName} {patient.lastName}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div>{patient.email}</div>
                      <div className="text-sm text-slate-400">{patient.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{patient.dateOfBirth}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-red-50 text-red-700 rounded text-sm">{patient.bloodGroup || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{patient.registeredAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Register New Patient">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label>
              <input type="text" required value={formData.firstName} onChange={e => setFormData(f => ({ ...f, firstName: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label>
              <input type="text" required value={formData.lastName} onChange={e => setFormData(f => ({ ...f, lastName: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
              <input type="email" required value={formData.email} onChange={e => setFormData(f => ({ ...f, email: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
              <input type="tel" required value={formData.phone} onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth *</label>
              <input type="date" required value={formData.dateOfBirth} onChange={e => setFormData(f => ({ ...f, dateOfBirth: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label>
              <select required value={formData.gender} onChange={e => setFormData(f => ({ ...f, gender: e.target.value as any }))} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Address *</label>
            <input type="text" required value={formData.address} onChange={e => setFormData(f => ({ ...f, address: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact *</label>
              <input type="text" required placeholder="Name" value={formData.emergencyContactName} onChange={e => setFormData(f => ({ ...f, emergencyContactName: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
              <input type="tel" required value={formData.emergencyContactPhone} onChange={e => setFormData(f => ({ ...f, emergencyContactPhone: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Relationship *</label>
              <input type="text" required value={formData.emergencyContactRelation} onChange={e => setFormData(f => ({ ...f, emergencyContactRelation: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group</label>
              <select value={formData.bloodGroup} onChange={e => setFormData(f => ({ ...f, bloodGroup: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select...</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Allergies</label>
              <input type="text" placeholder="Comma separated" value={formData.allergies} onChange={e => setFormData(f => ({ ...f, allergies: e.target.value }))} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-sky-600 transition-colors">Register Patient</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

// Ward Management View
const WardManagement = () => {
  const [wards, setWards] = useState<Ward[]>([]);
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.wards.list(), api.admissions.getActive()]).then(([w, a]) => {
      setWards(w);
      setAdmissions(a);
      setLoading(false);
    });
  }, []);

  const handleDischarge = async (id: string) => {
    await api.admissions.discharge(id);
    setAdmissions(prev => prev.filter(a => a.id !== id));
    const updatedWards = await api.wards.list();
    setWards(updatedWards);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Ward & Bed Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-4 text-center py-8 text-slate-500">Loading...</div>
        ) : (
          wards.map(ward => (
            <div key={ward.id} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800">{ward.name}</h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  ward.type === 'ICU' ? 'bg-red-100 text-red-700' :
                  ward.type === 'Emergency' ? 'bg-amber-100 text-amber-700' :
                  'bg-sky-100 text-sky-700'
                }`}>{ward.type}</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-slate-800">{ward.totalBeds - ward.occupiedBeds}</div>
                  <div className="text-sm text-slate-500">Available beds</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-slate-600">{ward.occupiedBeds}/{ward.totalBeds}</div>
                  <div className="w-24 h-2 bg-slate-200 rounded-full mt-1">
                    <div
                      className={`h-2 rounded-full ${ward.occupiedBeds / ward.totalBeds > 0.8 ? 'bg-red-500' : 'bg-emerald-500'}`}
                      style={{ width: `${(ward.occupiedBeds / ward.totalBeds) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800">Active Admissions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Ward / Bed</th>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Diagnosis</th>
                <th className="px-6 py-4">Admitted</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {admissions.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">No active admissions</td></tr>
              ) : (
                admissions.map(admission => (
                  <tr key={admission.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{admission.patientName}</td>
                    <td className="px-6 py-4 text-slate-600">{admission.wardName} - {admission.bedNumber}</td>
                    <td className="px-6 py-4 text-slate-600">{admission.doctorName}</td>
                    <td className="px-6 py-4 text-slate-600">{admission.diagnosis}</td>
                    <td className="px-6 py-4 text-slate-600">{admission.admissionDate}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDischarge(admission.id)}
                        className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 text-sm"
                      >
                        Discharge
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Pharmacy Management View
const PharmacyManagement = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [lowStock, setLowStock] = useState<Medicine[]>([]);
  const [expiring, setExpiring] = useState<Medicine[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.pharmacy.list(),
      api.pharmacy.getLowStock(),
      api.pharmacy.getExpiringSoon(60)
    ]).then(([all, low, exp]) => {
      setMedicines(all);
      setLowStock(low);
      setExpiring(exp);
      setLoading(false);
    });
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      const data = await api.pharmacy.list();
      setMedicines(data);
    } else {
      const data = await api.pharmacy.search(searchQuery);
      setMedicines(data);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Pharmacy & Inventory</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Items" value={medicines.length} icon={<Icons.Pill />} />
        <StatCard title="Low Stock Alerts" value={lowStock.length} icon={<Icons.AlertTriangle />} color="amber" />
        <StatCard title="Expiring Soon" value={expiring.length} icon={<Icons.Clock />} color="red" />
      </div>

      {(lowStock.length > 0 || expiring.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lowStock.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
              <h3 className="font-semibold text-amber-800 mb-4">Low Stock Items</h3>
              <div className="space-y-2">
                {lowStock.map(m => (
                  <div key={m.id} className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="text-slate-800">{m.name}</span>
                    <span className="text-amber-600 font-medium">{m.stockQuantity} left</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {expiring.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-4">Expiring Soon</h3>
              <div className="space-y-2">
                {expiring.map(m => (
                  <div key={m.id} className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="text-slate-800">{m.name}</span>
                    <span className="text-red-600 font-medium">Exp: {m.expiryDate}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search medicines..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="w-full pl-4 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button onClick={handleSearch} className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors">
            Search
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Medicine</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Unit Price</th>
                <th className="px-6 py-4">Expiry</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : (
                medicines.map(medicine => (
                  <tr key={medicine.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{medicine.name}</div>
                      <div className="text-sm text-slate-500">{medicine.genericName}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{medicine.category}</td>
                    <td className="px-6 py-4 text-slate-600">{medicine.stockQuantity}</td>
                    <td className="px-6 py-4 text-slate-600">${medicine.unitPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-slate-600">{medicine.expiryDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        medicine.stockQuantity <= medicine.reorderLevel
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {medicine.stockQuantity <= medicine.reorderLevel ? 'Low Stock' : 'In Stock'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Laboratory Management View
const LaboratoryManagement = () => {
  const [tests, setTests] = useState<LabTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    api.laboratory.list().then(data => {
      setTests(data);
      setLoading(false);
    });
  }, []);

  const filteredTests = filter === 'all'
    ? tests
    : tests.filter(t => t.status === filter);

  const handleStatusUpdate = async (id: string, status: LabTest['status'], result?: string) => {
    await api.laboratory.updateStatus(id, status, result);
    setTests(prev => prev.map(t => t.id === id ? { ...t, status, result } : t));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Laboratory Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Tests" value={tests.length} icon={<Icons.Flask />} />
        <StatCard title="Requested" value={tests.filter(t => t.status === 'Requested').length} icon={<Icons.Clock />} />
        <StatCard title="Processing" value={tests.filter(t => t.status === 'Processing' || t.status === 'Sample Collected').length} icon={<Icons.Flask />} />
        <StatCard title="Completed" value={tests.filter(t => t.status === 'Completed').length} icon={<Icons.Check />} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="flex space-x-2">
          {['all', 'Requested', 'Sample Collected', 'Processing', 'Completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Test Type</th>
                <th className="px-6 py-4">Doctor</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : filteredTests.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-8 text-center text-slate-500">No tests found</td></tr>
              ) : (
                filteredTests.map(test => (
                  <tr key={test.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{test.patientName}</td>
                    <td className="px-6 py-4 text-slate-600">{test.testType}</td>
                    <td className="px-6 py-4 text-slate-600">{test.doctorName}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        test.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                      }`}>{test.priority}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        test.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                        test.status === 'Processing' ? 'bg-sky-100 text-sky-700' :
                        test.status === 'Sample Collected' ? 'bg-purple-100 text-purple-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>{test.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {test.status === 'Requested' && (
                        <button onClick={() => handleStatusUpdate(test.id, 'Sample Collected')} className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200">
                          Collect Sample
                        </button>
                      )}
                      {test.status === 'Sample Collected' && (
                        <button onClick={() => handleStatusUpdate(test.id, 'Processing')} className="px-3 py-1 bg-sky-100 text-sky-700 rounded text-sm hover:bg-sky-200">
                          Start Processing
                        </button>
                      )}
                      {test.status === 'Processing' && (
                        <button onClick={() => handleStatusUpdate(test.id, 'Completed', 'Results within normal range')} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded text-sm hover:bg-emerald-200">
                          Complete
                        </button>
                      )}
                      {test.status === 'Completed' && test.result && (
                        <span className="text-sm text-slate-500">{test.result}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Billing Management View
const BillingManagement = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    api.billing.list().then(data => {
      setInvoices(data);
      setLoading(false);
    });
  }, []);

  const filteredInvoices = filter === 'all'
    ? invoices
    : invoices.filter(i => i.status === filter);

  const handlePayment = async (id: string, method: Invoice['paymentMethod']) => {
    await api.billing.updateStatus(id, 'Paid', method);
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: 'Paid', paymentMethod: method } : i));
  };

  const totalPending = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue').reduce((sum, i) => sum + i.total, 0);
  const totalPaid = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Billing & Invoices</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Invoices" value={invoices.length} icon={<Icons.FileText />} />
        <StatCard title="Pending Amount" value={`$${totalPending.toLocaleString()}`} icon={<Icons.Clock />} color="amber" />
        <StatCard title="Collected" value={`$${totalPaid.toLocaleString()}`} icon={<Icons.DollarSign />} color="emerald" />
        <StatCard title="Overdue" value={invoices.filter(i => i.status === 'Overdue').length} icon={<Icons.AlertTriangle />} color="red" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
        <div className="flex space-x-2">
          {['all', 'Pending', 'Paid', 'Overdue'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-medium">
              <tr>
                <th className="px-6 py-4">Invoice #</th>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : filteredInvoices.length === 0 ? (
                <tr><td colSpan={7} className="px-6 py-8 text-center text-slate-500">No invoices found</td></tr>
              ) : (
                filteredInvoices.map(invoice => (
                  <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm text-primary">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">{invoice.patientName}</td>
                    <td className="px-6 py-4 text-slate-600">{invoice.date}</td>
                    <td className="px-6 py-4 text-slate-600">{invoice.dueDate}</td>
                    <td className="px-6 py-4 font-medium text-slate-800">${invoice.total.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        invoice.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                        invoice.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>{invoice.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {(invoice.status === 'Pending' || invoice.status === 'Overdue') && (
                        <select
                          onChange={(e) => e.target.value && handlePayment(invoice.id, e.target.value as Invoice['paymentMethod'])}
                          className="px-3 py-1 border border-slate-300 rounded text-sm"
                          defaultValue=""
                        >
                          <option value="" disabled>Mark Paid</option>
                          <option value="Cash">Cash</option>
                          <option value="Card">Card</option>
                          <option value="Insurance">Insurance</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                      )}
                      {invoice.status === 'Paid' && (
                        <span className="text-sm text-slate-500">{invoice.paymentMethod}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Login Screen
const LoginScreen = ({ onLogin }: { onLogin: (role: Role) => void }) => {
  const [loading, setLoading] = useState<Role | null>(null);

  const handleLogin = async (role: Role) => {
    setLoading(role);
    try {
      await onLogin(role);
    } catch (e) {
      console.error(e);
      setLoading(null);
    }
  };

  const roleConfig = {
    [Role.ADMIN]: { icon: <Icons.Settings />, desc: 'System administration' },
    [Role.DOCTOR]: { icon: <Icons.User />, desc: 'Medical staff portal' },
    [Role.PATIENT]: { icon: <Icons.Heart />, desc: 'Patient self-service' },
    [Role.STAFF]: { icon: <Icons.Users />, desc: 'Hospital operations' },
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <div className="mx-auto h-14 w-14 bg-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4">
            StG
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">St. George Hospital</h2>
          <p className="mt-2 text-slate-500">Select your portal to continue</p>
        </div>

        <div className="space-y-4">
          {(Object.keys(Role) as Array<keyof typeof Role>).map((key) => (
            <button
              key={key}
              onClick={() => handleLogin(Role[key])}
              disabled={loading !== null}
              className={`w-full group relative flex items-center p-4 border border-slate-200 rounded-xl hover:border-primary hover:shadow-md transition-all ${loading === Role[key] ? 'bg-slate-50' : 'bg-white'}`}
            >
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-sky-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                {roleConfig[Role[key]].icon}
              </div>
              <div className="ml-4 text-left">
                <p className="text-sm font-medium text-slate-900 group-hover:text-primary transition-colors">
                  {key.charAt(0) + key.slice(1).toLowerCase()}
                </p>
                <p className="text-xs text-slate-500">{roleConfig[Role[key]].desc}</p>
              </div>
              {loading === Role[key] && (
                <div className="absolute right-4 animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sidebar Navigation
const Sidebar = ({ user, currentView, onNavigate, onLogout }: { user: User; currentView: ViewType; onNavigate: (view: ViewType) => void; onLogout: () => void }) => {
  const adminNav = [
    { view: 'dashboard' as ViewType, label: 'Dashboard', icon: <Icons.Dashboard /> },
    { view: 'appointments' as ViewType, label: 'Appointments', icon: <Icons.Calendar /> },
    { view: 'patients' as ViewType, label: 'Patients', icon: <Icons.Users /> },
    { view: 'doctors' as ViewType, label: 'Doctors', icon: <Icons.User /> },
    { view: 'wards' as ViewType, label: 'Wards & Beds', icon: <Icons.Bed /> },
    { view: 'pharmacy' as ViewType, label: 'Pharmacy', icon: <Icons.Pill /> },
    { view: 'laboratory' as ViewType, label: 'Laboratory', icon: <Icons.Flask /> },
    { view: 'billing' as ViewType, label: 'Billing', icon: <Icons.DollarSign /> },
    { view: 'reports' as ViewType, label: 'Reports', icon: <Icons.Chart /> },
  ];

  const staffNav = [
    { view: 'dashboard' as ViewType, label: 'Dashboard', icon: <Icons.Dashboard /> },
    { view: 'appointments' as ViewType, label: 'Appointments', icon: <Icons.Calendar /> },
    { view: 'patients' as ViewType, label: 'Patients', icon: <Icons.Users /> },
    { view: 'wards' as ViewType, label: 'Wards & Beds', icon: <Icons.Bed /> },
    { view: 'pharmacy' as ViewType, label: 'Pharmacy', icon: <Icons.Pill /> },
    { view: 'laboratory' as ViewType, label: 'Laboratory', icon: <Icons.Flask /> },
    { view: 'billing' as ViewType, label: 'Billing', icon: <Icons.DollarSign /> },
  ];

  const doctorNav = [
    { view: 'dashboard' as ViewType, label: 'My Appointments', icon: <Icons.Dashboard /> },
    { view: 'patients' as ViewType, label: 'Patients', icon: <Icons.Users /> },
    { view: 'laboratory' as ViewType, label: 'Lab Results', icon: <Icons.Flask /> },
  ];

  const patientNav = [
    { view: 'dashboard' as ViewType, label: 'Dashboard', icon: <Icons.Dashboard /> },
    { view: 'book-appointment' as ViewType, label: 'Book Appointment', icon: <Icons.Calendar /> },
    { view: 'medical-records' as ViewType, label: 'Medical Records', icon: <Icons.FileText /> },
  ];

  const navItems = user.role === Role.ADMIN ? adminNav :
                   user.role === Role.STAFF ? staffNav :
                   user.role === Role.DOCTOR ? doctorNav : patientNav;

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-100">
        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">StG</div>
        <span className="font-bold text-slate-800 text-lg">St. George</span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(item => (
          <button
            key={item.view}
            onClick={() => onNavigate(item.view)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              currentView === item.view
                ? 'bg-sky-50 text-primary'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center space-x-3 mb-4">
          <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full bg-slate-200" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-800 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate capitalize">{user.role.toLowerCase()}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const handleLogin = async (role: Role) => {
    const userData = await api.auth.login(role);
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('dashboard');
  };

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        if (user.role === Role.ADMIN) return <AdminDashboard />;
        if (user.role === Role.DOCTOR) return <DoctorDashboard user={user} />;
        if (user.role === Role.STAFF) return <StaffDashboard onNavigate={handleNavigate} />;
        return <PatientDashboard user={user} onNavigate={handleNavigate} />;
      case 'book-appointment':
        return <BookAppointment onBack={() => handleNavigate('dashboard')} />;
      case 'patients':
        return <PatientManagement />;
      case 'wards':
        return <WardManagement />;
      case 'pharmacy':
        return <PharmacyManagement />;
      case 'laboratory':
        return <LaboratoryManagement />;
      case 'billing':
        return <BillingManagement />;
      case 'appointments':
        return <DoctorDashboard user={user} />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar user={user} currentView={currentView} onNavigate={handleNavigate} onLogout={handleLogout} />

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4">
          <div className="font-bold text-slate-800 text-lg">St. George</div>
          <button onClick={handleLogout} className="text-sm text-red-600">Sign Out</button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </div>
      </main>

      <AIAssistant user={user} />
    </div>
  );
};

export default App;
