import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/common/Icon";
import { useAuth } from "../../../context/AuthContext";
import { dashboardService } from "../../../services/dashboard.service";
import type {
  DashboardActivityDay,
  DashboardPeriod,
  DashboardStats,
} from "../../../services/dashboard.types";
import "./DashboardPage.css";

const periods: { value: DashboardPeriod; label: string }[] = [
  { value: 14, label: "14 j" },
  { value: 30, label: "30 j" },
  { value: 365, label: "Année" },
];

function getErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "response" in error) {
    const response = (
      error as {
        response?: { data?: { message?: string | string[] } };
      }
    ).response;
    const message = response?.data?.message;
    if (Array.isArray(message)) return message.join(", ");
    if (message) return message;
  }
  return "Impossible de charger les données du tableau de bord.";
}

function formatNumber(value: number): string {
  return value.toLocaleString("fr-FR");
}

function formatDate(value: string, options: Intl.DateTimeFormatOptions) {
  return new Date(value).toLocaleDateString("fr-FR", options);
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getCompleteActivity(
  activity: DashboardActivityDay[],
  period: DashboardPeriod,
  generatedAt: string,
): DashboardActivityDay[] {
  const counts = new Map(activity.map((day) => [day.date, day.activeStudents]));
  const lastDay = new Date(generatedAt);
  const firstDay = new Date(
    Date.UTC(
      lastDay.getUTCFullYear(),
      lastDay.getUTCMonth(),
      lastDay.getUTCDate() - period + 1,
    ),
  );
  const days: DashboardActivityDay[] = [];

  for (let offset = 0; offset < period; offset += 1) {
    const date = new Date(firstDay.getTime() + offset * 86_400_000)
      .toISOString()
      .slice(0, 10);
    days.push({ date, activeStudents: counts.get(date) ?? 0 });
  }
  return days;
}

function FlameIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function ActivityChart({
  activity,
  period,
  generatedAt,
}: {
  activity: DashboardActivityDay[];
  period: DashboardPeriod;
  generatedAt: string;
}) {
  const days = getCompleteActivity(activity, period, generatedAt);
  const maxActivity = Math.max(1, ...days.map((day) => day.activeStudents));
  const currentDate = generatedAt.slice(0, 10);
  const labelInterval = period === 14 ? 1 : period === 30 ? 5 : 30;

  return (
    <div
      className={`dashboard-chart dashboard-chart-${period}`}
      role="img"
      aria-label={`Nombre d’élèves actifs par jour sur ${period} jours`}
    >
      {days.map((day, index) => {
        const showLabel =
          index === 0 ||
          index === days.length - 1 ||
          index % labelInterval === 0;
        const dateLabel = formatDate(`${day.date}T00:00:00Z`, {
          day: "2-digit",
          month: period === 14 ? "short" : undefined,
        });

        return (
          <div
            className="dashboard-chart-column"
            key={day.date}
            title={`${dateLabel} : ${formatNumber(day.activeStudents)} élève(s) actif(s)`}
          >
            <div className="dashboard-chart-track">
              <span
                className={[
                  "dashboard-chart-bar",
                  day.date === currentDate
                    ? "dashboard-chart-bar-today"
                    : day.activeStudents > 0
                      ? "dashboard-chart-bar-active"
                      : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={{
                  height: `${Math.max(
                    day.activeStudents > 0 ? 8 : 3,
                    (day.activeStudents / maxActivity) * 100,
                  )}%`,
                }}
              />
            </div>
            <span className="dashboard-chart-label">
              {showLabel ? dateLabel : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function PendingItem({
  label,
  description,
  count,
  to,
}: {
  label: string;
  description: string;
  count: number;
  to?: string;
}) {
  const content = (
    <>
      <strong className="pending-count">{formatNumber(count)}</strong>
      <span className="pending-copy">
        <strong>{label}</strong>
        <small>{description}</small>
      </span>
      <Icon name="arrow" size={14} />
    </>
  );

  return to ? (
    <Link className="dashboard-pending-item" to={to}>
      {content}
    </Link>
  ) : (
    <div className="dashboard-pending-item">{content}</div>
  );
}

export default function DashboardPage() {
  // Prénom affiché dans « Bonjour, … » (repli : « Administrateur »)
  const { user } = useAuth() as unknown as {
    user?: { firstName?: string; fullName?: string; name?: string } | null;
  };
  const firstName =
    user?.firstName ??
    (user?.fullName ?? user?.name)?.split(" ")[0] ??
    "Administrateur";

  const [initialNow] = useState(() => new Date());
  const [period, setPeriod] = useState<DashboardPeriod>(14);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refreshId, setRefreshId] = useState(0);

  useEffect(() => {
    let active = true;
    void dashboardService
      .getStats(period)
      .then((response) => {
        if (active) {
          setStats(response);
          setError("");
        }
      })
      .catch((requestError: unknown) => {
        if (active) {
          setStats(null);
          setError(getErrorMessage(requestError));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [period, refreshId]);

  const retry = () => {
    setLoading(true);
    setError("");
    setRefreshId((current) => current + 1);
  };

  const changePeriod = (value: DashboardPeriod) => {
    if (value === period) return;
    setLoading(true);
    setError("");
    setPeriod(value);
  };

  const metricValue = (value?: number) =>
    loading ? "…" : value === undefined ? "—" : formatNumber(value);

  const metrics: {
    title: string;
    value?: number;
    note: string;
    tone: string;
  }[] = [
    {
      title: "Flammes actives",
      value: stats?.totals.activeStreakDays,
      note: "jours cumulés de flamme en cours",
      tone: "flame",
    },
    {
      title: "Élèves actifs aujourd’hui",
      value: stats?.today.activeStudents,
      note: loading
        ? "Chargement..."
        : `sur ${formatNumber(stats?.totals.students ?? 0)} élèves inscrits`,
      tone: "default",
    },
    {
      title: "Quiz et exercices rendus",
      value:
        stats === null
          ? undefined
          : stats.today.exercisesSubmitted + stats.today.quizzesSubmitted,
      note: "aujourd’hui",
      tone: "default",
    },
    {
      title: "Leçons terminées",
      value: stats?.today.lessonsCompleted,
      note: "aujourd’hui",
      tone: "default",
    },
  ];

  const dateLabel = capitalize(
    formatDate(stats?.generatedAt ?? initialNow.toISOString(), {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  );

  return (
    <div className="dashboard-page">
      <header className="dashboard-welcome">
        <div>
          <h2>
            Bonjour, <em>{firstName}</em>
          </h2>
          <p className="dashboard-welcome-summary">
            {dateLabel} ·{" "}
            {loading
              ? "chargement des effectifs..."
              : stats
                ? `vue d’ensemble des ${formatNumber(stats.totals.classes)} classes`
                : "indicateurs indisponibles"}
          </p>
        </div>

        <div className="dashboard-actions">
          <button type="button" className="dashboard-button dashboard-button-light">
            Exporter
          </button>
          <Link to="/courses" className="dashboard-button dashboard-button-dark">
            <PlusIcon />
            Nouveau contenu
          </Link>
        </div>
      </header>

      {error && (
        <div className="dashboard-data-error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={retry}>
            Réessayer
          </button>
        </div>
      )}

      <div className="dashboard-overview-grid">
        <div className="dashboard-main-column">
          <section
            className="dashboard-metrics-grid"
            aria-label="Indicateurs du jour"
          >
            {metrics.map((metric) => (
              <article
                className={`dashboard-metric-card dashboard-metric-${metric.tone}`}
                key={metric.title}
              >
                <div className="dashboard-metric-heading">
                  <span>{metric.title}</span>
                  {metric.tone === "flame" && (
                    <span className="dashboard-flame">
                      <FlameIcon />
                    </span>
                  )}
                </div>
                <strong className="dashboard-metric-value">
                  {metricValue(metric.value)}
                </strong>
                <small>{metric.note}</small>
              </article>
            ))}
          </section>

          <section className="dashboard-panel dashboard-activity-panel">
            <div className="dashboard-panel-heading">
              <div>
                <h3>Jours actifs par élève</h3>
                <p>{period} derniers jours · toutes classes</p>
              </div>
              <div
                className="dashboard-period-switch"
                aria-label="Période d’activité"
              >
                {periods.map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    className={period === option.value ? "active" : ""}
                    aria-pressed={period === option.value}
                    onClick={() => changePeriod(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            {loading ? (
              <div className="dashboard-loading">
                Chargement de l’activité...
              </div>
            ) : stats ? (
              <ActivityChart
                activity={stats.activity}
                period={period}
                generatedAt={stats.generatedAt}
              />
            ) : (
              <div className="dashboard-loading">Activité indisponible.</div>
            )}
          </section>

          <section className="dashboard-panel dashboard-classes-panel">
            <div className="dashboard-panel-heading">
              <h3>Classes les plus actives</h3>
              <Link to="/academics/classes">
                Voir les {stats ? formatNumber(stats.totals.classes) : ""}
              </Link>
            </div>
            {loading ? (
              <div className="dashboard-loading">Chargement des classes...</div>
            ) : stats?.topClasses.length ? (
              <div className="dashboard-class-grid">
                {stats.topClasses.map((schoolClass) => (
                  <article
                    className="dashboard-class-card"
                    key={schoolClass.code}
                  >
                    <strong>{schoolClass.label}</strong>
                    <span>
                      {formatNumber(schoolClass.totalStudents)} élèves
                    </span>
                    <div className="dashboard-class-progress">
                      <span
                        style={{
                          width: `${Math.min(schoolClass.activityRate, 100)}%`,
                        }}
                      />
                    </div>
                    <small>{schoolClass.activityRate}&nbsp;% actifs</small>
                  </article>
                ))}
              </div>
            ) : (
              <div className="dashboard-loading">Aucune classe à afficher.</div>
            )}
          </section>
        </div>

        <aside className="dashboard-side-column">
          <section className="dashboard-panel dashboard-pending-panel">
            <div className="dashboard-panel-heading">
              <h3>À traiter</h3>
            </div>
            {loading ? (
              <div className="dashboard-loading">Chargement...</div>
            ) : stats ? (
              <div className="dashboard-pending-list">
                <PendingItem
                  label="Contributions à valider"
                  description="En attente de modération"
                  count={stats.pending.contributions}
                />
                <PendingItem
                  label="Signalements ouverts"
                  description="Contenus signalés"
                  count={stats.pending.reports}
                />
                <PendingItem
                  label="Changements de classe"
                  description="Demandes en attente"
                  count={stats.pending.classChanges}
                  to="/class-change-requests"
                />
              </div>
            ) : (
              <div className="dashboard-loading">Données indisponibles.</div>
            )}
          </section>

          <section className="dashboard-panel dashboard-events-panel">
            <div className="dashboard-panel-heading">
              <h3>Prochaines échéances</h3>
              <Link to="/events">Voir tout</Link>
            </div>
            {loading ? (
              <div className="dashboard-loading">Chargement...</div>
            ) : stats?.upcomingEvents.length ? (
              <ul className="dashboard-event-list">
                {stats.upcomingEvents.map((event) => (
                  <li key={`${event.title}-${event.startsAt}`}>
                    <div className="dashboard-event-date">
                      <strong>
                        {formatDate(event.startsAt, { day: "2-digit" })}
                      </strong>
                      <span>
                        {formatDate(event.startsAt, { month: "short" }).replace(
                          ".",
                          "",
                        )}
                      </span>
                    </div>
                    <div className="dashboard-event-details">
                      <strong>{event.title}</strong>
                      <span>
                        {event.subject?.name ?? event.class.label}
                        {event.subject ? ` · ${event.class.label}` : ""}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="dashboard-loading">Aucune échéance à venir.</div>
            )}

            <div className="dashboard-totals-strip">
              <span>
                <Icon name="users" size={14} />
                {metricValue(stats?.totals.teachers)} enseignants
              </span>
              <span>
                <Icon name="book" size={14} />
                {metricValue(stats?.totals.publishedLessons)} leçons publiées
              </span>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}