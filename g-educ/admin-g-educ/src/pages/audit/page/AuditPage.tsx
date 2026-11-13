import { useEffect, useState } from 'react';

import { auditService } from '../../../services/audit.service';
import type { AuditLog, AuditQuery } from '../../../services/audit.types';

import './AuditPage.css';

const pageSize = 20;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const actionLabels: Record<string, string> = {
  LESSON_PUBLISHED: 'Leçon publiée',
  LESSON_ARCHIVED: 'Leçon archivée',
  CONTRIBUTION_PUBLISHED: 'Contribution publiée',
  CONTRIBUTION_REJECTED: 'Contribution refusée',
  CONTENT_HIDDEN: 'Contenu masqué',
  CONTENT_RESTORED: 'Contenu rétabli',
  SANCTION_ISSUED: 'Sanction appliquée',
  SANCTION_REVOKED: 'Sanction levée',
  ROLE_CHANGED: 'Rôle modifié',
  CLASS_CHANGED: 'Classe modifiée',
  USER_SUSPENDED: 'Utilisateur suspendu',
  ACADEMIC_YEAR_CREATED: 'Année scolaire créée',
  USER_PROFILE_UPDATED: 'Profil utilisateur modifié',
  USER_PASSWORD_CHANGED: 'Mot de passe modifié',
  USER_PUBLISH_PERMISSION_CHANGED: 'Permission de publication modifiée',
  ASSET_DELETED: 'Fichier supprimé',
  STAFF_CREATED: 'Personnel créé',
  USER_REACTIVATED: 'Utilisateur réactivé',
  USER_ANONYMIZED: 'Utilisateur anonymisé',
  CLASS_CHANGE_REQUEST_CREATED: 'Demande de changement créée',
  CLASS_CHANGE_REQUEST_APPROVED: 'Demande de changement approuvée',
  CLASS_CHANGE_REQUEST_REJECTED: 'Demande de changement refusée',
  CHAPTER_CREATED: 'Chapitre créé',
  CHAPTER_UPDATED: 'Chapitre modifié',
  CHAPTER_PUBLISHED: 'Chapitre publié',
  CHAPTER_ARCHIVED: 'Chapitre archivé',
  CHAPTERS_REORDERED: 'Chapitres réorganisés',
  ASSESSMENT_CREATED: 'Évaluation créée',
  ASSESSMENT_UPDATED: 'Évaluation modifiée',
  ASSESSMENT_PUBLISHED: 'Évaluation publiée',
  ASSESSMENT_ARCHIVED: 'Évaluation archivée',
  EVENT_CREATED: 'Événement créé',
  EVENT_UPDATED: 'Événement modifié',
  EVENT_ARCHIVED: 'Événement archivé',
  ASSET_UPLOADED: 'Fichier téléversé',
};

const entityLabels: Record<string, string> = {
  User: 'Utilisateur',
  StudentProfile: 'Profil élève',
  AcademicYear: 'Année scolaire',
  Chapter: 'Chapitre',
  Lesson: 'Leçon',
  Assessment: 'Évaluation',
  Event: 'Événement',
  Contribution: 'Contribution',
  Sanction: 'Sanction',
  ClassChangeRequest: 'Demande de changement',
};

const roleLabels: Record<string, string> = {
  ELEVE: 'Élève',
  ENSEIGNANT: 'Enseignant',
  MODERATEUR: 'Modérateur',
  ADMINISTRATEUR: 'Administrateur',
};

type Period = 'today' | '7d' | '30d' | 'all';

const periodLabels: Record<Period, string> = {
  today: 'Aujourd’hui',
  '7d': '7 derniers jours',
  '30d': '30 derniers jours',
  all: 'Toute la période',
};

function getPeriodRange(period: Period): Pick<AuditQuery, 'from'> {
  if (period === 'all') return {};
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  if (period === '7d') start.setDate(start.getDate() - 6);
  if (period === '30d') start.setDate(start.getDate() - 29);
  return { from: start.toISOString() };
}

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (
      error as { response?: { data?: { message?: string | string[] } } }
    ).response;
    const message = response?.data?.message;
    if (Array.isArray(message)) return message.join(', ');
    if (message) return message;
  }
  return 'Impossible de charger le journal d’audit.';
}

function formatTime(value: string): string {
  return new Date(value).toLocaleTimeString('fr-FR', { timeZone: 'UTC' });
}

function formatShortDate(value: string): string {
  return new Date(value).toLocaleDateString('fr-FR', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'short',
  });
}

function formatFullDate(value: string): string {
  const date = new Date(value).toLocaleDateString('fr-FR', {
    timeZone: 'UTC',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return `${date} · ${formatTime(value)} UTC`;
}

function getActorName(log: AuditLog): string {
  if (!log.user) return 'Action système';
  return (
    log.user.studentProfile?.displayName ||
    log.user.phone ||
    (log.role ? `Compte ${log.role.toLowerCase()}` : 'Utilisateur')
  );
}

function getActorRole(log: AuditLog): string {
  return log.role ? (roleLabels[log.role] ?? log.role) : 'Système';
}

function sanitizeDetails(value: unknown): unknown {
  if (typeof value === 'string') {
    return uuidPattern.test(value) ? undefined : value;
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => sanitizeDetails(item))
      .filter((item) => item !== undefined);
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([key]) => !/^(id|.*Id|.*Ids)$/.test(key))
        .map(([key, item]) => [key, sanitizeDetails(item)])
        .filter(([, item]) => item !== undefined),
    );
  }
  return value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function formatKey(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, (letter) => letter.toUpperCase());
}

function display(value: unknown): string {
  if (value === undefined || value === null) return '—';
  return typeof value === 'object' ? JSON.stringify(value) : String(value);
}

/** Résumé d'une ligne : première différence entre « avant » et « après ». */
function summarize(log: AuditLog): string {
  const before = sanitizeDetails(log.before);
  const after = sanitizeDetails(log.after);

  if (isRecord(after)) {
    const b = isRecord(before) ? before : {};
    const changed = Object.keys(after).filter(
      (key) => JSON.stringify(after[key]) !== JSON.stringify(b[key]),
    );
    if (changed.length > 0) {
      const key = changed[0];
      const extra = changed.length > 1 ? ` +${changed.length - 1}` : '';
      return b[key] !== undefined
        ? `${formatKey(key)} : ${display(b[key])} → ${display(after[key])}${extra}`
        : `${formatKey(key)} : ${display(after[key])}${extra}`;
    }
  }
  return actionLabels[log.action] ?? log.action;
}

function getTone(action: string): 'danger' | 'dark' | 'neutral' {
  if (/SANCTION_ISSUED|SUSPENDED|REJECTED|ANONYMIZED|DELETED/.test(action)) {
    return 'danger';
  }
  if (/PUBLISHED/.test(action)) return 'dark';
  return 'neutral';
}

function csvCell(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}

function exportCsv(logs: AuditLog[]) {
  const header = ['Date (UTC)', 'Utilisateur', 'Rôle', 'Action', 'Entité', 'Résumé', 'IP'];
  const lines = logs.map((log) =>
    [
      log.createdAt,
      getActorName(log),
      getActorRole(log),
      actionLabels[log.action] ?? log.action,
      entityLabels[log.entityType] ?? log.entityType,
      summarize(log),
      log.ipAddress ?? '',
    ]
      .map(csvCell)
      .join(','),
  );
  const blob = new Blob(['\uFEFF' + [header.map(csvCell).join(','), ...lines].join('\n')], {
    type: 'text/csv;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `journal-audit-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

export default function AuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [period, setPeriod] = useState<Period>('today');
  const [actionFilter, setActionFilter] = useState('');
  const [entityFilter, setEntityFilter] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const query: AuditQuery = {
      page,
      limit: pageSize,
      ...getPeriodRange(period),
      ...(actionFilter && { action: actionFilter }),
      ...(entityFilter && { entityType: entityFilter }),
    };

    void auditService
      .findAll(query)
      .then((response) => {
        if (!active) return;
        setLogs(response.data);
        setTotal(response.meta.total);
        setTotalPages(response.meta.totalPages);
      })
      .catch((requestError: unknown) => {
        if (active) {
          setLogs([]);
          setTotal(0);
          setTotalPages(0);
          setError(getErrorMessage(requestError));
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [actionFilter, entityFilter, page, period]);

  const updateFilter = (update: () => void) => {
    setLoading(true);
    setError('');
    setPage(1);
    setSelectedId(null);
    update();
  };

  const changePage = (nextPage: number) => {
    setLoading(true);
    setError('');
    setPage(nextPage);
    setSelectedId(null);
  };

  const selected = logs.find((log) => log.id === selectedId) ?? logs[0] ?? null;
  const beforeData = selected ? sanitizeDetails(selected.before) : undefined;
  const afterData = selected ? sanitizeDetails(selected.after) : undefined;

  return (
    <div className="audit-page">
      <header className="audit-header">
        <div>
          <h1>Journal d’audit</h1>
          <p>
            Toutes les actions sensibles, dans l’ordre. Les entrées ne peuvent
            être ni modifiées ni supprimées.
          </p>
        </div>
        <button
          type="button"
          className="audit-export"
          onClick={() => exportCsv(logs)}
          disabled={logs.length === 0}
        >
          Exporter en CSV
        </button>
      </header>

      <div className="audit-filters">
        <select
          className="audit-pill"
          data-active={period !== 'all'}
          value={period}
          onChange={(e) => updateFilter(() => setPeriod(e.target.value as Period))}
          aria-label="Période"
        >
          {(Object.keys(periodLabels) as Period[]).map((key) => (
            <option key={key} value={key}>
              {periodLabels[key]}
            </option>
          ))}
        </select>

        <select
          className="audit-pill"
          data-active={Boolean(actionFilter)}
          value={actionFilter}
          onChange={(e) => updateFilter(() => setActionFilter(e.target.value))}
          aria-label="Action"
        >
          <option value="">Action : toutes</option>
          {Object.entries(actionLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <select
          className="audit-pill"
          data-active={Boolean(entityFilter)}
          value={entityFilter}
          onChange={(e) => updateFilter(() => setEntityFilter(e.target.value))}
          aria-label="Entité"
        >
          <option value="">Entité : toutes</option>
          {Object.entries(entityLabels).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <span className="audit-count">{total} entrée(s)</span>
      </div>

      {error && (
        <div className="audit-error" role="alert">
          {error}
        </div>
      )}

      <div className="audit-layout">
        <section className="audit-card audit-list">
          {loading ? (
            <p className="audit-empty">Chargement du journal...</p>
          ) : logs.length === 0 ? (
            <p className="audit-empty">Aucune action ne correspond à ces filtres.</p>
          ) : (
            <>
              <ul>
                {logs.map((log) => (
                  <li key={log.id}>
                    <button
                      type="button"
                      className="audit-row"
                      aria-pressed={selected?.id === log.id}
                      onClick={() => setSelectedId(log.id)}
                    >
                      <span className="audit-time">
                        {formatTime(log.createdAt)}
                        <small>{formatShortDate(log.createdAt)}</small>
                      </span>
                      <span className="audit-actor">
                        <strong>{getActorName(log)}</strong>
                        <small>{getActorRole(log)}</small>
                      </span>
                      <span
                        className={`audit-badge tone-${getTone(log.action)}`}
                        title={actionLabels[log.action] ?? log.action}
                      >
                        {actionLabels[log.action] ?? log.action}
                      </span>
                      <span className="audit-entity">
                        {entityLabels[log.entityType] ?? log.entityType}
                      </span>
                      <span className="audit-summary">{summarize(log)}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="audit-pagination">
                <span>
                  Page {page} sur {Math.max(totalPages, 1)}
                </span>
                <div>
                  <button
                    type="button"
                    onClick={() => changePage(Math.max(1, page - 1))}
                    disabled={page <= 1 || loading}
                  >
                    Précédent
                  </button>
                  <button
                    type="button"
                    onClick={() => changePage(Math.min(totalPages, page + 1))}
                    disabled={page >= totalPages || loading}
                  >
                    Suivant
                  </button>
                </div>
              </div>
            </>
          )}
        </section>

        <aside className="audit-detail" aria-live="polite">
          {selected ? (
            <>
              <div className="audit-detail-head">
                <div>
                  <h2>Entrée {selected.id.slice(0, 8)}</h2>
                  <p>{formatFullDate(selected.createdAt)}</p>
                </div>
                <span className={`audit-badge tone-${getTone(selected.action)} on-dark`}>
                  {actionLabels[selected.action] ?? selected.action}
                </span>
              </div>

              <div className="audit-parties">
                <div>
                  <span>Par</span>
                  <strong>{getActorName(selected)}</strong>
                </div>
                <div>
                  <span>Cible</span>
                  <strong>
                    {entityLabels[selected.entityType] ?? selected.entityType}
                  </strong>
                </div>
              </div>

              <div className="audit-code-block">
                <span>Avant</span>
                <pre className="is-dark">
                  {beforeData === undefined || beforeData === null
                    ? '—'
                    : JSON.stringify(beforeData, null, 2)}
                </pre>
              </div>

              <div className="audit-code-block">
                <span>Après</span>
                <pre className="is-light">
                  {afterData === undefined || afterData === null
                    ? '—'
                    : JSON.stringify(afterData, null, 2)}
                </pre>
              </div>

              {selected.ipAddress && (
                <p className="audit-ip">Adresse IP : {selected.ipAddress}</p>
              )}

              <p className="audit-footnote">
                Visible uniquement par les administrateurs.
              </p>
            </>
          ) : (
            <p className="audit-footnote">
              Sélectionnez une entrée pour voir son détail.
            </p>
          )}
        </aside>
      </div>
    </div>
  );
}