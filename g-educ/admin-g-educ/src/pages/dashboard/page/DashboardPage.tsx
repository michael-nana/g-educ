
import { Link } from 'react-router-dom'
import Icon, { type IconName } from '../../../components/common/Icon'
import './DashboardPage.css'

interface StatItem {
  title: string
  value: string
  description: string
  icon: IconName
  color: string
  background: string
}

const statistics: StatItem[] = [
  {
    title: 'Élèves',
    value: '—',
    description: 'Effectif total des élèves',
    icon: 'users',
    color: '#3478F6',
    background: '#EAF1FF',
  },
  {
    title: 'Enseignants',
    value: '—',
    description: 'Personnel enseignant',
    icon: 'school',
    color: '#16A36A',
    background: '#E8F8F0',
  },
  {
    title: 'Classes',
    value: '—',
    description: 'Classes enregistrées',
    icon: 'layers',
    color: '#9B59B6',
    background: '#F5EAFE',
  },
  {
    title: 'Cours',
    value: '—',
    description: 'Leçons enregistrées',
    icon: 'book',
    color: '#E9A23B',
    background: '#FFF5E5',
  },
]

const shortcuts = [
  {
    title: 'Utilisateurs',
    description: 'Gérer les comptes et les permissions',
    icon: 'users' as const,
    path: '/users',
  },
  {
    title: 'Gestion scolaire',
    description: 'Consulter les classes et matières',
    icon: 'school' as const,
    path: '/academics/classes',
  },
  {
    title: 'Gestion des cours',
    description: 'Administrer les chapitres et leçons',
    icon: 'book' as const,
    path: '/courses',
  },
  {
    title: 'Événements',
    description: 'Organiser le calendrier scolaire',
    icon: 'calendar' as const,
    path: '/events',
  },
]

export default function DashboardPage() {
  return (
    <div className="dashboard-page">

      <section className="dashboard-welcome">
        <div>
          <span className="welcome-label">
            ESPACE ADMINISTRATEUR
          </span>

          <h2>Bienvenue sur G-EDUC</h2>

          <p>
            Gérez votre plateforme éducative depuis
            votre espace d'administration.
          </p>
        </div>

        <div className="welcome-icon">
          <Icon name="school" size={65} />
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h3>Vue d'ensemble</h3>
            <p>Les principaux indicateurs de la plateforme</p>
          </div>
        </div>

        <div className="statistics-grid">
          {statistics.map((stat) => (
            <div className="stat-card" key={stat.title}>
              <div
                className="stat-icon"
                style={{
                  color: stat.color,
                  background: stat.background,
                }}
              >
                <Icon name={stat.icon} size={23} />
              </div>

              <div className="stat-content">
                <span>{stat.title}</span>
                <strong>{stat.value}</strong>
                <small>{stat.description}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h3>Accès rapides</h3>
            <p>Accédez directement aux fonctionnalités principales</p>
          </div>
        </div>

        <div className="shortcuts-grid">
          {shortcuts.map((shortcut) => (
            <Link
              to={shortcut.path}
              className="shortcut-card"
              key={shortcut.title}
            >
              <div className="shortcut-icon">
                <Icon name={shortcut.icon} size={22} />
              </div>

              <div className="shortcut-content">
                <strong>{shortcut.title}</strong>
                <p>{shortcut.description}</p>
              </div>

              <Icon
                name="arrow"
                size={18}
                className="shortcut-arrow"
              />
            </Link>
          ))}
        </div>
      </section>

      <section className="dashboard-information">
        <div className="information-icon">
          <Icon name="shield" size={23} />
        </div>

        <div>
          <strong>Espace sécurisé d'administration</strong>
          <p>
            Les fonctionnalités sont accessibles selon
            les permissions du compte administrateur.
          </p>
        </div>
      </section>

    </div>
  )
}
