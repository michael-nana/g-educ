import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from 'react';

import ConfirmationModal from '../../../../components/common/ConfirmationModal';
import Modal from '../../../../components/common/Modal';
import { chaptersService } from '../../../../services/chapters.service';
import { classSubjectsService } from '../../../../services/class-subjects.service';
import type { ClassSubject } from '../../../../services/class-subjects.types';
import type {
  Chapter,
  ChapterStatus,
  CreateChapterDto,
} from '../../../../services/chapters.types';

import './ChaptersPage.css';

type StatusFilter = 'TOUS' | ChapterStatus;

const statusLabels: Record<ChapterStatus, string> = {
  BROUILLON: 'Brouillon',
  PUBLIE: 'Publié',
  ARCHIVE: 'Archivé',
};

function getErrorMessage(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (
      error as {
        response?: {
          data?: {
            message?: string | string[];
          };
        };
      }
    ).response;
    const message = response?.data?.message;

    if (Array.isArray(message)) {
      return message.join(', ');
    }

    if (message) {
      return message;
    }
  }

  return 'Une erreur est survenue. Veuillez réessayer.';
}

function getClassSubjectLabel(assignment: ClassSubject): string {
  return `${assignment.class.label} (${assignment.class.code}) · ${assignment.subject.name}`;
}

interface ChapterForm {
  classSubjectId: string;
  title: string;
  description: string;
  position: string;
}

const emptyForm: ChapterForm = {
  classSubjectId: '',
  title: '',
  description: '',
  position: '1',
};

interface ChapterAction {
  chapter: Chapter;
  action: 'publish' | 'archive';
}

export default function ChaptersPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [classSubjects, setClassSubjects] = useState<ClassSubject[]>([]);
  const [selectedClassSubjectId, setSelectedClassSubjectId] = useState('TOUS');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('TOUS');
  const [form, setForm] = useState<ChapterForm>(emptyForm);
  const [formOpen, setFormOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [chapterAction, setChapterAction] =
    useState<ChapterAction | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchData = useCallback(async () => {
    const [chapterList, assignmentList] = await Promise.all([
      chaptersService.findAll(),
      classSubjectsService.findAllAssignments(),
    ]);

    return { chapters: chapterList, classSubjects: assignmentList };
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await fetchData();
      setChapters(data.chapters);
      setClassSubjects(data.classSubjects);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    let active = true;

    void fetchData()
      .then((data) => {
        if (active) {
          setChapters(data.chapters);
          setClassSubjects(data.classSubjects);
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(getErrorMessage(err));
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [fetchData]);

  const visibleChapters = useMemo(
    () =>
      chapters.filter(
        (chapter) =>
          (selectedClassSubjectId === 'TOUS' ||
            chapter.classSubjectId === selectedClassSubjectId) &&
          (statusFilter === 'TOUS' || chapter.status === statusFilter),
      ),
    [chapters, selectedClassSubjectId, statusFilter],
  );

  const openCreateForm = () => {
    setEditingChapter(null);
    const classSubjectId =
      selectedClassSubjectId === 'TOUS'
        ? classSubjects[0]?.id ?? ''
        : selectedClassSubjectId;
    const nextPosition =
      chapters
        .filter((chapter) => chapter.classSubjectId === classSubjectId)
        .reduce((max, chapter) => Math.max(max, chapter.position), -1) + 2;
    setForm({
      ...emptyForm,
      classSubjectId,
      position: String(nextPosition),
    });
    setError('');
    setSuccessMessage('');
    setFormOpen(true);
  };

  const openEditForm = (chapter: Chapter) => {
    setEditingChapter(chapter);
    setForm({
      classSubjectId: chapter.classSubjectId,
      title: chapter.title,
      description: chapter.description ?? '',
      position: String(chapter.position + 1),
    });
    setError('');
    setSuccessMessage('');
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingChapter(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = form.title.trim();
    const position = Number(form.position);
    if (!title || !Number.isInteger(position) || position < 1) {
      setError('Saisissez un titre et un ordre entier supérieur ou égal à 1.');
      return;
    }

    if (!editingChapter && !form.classSubjectId) {
      setError('Sélectionnez une classe et une matière.');
      return;
    }

    const payload: CreateChapterDto = {
      title,
      description: form.description.trim(),
      position: position - 1,
    };

    setSaving(true);
    setError('');
    setSuccessMessage('');

    try {
      if (editingChapter) {
        await chaptersService.update(editingChapter.id, payload);
        setSuccessMessage('Le chapitre a été modifié.');
      } else {
        await chaptersService.create(form.classSubjectId, payload);
        setSuccessMessage('Le chapitre a été créé.');
      }

      closeForm();
      const [chapterList, assignmentList] = await Promise.all([
        chaptersService.findAll(),
        classSubjectsService.findAllAssignments(),
      ]);
      setChapters(chapterList);
      setClassSubjects(assignmentList);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const confirmStatusChange = async () => {
    if (!chapterAction) return;
    const { chapter, action } = chapterAction;
    setProcessingId(chapter.id);
    setError('');
    setSuccessMessage('');

    try {
      if (action === 'publish') {
        await chaptersService.publish(chapter.id);
      } else {
        await chaptersService.archive(chapter.id);
      }

      setSuccessMessage(
        action === 'publish'
          ? 'Le chapitre a été publié.'
          : 'Le chapitre a été archivé.',
      );
      setChapters(await chaptersService.findAll());
      setChapterAction(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="chapters-page">
      <header className="chapters-header">
        <div>
          <h1>Chapitres</h1>
          <p>Organisez les chapitres par classe et par matière.</p>
        </div>
        <div className="chapters-header-actions">
          <button
            type="button"
            className="chapters-button chapters-button-secondary"
            onClick={() => void loadData()}
            disabled={loading || saving || processingId !== null}
          >
            Actualiser
          </button>
          <button
            type="button"
            className="chapters-button chapters-button-primary"
            onClick={openCreateForm}
            disabled={classSubjects.length === 0 || saving}
          >
            Nouveau chapitre
          </button>
        </div>
      </header>

      {error && <div className="chapters-message chapters-error" role="alert">{error}</div>}
      {successMessage && (
        <div className="chapters-message chapters-success" role="status">
          {successMessage}
        </div>
      )}

      {formOpen && (
        <Modal
          title={editingChapter ? 'Modifier le chapitre' : 'Créer un chapitre'}
          onClose={closeForm}
          closeDisabled={saving}
        >
          <form
            className="chapters-form"
            onSubmit={(event) => void handleSubmit(event)}
          >
          {error && (
            <div className="chapters-message chapters-error" role="alert">
              {error}
            </div>
          )}
          {!editingChapter && (
            <label>
              <span>Classe et matière</span>
              <select
                required
                value={form.classSubjectId}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    classSubjectId: event.target.value,
                    position: String(
                      chapters
                        .filter(
                          (chapter) =>
                            chapter.classSubjectId === event.target.value,
                        )
                        .reduce(
                          (max, chapter) => Math.max(max, chapter.position),
                          -1,
                        ) + 2,
                    ),
                  }))
                }
              >
                <option value="">Sélectionner</option>
                {classSubjects.map((assignment) => (
                  <option key={assignment.id} value={assignment.id}>
                    {getClassSubjectLabel(assignment)}
                  </option>
                ))}
              </select>
            </label>
          )}

          {editingChapter && (
            <p className="chapters-form-context">
              {editingChapter.classSubject.class.label} ·{' '}
              {editingChapter.classSubject.subject.name}
            </p>
          )}

          <div className="chapters-form-grid">
            <label>
              <span>Titre</span>
              <input
                required
                maxLength={150}
                value={form.title}
                onChange={(event) =>
                  setForm((current) => ({ ...current, title: event.target.value }))
                }
              />
            </label>
            <label>
              <span>Ordre</span>
              <input
                type="number"
                min={1}
                step={1}
                value={form.position}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    position: event.target.value,
                  }))
                }
              />
            </label>
          </div>
          <label>
            <span>Description</span>
            <textarea
              maxLength={1000}
              rows={3}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
            />
          </label>
          <div className="chapters-form-actions">
            <button
              type="button"
              className="chapters-button chapters-button-secondary"
              onClick={closeForm}
              disabled={saving}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="chapters-button chapters-button-primary"
              disabled={saving}
            >
              {saving ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
          </form>
        </Modal>
      )}

      {classSubjects.length === 0 && !loading && (
        <div className="chapters-empty">
          Aucune matière n’est affectée à une classe. Affectez d’abord les matières
          dans la page Matières.
        </div>
      )}

      <section className="chapters-panel">
        <div className="chapters-filters">
          <label>
            <span>Classe et matière</span>
            <select
              value={selectedClassSubjectId}
              onChange={(event) => setSelectedClassSubjectId(event.target.value)}
            >
              <option value="TOUS">Toutes les classes et matières</option>
              {classSubjects.map((assignment) => (
                <option key={assignment.id} value={assignment.id}>
                  {getClassSubjectLabel(assignment)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Statut</span>
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value as StatusFilter)
              }
            >
              <option value="TOUS">Tous</option>
              {Object.entries(statusLabels).map(([status, label]) => (
                <option key={status} value={status}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <strong>{visibleChapters.length} chapitre(s)</strong>
        </div>

        {loading ? (
          <div className="chapters-empty">Chargement des chapitres...</div>
        ) : visibleChapters.length === 0 ? (
          <div className="chapters-empty">Aucun chapitre pour ces filtres.</div>
        ) : (
          <div className="chapters-list">
            {visibleChapters.map((chapter) => {
              const isProcessing = processingId === chapter.id;

              return (
                <article className="chapter-card" key={chapter.id}>
                  <div className="chapter-card-main">
                    <div>
                      <p className="chapter-context">
                        {chapter.classSubject.class.label} ·{' '}
                        {chapter.classSubject.subject.name}
                      </p>
                      <h3>{chapter.title}</h3>
                      {chapter.description && <p>{chapter.description}</p>}
                    </div>
                    <div className="chapter-card-meta">
                      <span className={`chapter-status chapter-status-${chapter.status.toLowerCase()}`}>
                        {statusLabels[chapter.status]}
                      </span>
                      <span>Ordre {chapter.position + 1}</span>
                    </div>
                  </div>
                  <div className="chapter-card-actions">
                    <button
                      type="button"
                      className="chapters-text-button"
                      onClick={() => openEditForm(chapter)}
                      disabled={saving || processingId !== null}
                    >
                      Modifier
                    </button>
                    {chapter.status === 'BROUILLON' && (
                      <button
                        type="button"
                        className="chapters-text-button chapters-publish-button"
                        onClick={() => {
                          setError('');
                          setChapterAction({ chapter, action: 'publish' });
                        }}
                        disabled={isProcessing || processingId !== null}
                      >
                        {isProcessing ? 'Traitement...' : 'Publier'}
                      </button>
                    )}
                    {chapter.status !== 'ARCHIVE' && (
                      <button
                        type="button"
                        className="chapters-text-button chapters-archive-button"
                        onClick={() => {
                          setError('');
                          setChapterAction({ chapter, action: 'archive' });
                        }}
                        disabled={isProcessing || processingId !== null}
                      >
                        Archiver
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
      {chapterAction && (
        <ConfirmationModal
          title={
            chapterAction.action === 'publish'
              ? 'Publier le chapitre'
              : 'Archiver le chapitre'
          }
          message={`Voulez-vous ${chapterAction.action === 'publish' ? 'publier' : 'archiver'} « ${chapterAction.chapter.title} » ?`}
          confirmLabel={
            chapterAction.action === 'publish' ? 'Publier' : 'Archiver'
          }
          destructive={chapterAction.action === 'archive'}
          loading={processingId === chapterAction.chapter.id}
          error={error}
          onCancel={() => {
            if (processingId === null) {
              setChapterAction(null);
              setError('');
            }
          }}
          onConfirm={() => void confirmStatusChange()}
        />
      )}
    </div>
  );
}
