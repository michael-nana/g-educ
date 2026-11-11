
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';

import DashboardPage from './pages/dashboard/page/DashboardPage';
import UsersPage from './pages/users/page/UsersPage';
import LoginPage from './pages/auth/LoginPage';

import './App.css';

const moduleDescriptions: Record<
  string,
  { title: string; description: string }
> = {
  '/academics/classes': {
    title: 'Gestion des classes',
    description: 'Consulter et organiser les classes scolaires.',
  },
  '/academics/subjects': {
    title: 'Gestion des matières',
    description: 'Gérer les matières et leurs associations aux classes.',
  },
  '/academic-years': {
    title: 'Années scolaires',
    description: 'Configurer les années scolaires de la plateforme.',
  },
  '/class-change-requests': {
    title: 'Demandes de changement de classe',
    description: 'Examiner et traiter les demandes des élèves.',
  },
  '/chapters': {
    title: 'Chapitres',
    description: 'Organiser les chapitres des contenus pédagogiques.',
  },
  '/courses': {
    title: 'Cours et leçons',
    description: 'Gérer les ressources et les leçons pédagogiques.',
  },
  '/assessments': {
    title: 'Évaluations',
    description: 'Gérer les exercices et les questionnaires.',
  },
  '/events': {
    title: 'Événements',
    description: 'Planifier et gérer les événements scolaires.',
  },
  '/notifications': {
    title: 'Notifications',
    description: 'Diffuser des annonces aux utilisateurs.',
  },
  '/audit': {
    title: 'Journal d’audit',
    description: 'Consulter les actions effectuées sur la plateforme.',
  },
};

function ModulePlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="module-placeholder">
      <div className="placeholder-icon">G</div>

      <h2>{title}</h2>

      <p>{description}</p>

      <span className="placeholder-status">
        Module en préparation
      </span>
    </div>
  );
}

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
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
            <Routes>
              <Route
                path="/dashboard"
                element={<DashboardPage />}
              />

              <Route
                path="/users"
                element={<UsersPage />}
              />

              {Object.entries(moduleDescriptions).map(
                ([path, module]) => (
                  <Route
                    key={path}
                    path={path.replace(/^\//, '')}
                    element={
                      <ModulePlaceholder
                        title={module.title}
                        description={module.description}
                      />
                    }
                  />
                ),
              )}

              <Route
                path="*"
                element={<Navigate to="/dashboard" replace />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </ProtectedRoute>
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

          <Route
            path="/*"
            element={<AdminLayout />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
