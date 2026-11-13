import { useCallback, useEffect, useMemo, useState } from 'react';

import { academicYearsService } from '../../../services/academic-years.service';
import { classChangeRequestsService } from '../../../services/class-change-requests.service';
import { classesService } from '../../../services/classes.service';
import type {
  ClassChangeRequest,
  ClassChangeRequestStatus,
} from '../../../services/class-change-requests.types';
import type { AcademicYear } from '../../../services/academic-years.types';
import type { SchoolClass } from '../../../services/classes.types';

import './ClassChangeRequestsPage.css';

type RequestFilter = 'TOUTES' | ClassChangeRequestStatus;

const filterLabels: Record<RequestFilter, string> = {
  TOUTES: 'Toutes',
  EN_ATTENTE: 'En attente',
  APPROUVEE: 'Approuvées',
  REFUSEE: 'Refusées',
};

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

function formatDate(value: string): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part.charAt(0));
  return (letters.join('') || '?').toLocaleUpperCase('fr-FR');
}

function ofName(name: string): string {
  const first = name.trim().split(/\s+/)[0] ?? name;
  return /^[aeiouyéèêàâîïôöûüh]/i.test(first) ? `d’${first}` : `de ${first}`;
}

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

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <path
        d="M4 4l8 8M12 4l-8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <path
        d="M4 6l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ClassChangeRequestsPage() {
  const [requests, setRequests] = useState<ClassChangeRequest[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [filter, setFilter] = useState<RequestFilter>('EN_ATTENTE');
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [pendingReview, setPendingReview] = useState<{
    request: ClassChangeRequest;
    decision: 'approve' | 'reject';
  } | null>(null);
  const [reviewNote, setReviewNote] = useState('');
  const [reviewError, setReviewError] = useState('');

  const loadRequests = useCallback(async (refresh = false) => {
    if (refresh) {
      setLoading(true);
      setError('');
    }
    try {
      const [requestList, classList, academicYearList] = await Promise.all([
        classChangeRequestsService.findAll(),
        classesService.findAll(),
        academicYearsService.findAll(),
      ]);
      setRequests(requestList);
      setClasses(classList);
      setAcademicYears(academicYearList);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRequests();
  }, [loadRequests]);

  const classesById = useMemo(
    () => new Map(classes.map((schoolClass) => [schoolClass.id, schoolClass])),
    [classes],
  );
  const academicYearsById = useMemo(
    () => new Map(academicYears.map((year) => [year.id, year])),
    [academicYears],
  );

  const counts = useMemo(
    () => ({
      TOUTES: requests.length,
      EN_ATTENTE: requests.filter((request) => request.status === 'EN_ATTENTE')
        .length,
      APPROUVEE: requests.filter((request) => request.status === 'APPROUVEE')
        .length,
      REFUSEE: requests.filter((request) => request.status === 'REFUSEE')
        .length,
    }),
    [requests],
  );

  const visibleRequests = useMemo(
    () =>
      filter === 'TOUTES'
        ? requests
        : requests.filter((request) => request.status === filter),
    [filter, requests],
  );

  const hasMissingDetails = requests.some((request) => {
    const fromClass = request.fromClass ?? classesById.get(request.fromClassId);
    const toClass = request.toClass ?? classesById.get(request.toClassId);
    const academicYear =
      request.academicYear ?? academicYearsById.get(request.academicYearId);

    return !request.studentProfile || !fromClass || !toClass || !academicYear;
  });

  const startReview = (
    request: ClassChangeRequest,
    decision: 'approve' | 'reject',
  ) => {
    setReviewNote('');
    setReviewError('');
    setPendingReview({ request, decision });
  };

  const cancelReview = () => {
    if (processingId !== null) return;
    setPendingReview(null);
    setReviewNote('');
    setReviewError('');
  };

  const handleReview = async (note: string) => {
    if (!pendingReview) return;
    const { request, decision } = pendingReview;
    if (request.status !== 'EN_ATTENTE') return;

    const studentName = request.studentProfile?.displayName ?? 'cet élève';
    if (note && note.length > 500) {
      setReviewError('Le motif ne doit pas dépasser 500 caractères.');
      return;
    }

    setProcessingId(request.id);
    setError('');
    setSuccessMessage('');

    try {
      const updated =
        decision === 'approve'
          ? await classChangeRequestsService.approve(request.id)
          : await classChangeRequestsService.reject(
              request.id,
              note ? { note } : {},
            );

      setPendingReview(null);
      setReviewNote('');
      setRequests((current) =>
        current.map((item) =>
          item.id === request.id
            ? {
                ...item,
                status: updated.status,
                reviewedById: updated.reviewedById,
                reviewedAt: updated.reviewedAt,
                note: updated.note,
              }
            : item,
        ),
      );
      setSuccessMessage(
        decision === 'approve'
          ? `La demande de ${studentName} a été approuvée.`
          : `La demande de ${studentName} a été refusée.`,
      );
    } catch (err) {
      setReviewError(getErrorMessage(err));
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="ccr-page">
      <header className="ccr-header">
        <div>
          <h1>Demandes de changement de classe</h1>
          <p>Examine les demandes des élèves pour la nouvelle année scolaire.</p>
        </div>
        <button
          type="button"
          className="ccr-refresh"
          onClick={() => void loadRequests(true)}
          disabled={loading || processingId !== null}
        >
          <RefreshIcon />
          Actualiser
        </button>
      </header>

      {successMessage && (
        <div className="ccr-message ccr-success" role="status">
          {successMessage}
        </div>
      )}
      {error && (
        <div className="ccr-message ccr-error" role="alert">
          {error}
        </div>
      )}
      {hasMissingDetails && (
        <div className="ccr-message ccr-warning" role="status">
          Certaines informations liées à des demandes ne sont pas disponibles.
          Vérifie que l’API est à jour, puis actualise la page.
        </div>
      )}

      <div className="ccr-summary">
        {(['EN_ATTENTE', 'APPROUVEE', 'REFUSEE'] as const).map((status) => {
          const active = filter === status;
          return (
            <button
              type="button"
              key={status}
              className={`ccr-stat ${active ? 'is-active' : ''}`}
              onClick={() => setFilter(status)}
              aria-pressed={active}
            >
              <span className="ccr-stat-label">{filterLabels[status]}</span>
              <strong>{counts[status].toLocaleString('fr-FR')}</strong>
              <span className="ccr-stat-hint">
                {active ? 'Affichées' : 'Afficher'}
              </span>
            </button>
          );
        })}
      </div>

      <section className="ccr-panel">
        <div className="ccr-panel-header">
          <div>
            <h2>Demandes reçues</h2>
            <p>Une demande approuvée met à jour la classe actuelle de l’élève.</p>
          </div>
          <label className="ccr-filter">
            <span>Afficher</span>
            <span className="ccr-select">
              <select
                value={filter}
                onChange={(event) =>
                  setFilter(event.target.value as RequestFilter)
                }
              >
                {(Object.keys(filterLabels) as RequestFilter[]).map((value) => (
                  <option key={value} value={value}>
                    {filterLabels[value]} ({counts[value]})
                  </option>
                ))}
              </select>
              <ChevronIcon />
            </span>
          </label>
        </div>

        {loading ? (
          <div className="ccr-empty">Chargement des demandes...</div>
        ) : visibleRequests.length === 0 ? (
          <div className="ccr-empty">
            Aucune demande{' '}
            {filter === 'TOUTES' ? '' : filterLabels[filter].toLowerCase()}.
          </div>
        ) : (
          <ul className="ccr-list">
            {visibleRequests.map((request) => {
              const isProcessing = processingId === request.id;
              const studentName =
                request.studentProfile?.displayName ??
                'Élève (profil indisponible)';
              const fromClass =
                request.fromClass ?? classesById.get(request.fromClassId);
              const toClass =
                request.toClass ?? classesById.get(request.toClassId);
              const academicYear =
                request.academicYear ??
                academicYearsById.get(request.academicYearId);

              const review =
                pendingReview?.request.id === request.id ? pendingReview : null;
              const isRepeat = request.fromClassId === request.toClassId;

              return (
                <li
                  key={request.id}
                  className={`ccr-item ${review ? 'is-reviewing' : ''}`}
                >
                  <div className="ccr-row">
                    <div className="ccr-student">
                      <span className="ccr-avatar" aria-hidden="true">
                        {getInitials(studentName)}
                      </span>
                      <div className="ccr-student-text">
                        <strong>{studentName}</strong>
                        <small>
                          {request.studentProfile?.schoolName ||
                            'Établissement non renseigné'}
                        </small>
                      </div>
                    </div>

                    <div className="ccr-transition">
                      <span className="ccr-chip">
                        {fromClass?.label ?? 'Indisponible'}
                      </span>
                      <span className="ccr-arrow" aria-hidden="true">
                        →
                      </span>
                      <span className="ccr-chip ccr-chip-target">
                        {toClass?.label ?? 'Indisponible'}
                      </span>
                      {isRepeat && <span className="ccr-tag">redouble</span>}
                    </div>

                    <time className="ccr-date" dateTime={request.createdAt}>
                      {formatDate(request.createdAt)}
                    </time>

                    <div className="ccr-actions">
                      {request.status === 'EN_ATTENTE' ? (
                        review ? (
                          <span className="ccr-confirm-hint">
                            Confirmer ci-dessous
                          </span>
                        ) : (
                          <>
                            <button
                              type="button"
                              className="ccr-button ccr-button-outline"
                              onClick={() => startReview(request, 'reject')}
                              disabled={isProcessing || processingId !== null}
                            >
                              <CrossIcon />
                              Refuser
                            </button>
                            <button
                              type="button"
                              className="ccr-button ccr-button-dark"
                              onClick={() => startReview(request, 'approve')}
                              disabled={isProcessing || processingId !== null}
                            >
                              <CheckIcon />
                              Approuver
                            </button>
                          </>
                        )
                      ) : (
                        <span
                          className={`ccr-status ccr-status-${request.status.toLowerCase()}`}
                        >
                          {filterLabels[request.status]}
                        </span>
                      )}
                    </div>
                  </div>

                  {request.status !== 'EN_ATTENTE' &&
                    (request.note || request.reviewedAt) && (
                      <p className="ccr-note">
                        {request.reviewedAt &&
                          `Traitée le ${formatDate(request.reviewedAt)}`}
                        {request.reviewedAt && request.note && ' · '}
                        {request.note && <>Note : {request.note}</>}
                      </p>
                    )}

                  {review && (
                    <div className="ccr-confirm">
                      <div className="ccr-confirm-body">
                        {review.decision === 'approve' ? (
                          <p>
                            La classe actuelle {ofName(studentName)} passera de{' '}
                            <strong>{fromClass?.label ?? 'sa classe'}</strong> à{' '}
                            <strong>{toClass?.label ?? 'la classe demandée'}</strong>
                            {academicYear?.label
                              ? ` pour ${academicYear.label}`
                              : ''}
                            .
                          </p>
                        ) : (
                          <>
                            <p>
                              Refuser la demande {ofName(studentName)} ? Tu peux
                              ajouter un motif (facultatif).
                            </p>
                            <label className="ccr-review-note">
                              <textarea
                                rows={3}
                                maxLength={500}
                                value={reviewNote}
                                placeholder="Motif du refus"
                                onChange={(event) => {
                                  setReviewNote(event.target.value);
                                  setReviewError('');
                                }}
                              />
                              <small>{reviewNote.length}/500 caractères</small>
                            </label>
                          </>
                        )}
                        {reviewError && (
                          <span className="ccr-confirm-error" role="alert">
                            {reviewError}
                          </span>
                        )}
                      </div>

                      <div className="ccr-confirm-actions">
                        <button
                          type="button"
                          className="ccr-link"
                          onClick={cancelReview}
                          disabled={isProcessing}
                        >
                          Annuler
                        </button>
                        <button
                          type="button"
                          className="ccr-button ccr-button-dark"
                          onClick={() => void handleReview(reviewNote.trim())}
                          disabled={isProcessing}
                        >
                          <CheckIcon />
                          {isProcessing ? 'Traitement...' : 'Confirmer'}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}