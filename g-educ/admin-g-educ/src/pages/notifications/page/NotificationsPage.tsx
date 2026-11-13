import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import ConfirmationModal from '../../../components/common/ConfirmationModal';
import { announcementsService } from '../../../services/announcements.service';
import { classesService } from '../../../services/classes.service';
import type { SchoolClass } from '../../../services/classes.types';
import type {
  AnnouncementResult,
  CreateAnnouncementDto,
} from '../../../services/announcements.types';

import './NotificationsPage.css';

type Audience = 'class' | 'all';

interface AnnouncementForm {
  audience: Audience;
  classId: string;
  title: string;
  body: string;
}

interface LastBroadcast {
  result: AnnouncementResult;
  audienceLabel: string;
  title: string;
  sentAt: number;
}

const EMPTY_FORM: AnnouncementForm = {
  audience: 'class',
  classId: '',
  title: '',
  body: '',
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

function timeAgo(timestamp: number): string {
  const minutes = Math.floor((Date.now() - timestamp) / 60000);
  if (minutes < 1) return 'à l’instant';
  if (minutes < 60) return `il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  return `il y a ${hours} h`;
}

const formatNumber = (value: number) => value.toLocaleString('fr-FR');

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <path
        d="M3.5 8.5l3 3 6-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path
        d="M14 2L7 9M14 2l-4.5 12-2.5-5-5-2.5L14 2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <circle cx="6" cy="5.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M1.5 13c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4M10.5 3.2a2.5 2.5 0 010 4.6M12 9.3c1.6.4 2.5 1.6 2.5 3.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 16 16" width="12" height="12" aria-hidden="true">
      <rect
        x="4"
        y="1.5"
        width="8"
        height="13"
        rx="1.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      <path d="M7 12.5h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export default function NotificationsPage() {
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [form, setForm] = useState<AnnouncementForm>(EMPTY_FORM);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [lastBroadcast, setLastBroadcast] = useState<LastBroadcast | null>(null);

  useEffect(() => {
    let active = true;
    void classesService
      .findAll()
      .then((classList) => {
        if (active) setClasses(classList);
      })
      .catch((loadError: unknown) => {
        if (active) setError(getErrorMessage(loadError));
      })
      .finally(() => {
        if (active) setLoadingClasses(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const selectedClass = classes.find(
    (schoolClass) => schoolClass.id === form.classId,
  );

  // Si l’API expose un effectif (ex. activeStudentCount), il sera affiché.
  const studentCount = (
    selectedClass as (SchoolClass & { activeStudentCount?: number }) | undefined
  )?.activeStudentCount;

  const audienceLabel =
    form.audience === 'class' && selectedClass
      ? selectedClass.label
      : 'tous les élèves actifs';

  const setAudience = (audience: Audience) => {
    setError('');
    setForm((current) => ({
      ...current,
      audience,
      classId: audience === 'all' ? '' : current.classId,
    }));
  };

  const handlePrepareAnnouncement = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const title = form.title.trim();
    const body = form.body.trim();

    if (form.audience === 'class' && !form.classId) {
      setError('Sélectionnez une classe.');
      return;
    }
    if (title.length < 3) {
      setError('Le titre doit contenir au moins trois caractères.');
      return;
    }
    if (title.length > 120) {
      setError('Le titre ne doit pas dépasser 120 caractères.');
      return;
    }
    if (body.length < 3) {
      setError('Le message doit contenir au moins trois caractères.');
      return;
    }
    if (body.length > 2000) {
      setError('Le message ne doit pas dépasser 2 000 caractères.');
      return;
    }

    setForm((current) => ({ ...current, title, body }));
    setConfirmationOpen(true);
  };

  const sendAnnouncement = async () => {
    const payload: CreateAnnouncementDto = {
      title: form.title.trim(),
      body: form.body.trim(),
      ...(form.audience === 'class' && form.classId && { classId: form.classId }),
    };

    setSubmitting(true);
    setError('');
    try {
      const result = await announcementsService.create(payload);
      setLastBroadcast({
        result,
        audienceLabel:
          form.audience === 'class' && selectedClass
            ? `${selectedClass.label}`
            : 'Tous les élèves actifs',
        title: payload.title,
        sentAt: Date.now(),
      });
      setConfirmationOpen(false);
      setForm(EMPTY_FORM);
    } catch (sendError) {
      setError(getErrorMessage(sendError));
    } finally {
      setSubmitting(false);
    }
  };

  const withoutDevice = lastBroadcast
    ? Math.max(lastBroadcast.result.created - lastBroadcast.result.pushSent, 0)
    : 0;

  return (
    <div className="notifications-page">
      <header className="notifications-header">
        <h1>Notifications</h1>
        <p>Diffuse une annonce aux élèves d’une classe ou à tous les élèves actifs.</p>
      </header>

      {error && !confirmationOpen && loadingClasses === false && classes.length === 0 && (
        <div className="notifications-message notifications-error" role="alert">
          {error}
        </div>
      )}

      <div className="notifications-layout">
        {/* ───────────── Composer ───────────── */}
        <form
          className="notifications-card announcement-form"
          onSubmit={handlePrepareAnnouncement}
        >
          <h2 className="notifications-card-title">Rédiger une annonce</h2>

          {error && !confirmationOpen && classes.length > 0 && (
            <div className="notifications-message notifications-error" role="alert">
              {error}
            </div>
          )}

          <fieldset className="announcement-field">
            <legend>Destinataires</legend>

            <div className="audience-options" role="radiogroup">
              <button
                type="button"
                role="radio"
                aria-checked={form.audience === 'class'}
                className={`audience-option ${form.audience === 'class' ? 'is-selected' : ''}`}
                onClick={() => setAudience('class')}
                disabled={submitting}
              >
                <span className="audience-option-text">
                  <strong>Une classe</strong>
                  <small>Les élèves inscrits dans la classe choisie</small>
                </span>
                <span className="audience-radio" aria-hidden="true">
                  {form.audience === 'class' && <CheckIcon />}
                </span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={form.audience === 'all'}
                className={`audience-option ${form.audience === 'all' ? 'is-selected' : ''}`}
                onClick={() => setAudience('all')}
                disabled={submitting}
              >
                <span className="audience-option-text">
                  <strong>Tous les élèves actifs</strong>
                  <small>Toutes les classes en une seule fois</small>
                </span>
                <span className="audience-radio" aria-hidden="true">
                  {form.audience === 'all' && <CheckIcon />}
                </span>
              </button>
            </div>

            {form.audience === 'class' && (
              <div className="class-chips" role="listbox" aria-label="Classe">
                {loadingClasses && <span className="class-chips-hint">Chargement…</span>}
                {classes.map((schoolClass) => (
                  <button
                    key={schoolClass.id}
                    type="button"
                    role="option"
                    aria-selected={form.classId === schoolClass.id}
                    className={`class-chip ${form.classId === schoolClass.id ? 'is-selected' : ''}`}
                    onClick={() =>
                      setForm((current) => ({ ...current, classId: schoolClass.id }))
                    }
                    disabled={submitting}
                    title={schoolClass.code}
                  >
                    {schoolClass.label}
                  </button>
                ))}
              </div>
            )}
          </fieldset>

          <label className="announcement-field">
            <span className="announcement-field-head">
              Titre
              <small>{form.title.length}/120 caractères</small>
            </span>
            <input
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              placeholder="Ex. Sujets du BAC blanc disponibles"
              minLength={3}
              maxLength={120}
              required
              disabled={submitting}
            />
          </label>

          <label className="announcement-field">
            <span className="announcement-field-head">
              Message
              <small>{formatNumber(form.body.length)}/2 000 caractères</small>
            </span>
            <textarea
              value={form.body}
              onChange={(event) =>
                setForm((current) => ({ ...current, body: event.target.value }))
              }
              placeholder="Écris ton message aux élèves…"
              minLength={3}
              maxLength={2000}
              rows={7}
              required
              disabled={submitting}
            />
          </label>

          <div className="announcement-form-footer">
            <span className="announcement-recipients">
              <UsersIcon />
              {form.audience === 'all'
                ? 'Tous les élèves actifs'
                : selectedClass
                  ? typeof studentCount === 'number'
                    ? `${formatNumber(studentCount)} élèves actifs en ${selectedClass.label}`
                    : `Élèves actifs en ${selectedClass.label}`
                  : 'Aucune classe sélectionnée'}
            </span>
            <button
              type="submit"
              className="notifications-button notifications-button-dark"
              disabled={submitting || loadingClasses}
            >
              <SendIcon />
              Diffuser l’annonce
            </button>
          </div>
        </form>

        {/* ───────────── Colonne de droite ───────────── */}
        <aside className="notifications-side">
          <section className="notifications-preview" aria-label="Aperçu">
            <p className="notifications-preview-label">
              <PhoneIcon />
              Ce que verront les élèves
            </p>

            <div className="push-preview">
              <span className="push-preview-logo" aria-hidden="true">
                G·
              </span>
              <div className="push-preview-content">
                <div className="push-preview-top">
                  <strong>{form.title.trim() || 'Titre de l’annonce'}</strong>
                  <time>maint.</time>
                </div>
                <p>
                  {form.body.trim() ||
                    'Le message apparaîtra ici, tel qu’il sera lu sur le téléphone.'}
                </p>
              </div>
            </div>

            <p className="notifications-preview-note">
              Push sur les téléphones enregistrés. L’annonce reste aussi dans
              l’onglet Notifications de l’app.
            </p>
          </section>

          <section className="notifications-card last-broadcast">
            <header className="last-broadcast-head">
              <h2>Dernière diffusion</h2>
              {lastBroadcast && (
                <span className="status-badge">
                  <CheckIcon />
                  Envoyée
                </span>
              )}
            </header>

            {lastBroadcast ? (
              <>
                <p className="last-broadcast-meta">
                  {lastBroadcast.title} · {lastBroadcast.audienceLabel} ·{' '}
                  {timeAgo(lastBroadcast.sentAt)}
                </p>

                <dl className="stat-list">
                  <div className="stat-row">
                    <dt>notifications enregistrées dans l’app</dt>
                    <dd>{formatNumber(lastBroadcast.result.created)}</dd>
                  </div>
                  <div className="stat-row">
                    <dt>push envoyés sur les appareils</dt>
                    <dd>{formatNumber(lastBroadcast.result.pushSent)}</dd>
                  </div>
                  <div className="stat-row">
                    <dt>élèves sans appareil enregistré</dt>
                    <dd>{formatNumber(withoutDevice)}</dd>
                  </div>
                </dl>
              </>
            ) : (
              <p className="last-broadcast-empty">
                Aucune annonce envoyée pendant cette session. Le résultat de ta
                prochaine diffusion s’affichera ici.
              </p>
            )}

            <p className="last-broadcast-note">
              Chiffres renvoyés par le serveur à l’envoi. L’historique des
              annonces n’est pas encore géré côté administration.
            </p>
          </section>
        </aside>
      </div>

      {confirmationOpen && (
        <ConfirmationModal
          title="Confirmer l’envoi"
          message={
            selectedClass && form.audience === 'class'
              ? `Cette annonce sera envoyée aux élèves actifs de ${selectedClass.label} (${selectedClass.code}). L’envoi est immédiat et ne peut pas être annulé.`
              : 'Cette annonce sera envoyée à tous les élèves actifs de la plateforme. L’envoi est immédiat et ne peut pas être annulé.'
          }
          confirmLabel="Diffuser l’annonce"
          loading={submitting}
          error={error}
          onCancel={() => {
            if (!submitting) {
              setConfirmationOpen(false);
              setError('');
            }
          }}
          onConfirm={() => void sendAnnouncement()}
        >
          <div className="announcement-confirm-preview">
            <strong>{form.title}</strong>
            <p>{form.body}</p>
          </div>
        </ConfirmationModal>
      )}
    </div>
  );
}