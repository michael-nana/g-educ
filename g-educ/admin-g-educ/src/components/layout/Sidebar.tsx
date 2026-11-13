import { NavLink } from 'react-router-dom'
import Icon, { type IconName } from '../common/Icon'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  /** Année scolaire affichée en bas (ex. "2025-2026") */
  schoolYear?: string
  /** Compteurs optionnels par route, ex. { '/class-change-requests': 23 } */
  badges?: Record<string, number>
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
    title: 'Principal',
    items: [{ label: 'Tableau de bord', path: '/dashboard', icon: 'dashboard' }],
  },
  {
    title: 'Pédagogie',
    items: [
      { label: 'Structure', path: '/structure', icon: 'school' },
      { label: 'Contenus', path: '/contents', icon: 'file' },
      { label: 'Années scolaires', path: '/academic-years', icon: 'calendar' },
      { label: 'Demandes de changement', path: '/class-change-requests', icon: 'clipboard' },
    ],
  },
  {
    title: 'Événements',
    items: [{ label: 'Événements', path: '/events', icon: 'calendar' }],
  },
  {
    title: 'Communauté',
    items: [{ label: 'Notifications', path: '/notifications', icon: 'bell' }],
  },
  {
    title: 'Comptes',
    items: [{ label: 'Utilisateurs', path: '/users', icon: 'users' }],
  },
  {
    title: 'Système',
    items: [{ label: 'Journal d’audit', path: '/audit', icon: 'history' }],
  },
]

export default function Sidebar({
  isOpen,
  onClose,
  schoolYear = '2025-2026',
  badges = {},
}: SidebarProps) {
  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <span className="brand-name">G-educ</span>
          <span className="brand-badge">Admin</span>
        </div>

        <nav className="sidebar-navigation">
          {menuGroups.map((group) => (
            <div className="sidebar-group" key={group.title}>
              <p className="sidebar-group-title">{group.title}</p>

              {group.items.map((item) => {
                const count = badges[item.path]

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end
                    onClick={onClose}
                    className={({ isActive }) =>
                      `sidebar-link ${isActive ? 'active' : ''}`
                    }
                  >
                    <Icon name={item.icon} size={17} />
                    <span className="sidebar-link-label">{item.label}</span>
                    {count ? <span className="sidebar-count">{count}</span> : null}
                  </NavLink>
                )
              })}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button type="button" className="sidebar-year">
            <span className="sidebar-year-text">
              <small>Année scolaire</small>
              <strong>{schoolYear}</strong>
            </span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  )
}