# St. George Hospital HMS

A modern, centralized Healthcare Management System (HMS) dashboard designed for St. George Hospital. This application simulates a full-stack architecture using **React** (mimicking Next.js) and a mock service layer (mimicking **FastAPI**).

## 🚀 Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Gemini API (`gemini-2.5-flash`)
- **Architecture**: Single Page Application (SPA) with mock async services.

## ✨ Features Implemented

### 1. Authentication & Roles
- **Mock Login System**: Support for three distinct roles without real backend requirements.
- **Roles**:
  - 👨‍💼 **Admin**: Hospital-wide oversight.
  - 👩‍⚕️ **Doctor**: Appointment and schedule management.
  - 👤 **Patient**: Personal health records and history.

### 2. Role-Based Dashboards
- **Admin View**:
  - Hospital key performance indicators (KPIs) like revenue, bed availability, and patient count.
  - Branch performance tables.
- **Doctor View**:
  - List of daily appointments.
  - Status indicators (Scheduled, Completed).
  - Daily summary cards.
- **Patient View**:
  - Medical history timeline.
  - Vitals monitoring (Heart rate, Blood pressure).
  - Recent diagnosis and prescriptions.

### 3. AI Assistant
- **Integration**: Uses `@google/genai` SDK.
- **Model**: `gemini-2.5-flash` for low-latency responses.
- **Context Awareness**: The AI is injected with a system instruction containing the current user's role and name to provide personalized assistance.
- **UI**: Floating action button (FAB) with a collapsible chat interface.

### 4. Service Layer (`services/`)
- **`api.ts`**: Simulates a REST API client (e.g., Axios or Fetch wrappers) with artificial network delays.
- **`mockData.ts`**: Contains static data definitions for Users, Appointments, Branches, and Records.

## 📂 Project Structure

```
.
├── index.html              # Entry HTML with Tailwind CDN
├── index.tsx               # React Root
├── App.tsx                 # Main Layout & Dashboard Logic
├── types.ts                # TypeScript Interfaces (User, Appointment, etc.)
├── components/
│   └── AIAssistant.tsx     # Gemini-powered Chat Component
└── services/
    ├── api.ts              # Mock FastAPI Service Layer
    └── mockData.ts         # Static Data
```

## 🛠 To-Do / Future Enhancements
- [ ] Implement actual backend connection.
- [ ] Add "Book Appointment" form modal.
- [ ] Add data visualization charts (using a charting library).
- [ ] Enhance AI with function calling (e.g., to book appointments via chat).
