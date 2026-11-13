import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';

import ConfirmationModal from '../../../../components/common/ConfirmationModal';
import { academicYearsService } from '../../../../services/academic-years.service';
import type {
  AcademicYear,
  CreateAcademicYearDto,
} from '../../../../services/academic-years.types';

import './AcademicYearsPage.css';

/**
 * `isCurrent` est envoyé uniquement si ton API le gère.
 * Sinon, la nouvelle année sera courante comme avant (voir remarque dans la réponse).
 */
type CreateAcademicYearPayload = CreateAcademicYearDto & {
  isCurrent?: boolean;
};

const DAY_MS = 86_400_000;

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (
      error as {
        response?: { data?: { message?: string | string[] } };
      }
    ).response;
    const message = response?.data?.message;

    if (Array.isArray(message)) return message.join(', ');
    if (message) return message;
  }

  return 'Une erreur est survenue. Veuillez réessayer.';
}

function parseDate(date: string): Date | null {
  const [year, month, day] = date.slice(0, 10).split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatDate(date: string): string {
  const parsed = parseDate(date);
  if (!parsed) return 'Date indisponible';

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(parsed);
}

const shiftYear = (date: string) =>
  `${Number(date.slice(0, 4)) + 1}${date.slice(4, 10)}`;

const shiftLabel = (label: string) =>
  label.replace(/\d{4}/g, (year) => String(Number(year) + 1));

const plural = (count: number, word: string) =>
  `${count} ${word}${count > 1 ? 's' : ''}`;

function RefreshIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M13.5 6A5.5 5.5 0 004 4.2L2.5 5.7M2.5 2.5v3.2h3.2M2.5 10a5.5 5.5 0 009.5 1.8l1.5-1.5M13.5 13.5v-3.2h-3.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
      <path
        d="M8 3v10M3 8h10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
      <rect
        x="2"
        y="3"
        width="12"
        height="11"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M2 6.5h12M5.5 1.5v3M10.5 1.5v3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M4 11V7a4 4 0 118 0v4l1 1.5H3L4 11zM6.5 14h3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AcademicYearsPage() {
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [label, setLabel] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [makeCurrent, setMakeCurrent] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pendingCreate, setPendingCreate] =
    useState<CreateAcademicYearPayload | null>(null);
  const [error, setError] = useState('');
  const [confirmationError, setConfirmationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const labelInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;

    void academicYearsService
      .findAll()
      .then((years) => {
        if (active) setAcademicYears(years);
      })
      .catch((err: unknown) => {
        if (active) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const currentAcademicYear = useMemo(
    () => academicYears.find((year) => year.isCurrent),
    [academicYears],
  );

  // Pré-remplit le formulaire avec l’année suivante (modifiable).
  useEffect(() => {
    if (prefilled || loading) return;

    if (currentAcademicYear) {
      setLabel(shiftLabel(currentAcademicYear.label));
      setStartDate(shiftYear(currentAcademicYear.startDate));
      setEndDate(shiftYear(currentAcademicYear.endDate));
    }
    setPrefilled(true);
  }, [prefilled, loading, currentAcademicYear]);

  const progress = useMemo(() => {
    if (!currentAcademicYear) return null;

    const start = parseDate(currentAcademicYear.startDate);
    const end = parseDate(currentAcademicYear.endDate);
    if (!start || !end) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const total = Math.round((end.getTime() - start.getTime()) / DAY_MS) + 1;
    const elapsed = Math.min(
      Math.max(Math.round((today.getTime() - start.getTime()) / DAY_MS) + 1, 0),
      total,
    );

    const monthFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'short' });
    const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1).getTime();
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 1).getTime();
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
    const months: { label: string; state: 'past' | 'current' | 'future' }[] = [];

    while (cursor.getTime() <= lastMonth && months.length < 18) {
      const time = cursor.getTime();
      months.push({
        label: monthFormatter.format(cursor),
        state:
          time < currentMonth
            ? 'past'
            : time === currentMonth
              ? 'current'
              : 'future',
      });
      cursor.setMonth(cursor.getMonth() + 1);
    }

    return {
      total,
      elapsed,
      remaining: total - elapsed,
      months,
      notStarted: elapsed === 0,
      over: today.getTime() > end.getTime(),
    };
  }, [currentAcademicYear]);

  const reloadAcademicYears = async () => {
    setLoading(true);
    setError('');

    try {
      setAcademicYears(await academicYearsService.findAll());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    const cleanLabel = label.trim();
    if (!cleanLabel) {
      setError('Le libellé de l’année scolaire est obligatoire.');
      return;
    }

    if (!startDate || !endDate) {
      setError('Les dates de début et de fin sont obligatoires.');
      return;
    }

    if (startDate >= endDate) {
      setError('La date de début doit être antérieure à la date de fin.');
      return;
    }

    setPendingCreate({
      label: cleanLabel,
      startDate,
      endDate,
      isCurrent: makeCurrent,
    });
    setConfirmationError('');
  };

  const confirmCreate = async () => {
    if (!pendingCreate) return;

    setSaving(true);
    setConfirmationError('');

    try {
      const created = await academicYearsService.create(pendingCreate);

      setAcademicYears((current) =>
        [
          ...current.map((year) =>
            created.isCurrent ? { ...year, isCurrent: false } : year,
          ),
          created,
        ].sort(
          (first, second) =>
            new Date(second.startDate).getTime() -
            new Date(first.startDate).getTime(),
        ),
      );
      setLabel('');
      setStartDate('');
      setEndDate('');
      setMakeCurrent(false);
      setPendingCreate(null);
      setSuccessMessage(
        created.isCurrent
          ? `L’année scolaire ${created.label} a été créée et définie comme année courante.`
          : `L’année scolaire ${created.label} a été créée. L’année courante reste inchangée.`,
      );
    } catch (err) {
      setConfirmationError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const focusForm = () => {
    setError('');
    setSuccessMessage('');
    labelInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    labelInputRef.current?.focus();
  };

  const progressTitle = !progress
    ? ''
    : progress.over
      ? 'Année terminée'
      : progress.notStarted
        ? 'Pas encore commencée'
        : `Jour ${progress.elapsed} sur ${progress.total}`;

  return (
    <div className="ay-page">
      <header className="ay-header">
        <div>
          <h1>Années scolaires</h1>
          <p>Consulte l’année en cours et prépare la rentrée scolaire.</p>
        </div>
        <div className="ay-header-actions">
          <button
            type="button"
            className="ay-button ay-button-outline"
            onClick={() => void reloadAcademicYears()}
            disabled={loading || saving}
          >
            <RefreshIcon />
            Actualiser
          </button>
          <button
            type="button"
            className="ay-button ay-button-dark"
            onClick={focusForm}
            disabled={loading || saving}
          >
            <PlusIcon />
            Nouvelle année scolaire
          </button>
        </div>
      </header>

      {successMessage && (
        <div className="ay-message ay-success" role="status">
          {successMessage}
        </div>
      )}
      {error && loading === false && academicYears.length === 0 && (
        <div className="ay-message ay-error" role="alert">
          {error}
        </div>
      )}

      <div className="ay-layout">
        <div className="ay-main">
          {/* ───────── Année courante ───────── */}
          <section className="ay-hero" aria-label="Année courante">
            <div className="ay-hero-top">
              <span className="ay-hero-label">Année courante</span>
              {currentAcademicYear && <span className="ay-badge-live">En cours</span>}
            </div>

            {loading ? (
              <p className="ay-hero-empty">Chargement...</p>
            ) : currentAcademicYear ? (
              <>
                <h2 className="ay-hero-year">
                  {currentAcademicYear.label.replace('-', '–')}
                </h2>
                <p className="ay-hero-dates">
                  <CalendarIcon />
                  Du {formatDate(currentAcademicYear.startDate)} au{' '}
                  {formatDate(currentAcademicYear.endDate)}
                </p>

                {progress && (
                  <div className="ay-progress">
                    <div className="ay-progress-head">
                      <strong>{progressTitle}</strong>
                      {progress.remaining > 0 && !progress.notStarted && (
                        <span>{plural(progress.remaining, 'jour')} avant la fin</span>
                      )}
                    </div>
                    <ol className="ay-months">
                      {progress.months.map((month, index) => (
                        <li
                          key={`${month.label}-${index}`}
                          className={`ay-month is-${month.state}`}
                        >
                          <span className="ay-month-bar" />
                          <span className="ay-month-label">{month.label}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 className="ay-hero-year ay-hero-year-empty">Aucune année définie</h2>
                <p className="ay-hero-dates">
                  Crée une année scolaire pour démarrer la configuration.
                </p>
              </>
            )}
          </section>

          {/* ───────── Historique ───────── */}
          <section className="ay-card ay-history">
            <h2 className="ay-card-title">Historique des années scolaires</h2>
            <p className="ay-card-sub">Les années précédentes restent consultables.</p>

            {loading ? (
              <div className="ay-empty">Chargement de l’historique...</div>
            ) : academicYears.length === 0 ? (
              <div className="ay-empty">Aucune année scolaire n’a encore été créée.</div>
            ) : (
              <ul className="ay-history-list">
                {academicYears.map((year) => (
                  <li key={year.id} className="ay-history-row">
                    <span className="ay-history-year">
                      {year.label.replace('-', '–')}
                    </span>
                    <span className="ay-history-date">{formatDate(year.startDate)}</span>
                    <span className="ay-history-date">{formatDate(year.endDate)}</span>
                    <span
                      className={`ay-pill ${year.isCurrent ? 'ay-pill-current' : 'ay-pill-past'}`}
                    >
                      {year.isCurrent ? 'En cours' : 'Terminée'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* ───────── Nouvelle année ───────── */}
        <form className="ay-card ay-form" onSubmit={handleCreate}>
          <div>
            <h2 className="ay-card-title">Nouvelle année scolaire</h2>
            <p className="ay-card-sub">À préparer avant la rentrée de septembre.</p>
          </div>

          {error && (academicYears.length > 0 || !loading) && (
            <div className="ay-message ay-error" role="alert">
              {error}
            </div>
          )}

          <label className="ay-field">
            <span>Libellé</span>
            <input
              ref={labelInputRef}
              className="ay-input-label"
              type="text"
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              placeholder="Ex. 2026-2027"
              maxLength={20}
              required
              disabled={saving}
            />
          </label>

          <div className="ay-dates">
            <label className="ay-date">
              <span>Début</span>
              <input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
                required
                disabled={saving}
              />
            </label>
            <label className="ay-date">
              <span>Fin</span>
              <input
                type="date"
                value={endDate}
                min={startDate || undefined}
                onChange={(event) => setEndDate(event.target.value)}
                required
                disabled={saving}
              />
            </label>
          </div>

          <div className="ay-toggle-row">
            <div>
              <strong>En faire l’année courante</strong>
              <small>
                {currentAcademicYear
                  ? `${currentAcademicYear.label} passera à Terminée`
                  : 'Elle deviendra l’année en cours'}
              </small>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={makeCurrent}
              aria-label="En faire l’année courante"
              className={`ay-switch ${makeCurrent ? 'is-on' : ''}`}
              onClick={() => setMakeCurrent((value) => !value)}
              disabled={saving}
            >
              <span />
            </button>
          </div>

          <p className="ay-notice">
            <BellIcon />
            <span>
              À la rentrée, chaque élève confirme sa classe. Les demandes arrivent
              dans Demandes de classe.
            </span>
          </p>

          <button
            type="submit"
            className="ay-button ay-button-dark ay-submit"
            disabled={saving || loading}
          >
            Créer l’année scolaire
          </button>
        </form>
      </div>

      {pendingCreate && (
        <ConfirmationModal
          title="Confirmer la création"
          message={
            pendingCreate.isCurrent
              ? currentAcademicYear
                ? `Créer « ${pendingCreate.label} » la définira comme année courante et remplacera « ${currentAcademicYear.label} ».`
                : `Créer « ${pendingCreate.label} » comme année scolaire courante ?`
              : `Créer l’année « ${pendingCreate.label} » ? L’année courante restera inchangée.`
          }
          confirmLabel="Créer l’année"
          loading={saving}
          error={confirmationError}
          onCancel={() => {
            if (!saving) {
              setPendingCreate(null);
              setConfirmationError('');
            }
          }}
          onConfirm={() => void confirmCreate()}
        />
      )}
    </div>
  );
}