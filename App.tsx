import React, { useState, useEffect } from 'react';
import { Role, User, Appointment, Branch, MedicalRecord } from './types';
import { api } from './services/api';
import { AIAssistant } from './components/AIAssistant';

// --- Sub-components for Views ---

const StatCard = ({ title, value, icon, trend }: { title: string, value: string | number, icon: any, trend?: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
      <div className="p-2 bg-sky-50 rounded-lg text-primary">{icon}</div>
    </div>
    <div className="flex items-end justify-between">
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      {trend && <span className="text-emerald-500 text-xs font-medium bg-emerald-50 px-2 py-1 rounded">{trend}</span>}
    </div>
  </div>
);

const AdminDashboard = ({ user }: { user: User }) => {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    api.branches.list().then(setBranches);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Hospital Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Patients" 
          value="12,405" 
          trend="+5.2%"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>} 
        />
        <StatCard 
          title="Available Beds" 
          value="142" 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m8-2a2 2 0 100-4 2 2 0 000 4"></path></svg>} 
        />
        <StatCard 
          title="Active Doctors" 
          value="84" 
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>} 
        />
        <StatCard 
          title="Revenue (Mo)" 
          value="$2.4M" 
          trend="+12%"
          icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} 
        />
      </div>

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
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {branches.map(branch => (
                <tr key={branch.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-800">{branch.name}</td>
                  <td className="px-6 py-4 text-slate-600">{branch.location}</td>
                  <td className="px-6 py-4 text-slate-600">{branch.capacity} Beds</td>
                  <td className="px-6 py-4 text-slate-600">{branch.contact}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Operational</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const DoctorDashboard = ({ user }: { user: User }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    api.appointments.getByDoctor(user.name).then(setAppointments);
  }, [user]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">My Appointments</h2>
        <div className="text-sm text-slate-500">{new Date().toLocaleDateString()}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {appointments.map(apt => (
            <div key={apt.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:border-primary/30 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-primary font-bold">
                    {apt.patientName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{apt.patientName}</h3>
                    <p className="text-sm text-slate-500">{apt.type}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium 
                  ${apt.status === 'Scheduled' ? 'bg-sky-100 text-primary' : 
                    apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                  {apt.status}
                </span>
              </div>
              <div className="mt-4 flex items-center space-x-6 text-sm text-slate-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  {apt.date}
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {apt.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-xl text-white shadow-lg">
            <h3 className="font-semibold text-lg mb-2">Daily Summary</h3>
            <p className="text-white/80 text-sm mb-4">You have {appointments.filter(a => a.status === 'Scheduled').length} remaining appointments today.</p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">View Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PatientDashboard = ({ user }: { user: User }) => {
  const [history, setHistory] = useState<MedicalRecord[]>([]);

  useEffect(() => {
    api.records.list().then(setHistory);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">My Health Record</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">Recent Visits</h3>
          <button className="text-primary text-sm font-medium hover:underline">Download Report</button>
        </div>
        <div className="divide-y divide-slate-100">
          {history.map(record => (
            <div key={record.id} className="p-6 hover:bg-slate-50 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="font-medium text-slate-800">{record.diagnosis}</h4>
                  <p className="text-sm text-slate-500 mt-1">Prescribed: <span className="text-slate-700">{record.prescription}</span></p>
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
                  <button className="text-primary hover:text-sky-700">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-sky-50 rounded-xl p-6 border border-sky-100">
            <h3 className="font-semibold text-slate-800 mb-2">Upcoming Appointment</h3>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <p className="text-slate-600">You have no upcoming appointments.</p>
            </div>
             <button className="text-sm bg-white text-primary px-4 py-2 rounded-lg border border-primary/20 hover:bg-sky-50 transition-colors font-medium">Book Appointment</button>
          </div>
           <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-2">Vitals</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
               <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-xs text-slate-400">Heart Rate</div>
                  <div className="text-lg font-bold text-slate-800">72 bpm</div>
               </div>
               <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-xs text-slate-400">Blood Pressure</div>
                  <div className="text-lg font-bold text-slate-800">120/80</div>
               </div>
            </div>
          </div>
       </div>
    </div>
  );
};

// --- Login Screen ---

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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold mb-4">
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
                {key === 'ADMIN' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>}
                {key === 'DOCTOR' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>}
                {key === 'PATIENT' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>}
              </div>
              <div className="ml-4 text-left">
                <p className="text-sm font-medium text-slate-900 group-hover:text-primary transition-colors">{key.charAt(0) + key.slice(1).toLowerCase()}</p>
                <p className="text-xs text-slate-500">Access {key.toLowerCase()} dashboard</p>
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

// --- Main App Component ---

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (role: Role) => {
    try {
      const userData = await api.auth.login(role);
      setUser(userData);
    } catch (error) {
      alert("Login failed");
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-100">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">StG</div>
          <span className="font-bold text-slate-800 text-lg">St. George</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full flex items-center space-x-3 px-4 py-3 bg-sky-50 text-primary rounded-lg font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            <span>Dashboard</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <span>Schedule</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            <span>Settings</span>
          </button>
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
            onClick={handleLogout}
            className="w-full py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4">
          <div className="font-bold text-slate-800 text-lg">St. George</div>
          <button onClick={handleLogout} className="text-sm text-red-600">Sign Out</button>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {user.role === Role.ADMIN && <AdminDashboard user={user} />}
            {user.role === Role.DOCTOR && <DoctorDashboard user={user} />}
            {user.role === Role.PATIENT && <PatientDashboard user={user} />}
          </div>
        </div>
      </main>

      <AIAssistant user={user} />
    </div>
  );
};

export default App;