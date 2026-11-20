
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import StructurePage from './pages/academics/structure/page/StructurePage';
import AcademicYearsPage from './pages/academics/academic-years/page/AcademicYearsPage';
import ClassChangeRequestsPage from './pages/users/class-change-requests/ClassChangeRequestsPage';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

import DashboardPage from './pages/dashboard/page/DashboardPage';
import UsersPage from './pages/users/page/UsersPage';
import LoginPage from './pages/auth/LoginPage';
import ContentsPage from './pages/academics/contents/page/ContentsPage';
import EventsPage from './pages/events/page/EventsPage';
import NotificationsPage from './pages/notifications/page/NotificationsPage';
import AuditPage from './pages/audit/page/AuditPage';
import AnnalImportPage from './pages/academics/annals/AnnalImportPage';

import './App.css';

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-container">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-main">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/structure" element={<StructurePage />} />
              <Route path="/academics/classes" element={<Navigate to="/structure" replace />} />
              <Route path="/academics/subjects" element={<Navigate to="/structure" replace />} />
              <Route path="/academic-years" element={<AcademicYearsPage />} />
              <Route path="/class-change-requests" element={<ClassChangeRequestsPage />} />
              <Route path="/chapters" element={<Navigate to="/structure" replace />} />
              <Route path="/contents" element={<ContentsPage />} />
              <Route path="/annals/import" element={<AnnalImportPage />} />
              <Route path="/courses" element={<Navigate to="/contents?tab=lessons" replace />} />
              <Route path="/assessments" element={<Navigate to="/contents?tab=exercise" replace />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/audit" element={<AuditPage />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
