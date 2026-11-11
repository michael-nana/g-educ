
import { NavLink } from 'react-router-dom'
import Icon, { type IconName } from '../common/Icon'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface MenuItem {
  label: string
  path: string
  icon: IconName
}

interface MenuGroup {
  title: string
  items: MenuItem[]
}

const menuGroups: MenuGroup[] = [
  {
    title: 'PRINCIPAL',
    items: [
      {
        label: 'Tableau de bord',
        path: '/dashboard',
        icon: 'dashboard',
      },
    ],
  },
  {
    title: 'GESTION SCOLAIRE',
    items: [
      {
        label: 'Utilisateurs',
        path: '/users',
        icon: 'users',
      },
      {
        label: 'Classes',
        path: '/academics/classes',
        icon: 'school',
      },
      {
        label: 'Matières',
        path: '/academics/subjects',
        icon: 'layers',
      },
      {
        label: 'Années scolaires',
        path: '/academic-years',
        icon: 'calendar',
      },
      {
        label: 'Demandes de changement',
        path: '/class-change-requests',
        icon: 'clipboard',
      },
    ],
  },
  {
    title: 'GESTION PÉDAGOGIQUE',
    items: [
      {
        label: 'Chapitres',
        path: '/chapters',
        icon: 'book',
      },
      {
        label: 'Cours et leçons',
        path: '/courses',
        icon: 'file',
      },
      {
        label: 'Exercices et quiz',
        path: '/assessments',
        icon: 'clipboard',
      },
      {
        label: 'Événements',
        path: '/events',
        icon: 'calendar',
      },
    ],
  },
  {
    title: 'SYSTÈME',
    items: [
      {
        label: 'Notifications',
        path: '/notifications',
        icon: 'bell',
      },
      {
        label: 'Journal d’audit',
        path: '/audit',
        icon: 'history',
      },
    ],
  },
]

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Icon name="school" size={25} />
          </div>

          <div className="brand-text">
            <h2>G-EDUC</h2>
            <span>Administration</span>
          </div>
        </div>

        <div className="sidebar-profile">
          <div className="profile-avatar">
            <Icon name="user" size={23} />
          </div>

          <div className="profile-info">
            <strong>Administrateur</strong>
            <span>Gestion de la plateforme</span>
          </div>
        </div>

        <nav className="sidebar-navigation">
          {menuGroups.map((group) => (
            <div className="sidebar-group" key={group.title}>
              <p className="sidebar-group-title">
                {group.title}
              </p>

              {group.items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  onClick={onClose}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                >
                  <Icon name={item.icon} size={19} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-version">
            <div className="version-dot" />
            <span>G-EDUC Administration</span>
          </div>
        </div>
      </aside>
    </>
  )
}
