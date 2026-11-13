import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';

import ConfirmationModal from '../../../components/common/ConfirmationModal';
import { classSubjectsService } from '../../../services/class-subjects.service';
import { classesService } from '../../../services/classes.service';
import { eventsService } from '../../../services/events.service';
import type { SchoolClass } from '../../../services/classes.types';
import type { ClassSubject } from '../../../services/class-subjects.types';
import type {
  CreateEventDto,
  EventType,
  SchoolEvent,
  UpdateEventDto,
} from '../../../services/events.types';

import './EventsPage.css';

interface EventForm {
  classIds: string[];
  type: EventType;
  title: string;
  description: string;
  subjectId: string;
  date: string;
  startTime: string;
  endTime: string;
}

const eventTypeLabels: Record<EventType, string> = {
  EXAMEN: 'Examen',
  DEVOIR: 'Devoir',
  AUTRE: 'Autre',
};
const eventTypes: EventType[] = ['EXAMEN', 'DEVOIR', 'AUTRE'];
const weekdays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const reminderLabels = ['Annonce dès la publication', '7 jours avant', 'La veille', 'Le jour même'];

const pad = (n: number) => String(n).padStart(2, '0');
const dateKey = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const timeKey = (d: Date) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

function emptyForm(date: string, classIds: string[] = []): EventForm {
  return { classIds, type: 'EXAMEN', title: '', description: '', subjectId: '', date, startTime: '08:00', endTime: '' };
}

function formFromEvent(e: SchoolEvent): EventForm {
  const start = new Date(e.startsAt);
  const end = e.endsAt ? new Date(e.endsAt) : null;
  return {
    classIds: [e.classId],
    type: e.type,
    title: e.title,
    description: e.description ?? '',
    subjectId: e.subjectId ?? '',
    date: dateKey(start),
    startTime: timeKey(start),
    endTime: end ? timeKey(end) : '',
  };
}

function toIso(date: string, time: string): string | undefined {
  if (!date || !time) return undefined;
  const d = new Date(`${date}T${time}`);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const message = (error as { response?: { data?: { message?: string | string[] } } }).response?.data?.message;
    if (Array.isArray(message)) return message.join(', ');
    if (message) return message;
  }
  return 'Une erreur est survenue. Veuillez réessayer.';
}

export default function EventsPage() {
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [classSubjects, setClassSubjects] = useState<ClassSubject[]>([]);
  const [classFilter, setClassFilter] = useState('TOUS');
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [form, setForm] = useState<EventForm>(() => emptyForm(dateKey(new Date())));
  const [editingEvent, setEditingEvent] = useState<SchoolEvent | null>(null);
  const [reminders, setReminders] = useState([true, true, true, true]);
  const [archiveTarget, setArchiveTarget] = useState<SchoolEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [pageError, setPageError] = useState('');
  const [formError, setFormError] = useState('');
  const [actionError, setActionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchData = useCallback(
    () => Promise.all([eventsService.findAll(), classesService.findAll(), classSubjectsService.findAllAssignments()]),
    [],
  );
  const applyData = useCallback(([e, c, a]: Awaited<ReturnType<typeof fetchData>>) => {
    setEvents(e);
    setClasses(c);
    setClassSubjects(a);
  }, []);

  useEffect(() => {
    let active = true;
    void fetchData()
      .then((d) => active && applyData(d))
      .catch((err: unknown) => active && setPageError(getErrorMessage(err)))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [applyData, fetchData]);

  const eventsByDay = useMemo(() => {
    const map = new Map<string, SchoolEvent[]>();
    events
      .filter((e) => classFilter === 'TOUS' || e.classId === classFilter)
      .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
      .forEach((e) => {
        const key = dateKey(new Date(e.startsAt));
        map.set(key, [...(map.get(key) ?? []), e]);
      });
    return map;
  }, [events, classFilter]);

  const cells = useMemo(() => {
    const offset = (month.getDay() + 6) % 7;
    const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [...Array<null>(offset).fill(null), ...Array.from({ length: days }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
  }, [month]);

  const singleClassId = form.classIds.length === 1 ? form.classIds[0] : '';
  const availableSubjects = useMemo(
    () => classSubjects.filter((a) => a.classId === singleClassId),
    [classSubjects, singleClassId],
  );
  const selectedClasses = form.classIds
    .map((id) => classes.find((c) => c.id === id))
    .filter((c): c is SchoolClass => Boolean(c));
  const studentsLabel = selectedClasses.map((c) => c.code).join(', ');

  const todayKey = dateKey(new Date());
  const monthName = month.toLocaleDateString('fr-FR', { month: 'long' });
  const shiftMonth = (delta: number) => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));

  const startNew = (date: string) => {
    setEditingEvent(null);
    setForm(emptyForm(date, classFilter === 'TOUS' ? [] : [classFilter]));
    setFormError('');
  };
  const startEdit = (e: SchoolEvent) => {
    setEditingEvent(e);
    setForm(formFromEvent(e));
    setFormError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (submit: FormEvent<HTMLFormElement>) => {
    submit.preventDefault();
    setFormError('');
    const title = form.title.trim();
    const startsAt = toIso(form.date, form.startTime);
    const endsAt = form.endTime ? toIso(form.date, form.endTime) : undefined;
    if (form.classIds.length === 0) return setFormError('Sélectionnez au moins une classe.');
    if (title.length < 2) return setFormError('Le titre doit contenir au moins deux caractères.');
    if (!startsAt) return setFormError('Saisissez une date et une heure valides.');
    if (endsAt && new Date(endsAt) <= new Date(startsAt))
      return setFormError('L’heure de fin doit être postérieure à l’heure de début.');
    if (form.subjectId && !availableSubjects.some((a) => a.subjectId === form.subjectId))
      return setFormError('Sélectionnez une matière enseignée dans cette classe.');

    setSaving(true);
    setSuccessMessage('');
    const subject = availableSubjects.find((a) => a.subjectId === form.subjectId);
    const subjectRef = subject ? { id: subject.subject.id, name: subject.subject.name } : null;

    try {
      if (editingEvent) {
        const payload: UpdateEventDto = {
          type: form.type,
          title,
          description: form.description.trim(),
          subjectId: form.subjectId || null,
          startsAt,
          endsAt: endsAt ?? null,
        };
        const updated = await eventsService.update(editingEvent.id, payload);
        setEvents((cur) =>
          cur.map((it) => (it.id === updated.id ? { ...it, ...updated, class: it.class, subject: subjectRef } : it)),
        );
        setSuccessMessage('L’événement a été modifié.');
      } else {
        const created = await Promise.all(
          form.classIds.map((classId) => {
            const payload: CreateEventDto = {
              classId,
              type: form.type,
              title,
              description: form.description.trim() || undefined,
              subjectId: form.classIds.length === 1 ? form.subjectId || undefined : undefined,
              startsAt,
              endsAt,
            };
            return eventsService.create(payload);
          }),
        );
        setEvents((cur) => [
          ...cur,
          ...created.map((ev) => {
            const c = classes.find((x) => x.id === ev.classId);
            return {
              ...ev,
              class: c ? { id: c.id, code: c.code, label: c.label } : undefined,
              subject: form.classIds.length === 1 ? subjectRef : null,
            };
          }),
        ]);
        setSuccessMessage('L’événement a été publié. Une annonce a été envoyée aux classes concernées.');
        startNew(form.date);
        return;
      }
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const confirmArchive = async () => {
    if (!archiveTarget) return;
    setProcessingId(archiveTarget.id);
    setActionError('');
    try {
      await eventsService.archive(archiveTarget.id);
      setEvents((cur) => cur.filter((e) => e.id !== archiveTarget.id));
      if (editingEvent?.id === archiveTarget.id) startNew(form.date);
      setSuccessMessage('L’événement a été archivé.');
      setArchiveTarget(null);
    } catch (err) {
      setActionError(getErrorMessage(err));
    } finally {
      setProcessingId(null);
    }
  };

  const refreshData = () => {
    setLoading(true);
    setPageError('');
    void fetchData()
      .then(applyData)
      .catch((err: unknown) => setPageError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  const addableClasses = classes.filter((c) => !form.classIds.includes(c.id));

  return (
    <div className="events-page">
      <header className="events-header">
        <div>
          <h1>Événements</h1>
          <p>Examens et devoirs officiels. Les élèves des classes choisies sont prévenus.</p>
        </div>
        <div className="events-header-actions">
          <button type="button" className="events-button events-button-secondary" onClick={refreshData}
            disabled={loading || saving || processingId !== null}>Actualiser</button>
          <button type="button" className="events-button events-button-primary"
            onClick={() => startNew(todayKey)} disabled={classes.length === 0 || loading || saving}>
            + Nouvel événement
          </button>
        </div>
      </header>

      {pageError && <div className="events-message events-error" role="alert">{pageError}</div>}
      {successMessage && <div className="events-message events-success" role="status">{successMessage}</div>}

      <div className="events-layout">
        <section className="events-card calendar">
          <div className="calendar-head">
            <div className="calendar-title">
              <button type="button" className="cal-nav" aria-label="Mois précédent" onClick={() => shiftMonth(-1)}>‹</button>
              <h2>
                <span className="month-name">{monthName.charAt(0).toUpperCase() + monthName.slice(1)}</span>{' '}
                <em>{month.getFullYear()}</em>
              </h2>
              <button type="button" className="cal-nav" aria-label="Mois suivant" onClick={() => shiftMonth(1)}>›</button>
            </div>
            <div className="calendar-legend">
              <select aria-label="Filtrer par classe" value={classFilter} onChange={(e) => setClassFilter(e.target.value)}>
                <option value="TOUS">Toutes les classes</option>
                {classes.map((c) => <option key={c.id} value={c.id}>{c.label} ({c.code})</option>)}
              </select>
              <span><i className="dot dot-examen" />Examen</span>
              <span><i className="dot dot-devoir" />Devoir</span>
            </div>
          </div>

          <div className="calendar-grid" role="grid" aria-busy={loading}>
            {weekdays.map((d) => <div key={d} className="calendar-weekday" role="columnheader">{d}</div>)}
            {cells.map((day, i) => {
              if (!day) return <div key={`blank-${i}`} className="calendar-blank" />;
              const key = dateKey(day);
              const dayEvents = eventsByDay.get(key) ?? [];
              const isSelected = form.date === key;
              return (
                <div key={key} role="gridcell"
                  className={`calendar-day${isSelected ? ' is-selected' : ''}${key === todayKey ? ' is-today' : ''}`}>
                  <button type="button" className="calendar-day-hit" aria-label={`Créer un événement le ${key}`}
                    onClick={() => startNew(key)}>
                    <span className="day-number">{day.getDate()}</span>
                  </button>
                  {dayEvents.slice(0, 2).map((e) => (
                    <button key={e.id} type="button" title={e.title}
                      className={`day-chip day-chip-${e.type.toLowerCase()}`} onClick={() => startEdit(e)}>
                      {e.title}
                    </button>
                  ))}
                  {dayEvents.length > 2 && <span className="day-more">+{dayEvents.length - 2}</span>}
                </div>
              );
            })}
          </div>
        </section>

        <form className="events-card event-panel" onSubmit={(e) => void handleSubmit(e)}>
          <div>
            <label className="panel-block">
              <span className="panel-label">Titre de l’événement</span>
              <input className="panel-input panel-event-title" type="text"
                placeholder="Ex. Examen de mathématiques"
                minLength={2} maxLength={150} required value={form.title}
                onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))} />
            </label>
            <p className="panel-sub">
              {editingEvent ? 'Publié · modifiable' : 'Nouveau · annoncé dès la publication'}
            </p>
          </div>

          {formError && <div className="events-message events-error" role="alert">{formError}</div>}

          <div className="panel-block">
            <span className="panel-label">Type</span>
            <div className="segmented segmented-full" role="tablist">
              {eventTypes.map((t) => (
                <button key={t} type="button" role="tab" aria-selected={form.type === t}
                  className={form.type === t ? 'is-active' : ''}
                  onClick={() => setForm((c) => ({ ...c, type: t }))}>
                  {eventTypeLabels[t]}
                </button>
              ))}
            </div>
          </div>

          <div className="panel-block">
            <span className="panel-label">Classes concernées</span>
            <div className="class-chips">
              {selectedClasses.map((c) => (
                <span key={c.id} className="class-chip">
                  {c.code}
                  {!editingEvent && (
                    <button type="button" aria-label={`Retirer ${c.label}`}
                      onClick={() => setForm((cur) => ({ ...cur, classIds: cur.classIds.filter((id) => id !== c.id), subjectId: '' }))}>
                      ×
                    </button>
                  )}
                </span>
              ))}
              {!editingEvent && addableClasses.length > 0 && (
                <select className="class-add" aria-label="Ajouter une classe" value=""
                  onChange={(e) => e.target.value && setForm((c) => ({ ...c, classIds: [...c.classIds, e.target.value], subjectId: '' }))}>
                  <option value="">+ Ajouter</option>
                  {addableClasses.map((c) => <option key={c.id} value={c.id}>{c.label} ({c.code})</option>)}
                </select>
              )}
            </div>
          </div>

          <div className="datetime-grid">
            <label className="tile">
              <span>Date</span>
              <input type="date" required value={form.date}
                onChange={(e) => setForm((c) => ({ ...c, date: e.target.value }))} />
            </label>
            <label className="tile">
              <span>Heure</span>
              <input type="time" required value={form.startTime}
                onChange={(e) => setForm((c) => ({ ...c, startTime: e.target.value }))} />
            </label>
            <label className="tile">
              <span>Fin (facultatif)</span>
              <input type="time" value={form.endTime}
                onChange={(e) => setForm((c) => ({ ...c, endTime: e.target.value }))} />
            </label>
          </div>

          <label className="panel-block">
            <span className="panel-label">Matière (facultative)</span>
            <select className="panel-input" value={form.subjectId} disabled={!singleClassId || saving}
              onChange={(e) => setForm((c) => ({ ...c, subjectId: e.target.value }))}>
              <option value="">{singleClassId ? 'Toutes les matières' : 'Choisissez une seule classe'}</option>
              {availableSubjects.map((a) => <option key={a.subjectId} value={a.subjectId}>{a.subject.name}</option>)}
            </select>
          </label>

          <label className="panel-block">
            <span className="panel-label">Description (facultative)</span>
            <textarea className="panel-input" rows={3} maxLength={5000} value={form.description}
              onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))} />
          </label>

          <div className="panel-block">
            <span className="panel-label">
              Rappels envoyés aux élèves{studentsLabel ? ` de ${studentsLabel}` : ''} <em>(maquette)</em>
            </span>
            {reminderLabels.map((label, i) => (
              <label key={label} className="reminder-row">
                <span>{label}</span>
                <input type="checkbox" role="switch" checked={reminders[i]}
                  onChange={() => setReminders((r) => r.map((v, j) => (j === i ? !v : v)))} />
              </label>
            ))}
          </div>

          <div className="panel-actions">
            {editingEvent ? (
              <>
                <button type="button" className="events-button events-button-secondary events-archive-button"
                  disabled={saving || processingId !== null}
                  onClick={() => { setActionError(''); setArchiveTarget(editingEvent); }}>Archiver</button>
                <button type="submit" className="events-button events-button-primary" disabled={saving}>
                  {saving ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </>
            ) : (
              <>
                <button type="button" className="events-button events-button-secondary"
                  disabled={saving} onClick={() => startNew(form.date)}>Réinitialiser</button>
                <button type="submit" className="events-button events-button-primary" disabled={saving || loading}>
                  {saving ? 'Publication...' : 'Publier et prévenir'}
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {archiveTarget && (
        <ConfirmationModal
          title="Archiver l’événement"
          message={`Voulez-vous archiver « ${archiveTarget.title} » ? Il ne sera plus visible dans le calendrier.`}
          confirmLabel="Archiver"
          destructive
          loading={processingId === archiveTarget.id}
          error={actionError}
          onCancel={() => { if (processingId === null) { setArchiveTarget(null); setActionError(''); } }}
          onConfirm={() => void confirmArchive()}
        />
      )}
    </div>
  );
}