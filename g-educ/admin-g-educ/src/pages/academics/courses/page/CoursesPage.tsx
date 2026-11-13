import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';

import ConfirmationModal from '../../../../components/common/ConfirmationModal';
import { chaptersService } from '../../../../services/chapters.service';
import { lessonsService } from '../../../../services/lessons.service';
import type { Chapter } from '../../../../services/chapters.types';
import type {
  CreateLessonDto,
  Lesson,
  LessonDetails,
  LessonStatus,
  LessonType,
  UpdateLessonDto,
} from '../../../../services/lessons.types';

import './CoursesPage.css';

type StatusFilter = 'TOUS' | LessonStatus;

const statusLabels: Record<LessonStatus, string> = {
  BROUILLON: 'Brouillon',
  PUBLIE: 'Publié',
  ARCHIVE: 'Archivé',
};
const typeLabels: Record<LessonType, string> = {
  TEXTE: 'Texte',
  PDF: 'PDF',
  VIDEO: 'Vidéo',
};
const typeIcons: Record<LessonType, string> = { TEXTE: 'T', PDF: '▤', VIDEO: '▶' };

interface LessonForm {
  chapterId: string;
  title: string;
  type: LessonType;
  contentMarkdown: string;
  position: string;
}
const emptyForm: LessonForm = {
  chapterId: '',
  title: '',
  type: 'TEXTE',
  contentMarkdown: '',
  position: '1',
};

type LessonAction =
  | { kind: 'publish' | 'archive'; lesson: Pick<Lesson, 'id' | 'title'> }
  | { kind: 'deleteAsset'; lesson: LessonDetails; assetId: string };

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const message = (
      error as { response?: { data?: { message?: string | string[] } } }
    ).response?.data?.message;
    if (Array.isArray(message)) return message.join(', ');
    if (message) return message;
  }
  return 'Une erreur est survenue. Veuillez réessayer.';
}

const formatFileSize = (b: number) => `${(b / (1024 * 1024)).toFixed(2)} Mo`;

function getChapterLabel(c: Chapter): string {
  return `${c.classSubject.class.label} (${c.classSubject.class.code}) · ${c.classSubject.subject.name} · ${c.title}`;
}

const nextPositionFor = (lessons: Lesson[], chapterId: string) =>
  lessons
    .filter((l) => l.chapterId === chapterId)
    .reduce((max, l) => Math.max(max, l.position), -1) + 2;

export default function CoursesPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState('TOUS');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('TOUS');
  const [typeFilter, setTypeFilter] = useState<'TOUS' | LessonType>('TOUS');
  const [form, setForm] = useState<LessonForm>(emptyForm);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<LessonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [saving, setSaving] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<File | null>(null);
  const [lessonAction, setLessonAction] = useState<LessonAction | null>(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [flame, setFlame] = useState(true);

  const fetchData = useCallback(async () => {
    const [chapterList, lessonList] = await Promise.all([
      chaptersService.findAll(),
      lessonsService.findAll(),
    ]);
    return { chapters: chapterList, lessons: lessonList };
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchData();
      setChapters(data.chapters);
      setLessons(data.lessons);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    let active = true;
    void fetchData()
      .then((d) => {
        if (active) {
          setChapters(d.chapters);
          setLessons(d.lessons);
        }
      })
      .catch((err: unknown) => active && setError(getErrorMessage(err)))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [fetchData]);

  const chaptersById = useMemo(
    () => new Map(chapters.map((c) => [c.id, c])),
    [chapters],
  );
  const activeChapters = useMemo(
    () => chapters.filter((c) => c.status !== 'ARCHIVE'),
    [chapters],
  );

  const visibleLessons = useMemo(
    () =>
      lessons
        .filter(
          (l) =>
            (selectedChapterId === 'TOUS' || l.chapterId === selectedChapterId) &&
            (statusFilter === 'TOUS' || l.status === statusFilter) &&
            (typeFilter === 'TOUS' || l.type === typeFilter),
        )
        .sort((a, b) => {
          const ac = chaptersById.get(a.chapterId)?.title ?? a.chapter.title;
          const bc = chaptersById.get(b.chapterId)?.title ?? b.chapter.title;
          return ac.localeCompare(bc, 'fr') || a.position - b.position;
        }),
    [chaptersById, lessons, selectedChapterId, statusFilter, typeFilter],
  );

  const resetMessages = () => {
    setError('');
    setSuccessMessage('');
  };

  const openCreateForm = () => {
    const chapterId =
      selectedChapterId === 'TOUS' ? activeChapters[0]?.id ?? '' : selectedChapterId;
    setForm({
      ...emptyForm,
      chapterId,
      position: String(nextPositionFor(lessons, chapterId)),
    });
    setSelectedLesson(null);
    setSelectedPdf(null);
    setFormOpen(true);
    resetMessages();
  };

  const openEditForm = async (lesson: Lesson) => {
    setLoadingDetails(true);
    resetMessages();
    setFormOpen(true);
    setSelectedLesson(null);
    try {
      const d = await lessonsService.findOne(lesson.id);
      setSelectedLesson(d);
      setForm({
        chapterId: d.chapterId,
        title: d.title,
        type: d.type,
        contentMarkdown: d.contentMarkdown ?? '',
        position: String(d.position + 1),
      });
      setSelectedPdf(null);
    } catch (err) {
      setError(getErrorMessage(err));
      setFormOpen(false);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeForm = () => {
    setFormOpen(false);
    setSelectedLesson(null);
    setSelectedPdf(null);
    setForm(emptyForm);
    resetMessages();
  };

  const refreshLessons = async () => setLessons(await lessonsService.findAll());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = form.title.trim();
    const order = Number(form.position);
    if (title.length < 2) return setError('Le titre doit contenir au moins deux caractères.');
    if (!Number.isInteger(order) || order < 1)
      return setError('L’ordre doit être un nombre entier supérieur ou égal à 1.');
    if (!selectedLesson && !form.chapterId) return setError('Sélectionnez un chapitre.');
    if (form.type === 'TEXTE' && !form.contentMarkdown.trim())
      return setError('Le contenu est obligatoire pour une leçon texte.');

    setSaving(true);
    resetMessages();
    let lessonWasCreated = false;

    try {
      let lessonId: string;
      if (selectedLesson) {
        const payload: UpdateLessonDto = {
          title,
          position: order - 1,
          ...(form.type === 'TEXTE' && { contentMarkdown: form.contentMarkdown }),
        };
        const updated = await lessonsService.update(selectedLesson.id, payload);
        lessonId = updated.id;
        setSelectedLesson(updated);
      } else {
        const payload: CreateLessonDto = {
          title,
          type: form.type,
          position: order - 1,
          ...(form.type === 'TEXTE' && { contentMarkdown: form.contentMarkdown }),
        };
        const created = await lessonsService.create(form.chapterId, payload);
        lessonWasCreated = true;
        lessonId = created.id;
        setForm((c) => ({ ...c, position: String(order) }));
        setSelectedLesson(await lessonsService.findOne(created.id));
      }

      if (form.type === 'PDF' && selectedPdf) {
        setUploadingPdf(true);
        try {
          await lessonsService.uploadPdf(lessonId, selectedPdf);
        } catch (uploadError) {
          setError(
            `${lessonWasCreated ? 'Le brouillon a été créé, mais' : 'La leçon a été enregistrée, mais'} le téléversement a échoué : ${getErrorMessage(uploadError)}`,
          );
          return;
        }
        setSelectedLesson(await lessonsService.findOne(lessonId));
        setSelectedPdf(null);
        setSuccessMessage('La leçon et son fichier PDF ont été enregistrés.');
      } else {
        setSuccessMessage(
          form.type === 'PDF' && !selectedLesson
            ? 'Le brouillon est créé. Sélectionnez son PDF puis enregistrez pour le téléverser.'
            : 'La leçon a été enregistrée.',
        );
      }
      await refreshLessons();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setUploadingPdf(false);
      setSaving(false);
    }
  };

  const confirmLessonAction = async () => {
    if (!lessonAction) return;
    resetMessages();
    try {
      if (lessonAction.kind === 'deleteAsset') {
        setProcessingId(lessonAction.assetId);
        await lessonsService.deleteAsset(lessonAction.lesson.id, lessonAction.assetId);
        setSelectedLesson(await lessonsService.findOne(lessonAction.lesson.id));
        await refreshLessons();
        setSuccessMessage('Le fichier PDF a été supprimé.');
      } else {
        setProcessingId(lessonAction.lesson.id);
        if (lessonAction.kind === 'publish') await lessonsService.publish(lessonAction.lesson.id);
        else await lessonsService.archive(lessonAction.lesson.id);
        await refreshLessons();
        if (selectedLesson?.id === lessonAction.lesson.id) {
          setSelectedLesson(await lessonsService.findOne(lessonAction.lesson.id));
        }
        setSuccessMessage(
          lessonAction.kind === 'publish' ? 'La leçon a été publiée.' : 'La leçon a été archivée.',
        );
      }
      setLessonAction(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setProcessingId(null);
    }
  };

  const busy = saving || uploadingPdf || processingId !== null;
  const currentChapter = chaptersById.get(selectedLesson?.chapterId ?? form.chapterId);
  const pdfEditable = !selectedLesson || selectedLesson.status === 'BROUILLON';

  const messages = (
    <>
      {error && !lessonAction && (
        <div className="courses-message courses-error" role="alert">{error}</div>
      )}
      {successMessage && (
        <div className="courses-message courses-success" role="status">{successMessage}</div>
      )}
    </>
  );

  /* ───────────── Éditeur ───────────── */
  const editor = (
    <div className="courses-page">
      <header className="courses-header">
        <div>
          <button type="button" className="courses-back" onClick={closeForm} disabled={busy}>
            ← Contenus
          </button>
          <h1>{form.title.trim() || (selectedLesson ? 'Leçon' : 'Nouvelle leçon')}</h1>
          <p>
            {currentChapter
              ? `${currentChapter.classSubject.class.code} · ${currentChapter.classSubject.subject.name} · ${currentChapter.title}`
              : 'Choisissez un chapitre'}
            {' · '}Leçon {form.position}
          </p>
        </div>
        <div className="courses-header-actions">
          <button type="button" className="courses-text-button" disabled title="Bientôt">
            Aperçu élève
          </button>
          <button type="submit" form="lesson-form"
            className="courses-button courses-button-secondary"
            disabled={busy || loadingDetails || form.type === 'VIDEO'}>
            {uploadingPdf ? 'Téléversement...' : saving ? 'Enregistrement...'
              : selectedPdf ? 'Enregistrer et téléverser' : 'Enregistrer le brouillon'}
          </button>
          {selectedLesson?.status === 'BROUILLON' && (
            <button type="button" className="courses-button courses-button-primary"
              disabled={busy}
              onClick={() => { setError(''); setLessonAction({ kind: 'publish', lesson: selectedLesson }); }}>
              Publier
            </button>
          )}
        </div>
      </header>

      {messages}

      {loadingDetails ? (
        <div className="courses-empty">Chargement de la leçon...</div>
      ) : (
        <form id="lesson-form" className="editor-grid"
          onSubmit={(e) => void handleSubmit(e)}>
          <section className="courses-card editor-main">
            <div className="segmented" role="tablist" aria-label="Type de leçon">
              {(['TEXTE', 'PDF', 'VIDEO'] as const).map((t) => (
                <button key={t} type="button" role="tab" aria-selected={form.type === t}
                  className={form.type === t ? 'is-active' : ''}
                  disabled={!!selectedLesson}
                  onClick={() => {
                    setForm((c) => ({ ...c, type: t }));
                    if (t !== 'PDF') setSelectedPdf(null);
                  }}>
                  {typeLabels[t]}
                </button>
              ))}
            </div>

            <label className="field">
              <span>Titre</span>
              <input className="field-title" required minLength={2} maxLength={255}
                value={form.title}
                onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))} />
            </label>

            {form.type === 'TEXTE' && (
              <label className="field">
                <span>Contenu de la leçon (Markdown)</span>
                <textarea required rows={14} value={form.contentMarkdown}
                  onChange={(e) => setForm((c) => ({ ...c, contentMarkdown: e.target.value }))} />
              </label>
            )}

            {form.type === 'VIDEO' && (
              <div className="video-grid">
                <div className="video-col">
                  <div className="video-player" aria-label="Aperçu vidéo (maquette)">
                    <span className="video-formula">z = r(cos θ + i sin θ)</span>
                    <span className="video-time">18:04</span>
                  </div>
                  <p className="video-file"><strong>{form.title.trim() ? `${form.title.trim().toLowerCase().replace(/\s+/g, '-')}.mp4` : 'video.mp4'}</strong><small>Source 1080p · envoyée par vous</small></p>
                  {[['240p', 'Prêt', '36 Mo'], ['360p', 'Prêt', '71 Mo'], ['480p', 'Encodage 62 %', '']].map(([q, st, size]) => (
                    <div className="video-quality" key={q}>
                      <span className={st.startsWith('Prêt') ? 'q-ok' : 'q-wait'}>{st.startsWith('Prêt') ? '✓' : '◌'}</span>
                      <strong>{q}</strong><span className="muted">{st}</span><span className="muted video-size">{size}</span>
                    </div>
                  ))}
                </div>
                <div className="video-col">
                  <label className="field">
                    <span>Résumé de la leçon</span>
                    <textarea rows={12} value={form.contentMarkdown}
                      onChange={(e) => setForm((c) => ({ ...c, contentMarkdown: e.target.value }))} />
                  </label>
                </div>
                <p className="courses-phase-note video-note">
                  Maquette : l’envoi et l’encodage vidéo seront activés avec le backend (phase 2).
                </p>
              </div>
            )}

            {form.type === 'PDF' && (
              <div className="courses-assets">
                {selectedLesson?.assets.map((asset) => (
                  <div className="courses-asset" key={asset.id}>
                    <span className="asset-icon">▤</span>
                    <a href={asset.downloadUrl} target="_blank" rel="noreferrer">
                      Ouvrir le PDF
                    </a>
                    <span className="asset-size">{formatFileSize(asset.sizeBytes)}</span>
                    {selectedLesson.status === 'BROUILLON' && (
                      <button type="button" className="courses-text-button courses-danger-button"
                        disabled={processingId !== null}
                        onClick={() => {
                          resetMessages();
                          setLessonAction({ kind: 'deleteAsset', lesson: selectedLesson, assetId: asset.id });
                        }}>
                        {processingId === asset.id ? 'Suppression...' : 'Supprimer'}
                      </button>
                    )}
                  </div>
                ))}
                {pdfEditable && (
                  <label className="courses-upload">
                    <span>
                      {selectedLesson?.assets.length
                        ? 'Choisir un nouveau PDF'
                        : 'Choisir le fichier PDF à téléverser'}
                      {' · 20 Mo maximum'}
                    </span>
                    <input type="file" accept="application/pdf,.pdf"
                      disabled={uploadingPdf || saving}
                      onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        if (file && file.size > 20 * 1024 * 1024) {
                          setSelectedPdf(null);
                          setError('Le fichier PDF ne doit pas dépasser 20 Mo.');
                        } else {
                          setSelectedPdf(file);
                          setError('');
                        }
                        e.target.value = '';
                      }} />
                  </label>
                )}
                {selectedPdf && (
                  <p className="courses-pdf-selected">
                    Fichier sélectionné : <strong>{selectedPdf.name}</strong> ({formatFileSize(selectedPdf.size)})
                  </p>
                )}
                {!selectedLesson && (
                  <p className="courses-phase-note">
                    Le téléversement démarre après l’enregistrement du brouillon.
                  </p>
                )}
                {selectedLesson?.status === 'PUBLIE' && (
                  <p className="courses-phase-note">
                    Le fichier d’une leçon publiée ne peut pas être supprimé ou remplacé.
                  </p>
                )}
                {selectedLesson?.assets.length === 0 && (
                  <p className="courses-phase-note">Un PDF valide est requis pour publier cette leçon.</p>
                )}
              </div>
            )}
          </section>

          <aside className="editor-side">
            <section className="courses-card">
              <h2>Publication</h2>
              <dl className="kv">
                <div><dt>Statut</dt>
                  <dd>
                    {selectedLesson ? (
                      <span className={`pill pill-${selectedLesson.status.toLowerCase()}`}>
                        {statusLabels[selectedLesson.status]}
                      </span>
                    ) : (
                      <span className="pill pill-brouillon">Nouveau brouillon</span>
                    )}
                  </dd>
                </div>
                <div><dt>Type</dt><dd>{typeLabels[form.type]}</dd></div>
              </dl>
              {selectedLesson && selectedLesson.status !== 'ARCHIVE' && (
                <button type="button" className="courses-button courses-button-secondary courses-danger-button"
                  disabled={busy}
                  onClick={() => { setError(''); setLessonAction({ kind: 'archive', lesson: selectedLesson }); }}>
                  Archiver la leçon
                </button>
              )}
            </section>

            <section className="courses-card">
              <h2>Rattachement</h2>
              {selectedLesson ? (
                <p className="courses-context">
                  {currentChapter ? getChapterLabel(currentChapter) : 'Chapitre indisponible'}
                </p>
              ) : (
                <label className="field">
                  <span>Chapitre</span>
                  <select required value={form.chapterId}
                    onChange={(e) => {
                      const chapterId = e.target.value;
                      setForm((c) => ({
                        ...c, chapterId, position: String(nextPositionFor(lessons, chapterId)),
                      }));
                    }}>
                    <option value="">Sélectionner un chapitre</option>
                    {activeChapters.map((c) => (
                      <option key={c.id} value={c.id}>{getChapterLabel(c)}</option>
                    ))}
                  </select>
                </label>
              )}
              <label className="field">
                <span>Position dans le chapitre</span>
                <input type="number" min={1} step={1} value={form.position}
                  onChange={(e) => setForm((c) => ({ ...c, position: e.target.value }))} />
              </label>
            </section>
            <section className="courses-card">
              <h2>Flamme</h2>
              <label className="switch-row">
                <span>Compte pour la flamme</span>
                <input type="checkbox" role="switch" checked={flame} onChange={(e) => setFlame(e.target.checked)} />
              </label>
              <p className="courses-context">Validée quand l’élève a lu au moins 80 % du contenu. (maquette)</p>
            </section>
          </aside>
        </form>
      )}
    </div>
  );

  /* ───────────── Liste ───────────── */
  const list = (
    <div className="courses-page">
      <header className="courses-header">
        <div>
          <h1>Leçons</h1>
          <p>Créez et gérez les leçons des chapitres.</p>
        </div>
        <div className="courses-header-actions">
          <button type="button" className="courses-button courses-button-secondary"
            onClick={() => void loadData()} disabled={loading || busy}>
            Actualiser
          </button>
          <button type="button" className="courses-button courses-button-primary"
            onClick={openCreateForm} disabled={activeChapters.length === 0 || busy}>
            + Nouvelle leçon
          </button>
        </div>
      </header>

      {messages}

      <div className="courses-toolbar">
        <div className="filters">
          <select aria-label="Chapitre" value={selectedChapterId}
            onChange={(e) => setSelectedChapterId(e.target.value)}>
            <option value="TOUS">Chapitre : tous</option>
            {chapters.map((c) => (
              <option key={c.id} value={c.id}>{getChapterLabel(c)}</option>
            ))}
          </select>
          <select aria-label="Type de leçon" value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'TOUS' | LessonType)}>
            <option value="TOUS">Format : tous</option>
            {(['TEXTE', 'PDF', 'VIDEO'] as const).map((t) => (
              <option key={t} value={t}>{typeLabels[t]}</option>
            ))}
          </select>
          <select aria-label="Statut" value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}>
            <option value="TOUS">Statut : tous</option>
            {Object.entries(statusLabels).map(([st, label]) => (
              <option key={st} value={st}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {chapters.length === 0 && !loading && (
        <div className="courses-empty">Aucun chapitre n’est disponible. Créez d’abord un chapitre.</div>
      )}

      <section className="courses-table-card">
        {loading ? (
          <div className="courses-empty">Chargement des contenus...</div>
        ) : visibleLessons.length === 0 ? (
          <div className="courses-empty">Aucun contenu pour ces filtres.</div>
        ) : (
          <div className="table-scroll">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Titre</th><th>Classe</th><th>Matière · chapitre</th><th>Statut</th>
                  <th>Version</th><th>Auteur</th><th>Modifié</th><th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {visibleLessons.map((lesson) => {
                  const chapter = chaptersById.get(lesson.chapterId);
                  const isProcessing = processingId === lesson.id;
                  return (
                    <tr key={lesson.id}>
                      <td>
                        <div className="cell-title">
                          <span className="type-icon" aria-hidden="true">{typeIcons[lesson.type]}</span>
                          <div>
                            <strong>{lesson.title}</strong>
                            <small>Leçon · {typeLabels[lesson.type]}{lesson._count.assets > 0 && ` · ${lesson._count.assets} fichier(s)`}</small>
                          </div>
                        </div>
                      </td>
                      <td><strong>{chapter?.classSubject.class.code ?? '—'}</strong></td>
                      <td className="muted">{chapter ? `${chapter.classSubject.subject.name} · ${chapter.title}` : 'Chapitre indisponible'}</td>
                      <td><span className={`pill pill-${lesson.status.toLowerCase()}`}>{statusLabels[lesson.status]}</span></td>
                      <td className="muted">—</td><td className="muted">—</td><td className="muted">—</td>
                      <td>
                        <div className="row-actions">
                          <button type="button" className="courses-text-button"
                            onClick={() => void openEditForm(lesson)} disabled={busy}>Modifier</button>
                          {lesson.status === 'BROUILLON' && (
                            <button type="button" className="courses-text-button courses-publish-button" disabled={busy}
                              onClick={() => { setError(''); setLessonAction({ kind: 'publish', lesson }); }}>Publier</button>
                          )}
                          {lesson.status !== 'ARCHIVE' && (
                            <button type="button" className="courses-text-button courses-danger-button" disabled={busy}
                              onClick={() => { setError(''); setLessonAction({ kind: 'archive', lesson }); }}>
                              {isProcessing ? 'Traitement...' : 'Archiver'}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <footer className="table-footer">
          {visibleLessons.length} sur {lessons.length} leçon(s)
        </footer>
      </section>
    </div>
  );

  return (
    <>
      {formOpen ? editor : list}
      {lessonAction && (
        <ConfirmationModal
          title={
            lessonAction.kind === 'publish' ? 'Publier la leçon'
              : lessonAction.kind === 'archive' ? 'Archiver la leçon'
              : 'Supprimer le fichier PDF'
          }
          message={
            lessonAction.kind === 'deleteAsset'
              ? `Voulez-vous supprimer le fichier PDF de « ${lessonAction.lesson.title} » ?`
              : `Voulez-vous ${lessonAction.kind === 'publish' ? 'publier' : 'archiver'} « ${lessonAction.lesson.title} » ?`
          }
          confirmLabel={
            lessonAction.kind === 'publish' ? 'Publier'
              : lessonAction.kind === 'archive' ? 'Archiver' : 'Supprimer'
          }
          destructive={lessonAction.kind !== 'publish'}
          loading={processingId !== null}
          error={error}
          onCancel={() => {
            if (processingId === null) {
              setLessonAction(null);
              setError('');
            }
          }}
          onConfirm={() => void confirmLessonAction()}
        />
      )}
    </>
  );
}