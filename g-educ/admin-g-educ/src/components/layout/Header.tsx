
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../common/Icon';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

interface HeaderProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  '/dashboard': 'Tableau de bord',
  '/users': 'Gestion des utilisateurs',
  '/structure': 'Structure pédagogique',
  '/academics/classes': 'Gestion des classes',
  '/academics/subjects': 'Gestion des matières',
  '/academic-years': 'Années scolaires',
  '/class-change-requests': 'Demandes de changement de classe',
  '/chapters': 'Gestion des chapitres',
  '/contents': 'Contenus',
  '/events': 'Événements scolaires',
  '/notifications': 'Notifications',
  '/audit': 'Journal d’audit',
};

export default function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

async function handleLogout() {
  try {
    await logout();
  } catch (error) {
    console.error('Erreur lors de la déconnexion :', error);
  } finally {
    navigate('/login', { replace: true });
  }
}

  const title =
    pageTitles[location.pathname] ?? 'Administration';

  return (
    <header className="admin-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Ouvrir le menu"
        >
          <Icon name="menu" size={23} />
        </button>

        <div className="header-title">
          <h1>{title}</h1>
          <p>Espace d'administration G-EDUC</p>
        </div>
      </div>

      <div className="header-right">
        <button
          type="button"
          className="header-icon-button"
          aria-label="Notifications"
          title="Notifications"
          onClick={() => navigate('/notifications')}
        >
          <Icon name="bell" size={20} />
        </button>

        <div className="header-divider" />

        <div className="header-user">
          <div className="header-avatar">
            <Icon name="user" size={19} />
          </div>

          <div className="header-user-info">
            <strong>Administrateur</strong>
            <span>{user?.phone ?? 'Administrateur'}</span>
          </div>

          <Icon name="chevron" size={15} />
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="header-logout"
          title="Se déconnecter"
        >
          <Icon name="logout" size={18} />
          Déconnexion
        </button>
      </div>
    </header>
  );
}
