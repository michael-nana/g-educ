import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';

import ConfirmationModal from '../../../../components/common/ConfirmationModal';
import Icon from '../../../../components/common/Icon';
import Modal from '../../../../components/common/Modal';
import { academicYearsService } from '../../../../services/academic-years.service';
import { chaptersService } from '../../../../services/chapters.service';
import { classSubjectsService } from '../../../../services/class-subjects.service';
import { classesService } from '../../../../services/classes.service';
import { lessonsService } from '../../../../services/lessons.service';
import { subjectsService } from '../../../../services/subjects.service';
import type { AcademicYear } from '../../../../services/academic-years.types';
import type {
  Chapter,
  CreateChapterDto,
} from '../../../../services/chapters.types';
import type {
  AssignSubjectDto,
  ClassSubject,
} from '../../../../services/class-subjects.types';
import type { SchoolClass } from '../../../../services/classes.types';
import type { Lesson } from '../../../../services/lessons.types';
import type {
  CreateSubjectDto,
  Subject,
  UpdateSubjectDto,
} from '../../../../services/subjects.types';

import './StructurePage.css';

interface StructureData {
  classes: SchoolClass[];
  subjects: Subject[];
  assignments: ClassSubject[];
  chapters: Chapter[];
  lessons: Lesson[];
  currentYear: AcademicYear | null;
}

interface ChapterForm {
  title: string;
  description: string;
  position: string;
}

interface ChapterAction {
  chapter: Chapter;
  action: 'publish' | 'archive';
}

const emptyData: StructureData = {
  classes: [],
  subjects: [],
  assignments: [],
  chapters: [],
  lessons: [],
  currentYear: null,
};

const initialChapterForm: ChapterForm = {
  title: '',
  description: '',
  position: '1',
};

const cycleLabels: Record<string, string> = {
  COLLEGE: 'Collège',
  LYCEE: 'Lycée',
};

const chapterStatusLabels: Record<string, string> = {
  BROUILLON: 'Brouillon',
  PUBLIE: 'Publié',
  ARCHIVE: 'Archivé',
};

function pluralize(count: number, word: string): string {
  return `${count} ${word}${count > 1 ? 's' : ''}`;
}

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

function groupByCycle(classes: SchoolClass[]) {
  return classes.reduce<Record<string, SchoolClass[]>>((groups, schoolClass) => {
    (groups[schoolClass.cycle] ??= []).push(schoolClass);
    return groups;
  }, {});
}

export default function StructurePage() {
  const [data, setData] = useState<StructureData>(emptyData);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [subjectModalOpen, setSubjectModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [chapterModalOpen, setChapterModalOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [chapterForm, setChapterForm] =
    useState<ChapterForm>(initialChapterForm);
  const [chapterAction, setChapterAction] = useState<ChapterAction | null>(null);
  const [subjectName, setSubjectName] = useState('');
  const [subjectIsActive, setSubjectIsActive] = useState(true);
  const [assignmentSubjectId, setAssignmentSubjectId] = useState('');
  const [assignmentCoefficient, setAssignmentCoefficient] = useState('1');
  const [chapterFilter, setChapterFilter] = useState<'TOUS' | 'BROUILLON' | 'PUBLIE' | 'ARCHIVE'>('TOUS');
  const [refreshId, setRefreshId] = useState(0);

  const selectedClass = data.classes.find(
    (schoolClass) => schoolClass.id === selectedClassId,
  );
  const classAssignments = data.assignments.filter(
    (assignment) => assignment.classId === selectedClassId,
  );
  const selectedAssignment =
    classAssignments.find(
      (assignment) => assignment.id === selectedAssignmentId,
    ) ?? classAssignments[0];

  const loadData = useCallback(async () => {
    const [classes, subjects, assignments, chapters, lessons, yearResult] =
      await Promise.all([
        classesService.findAll(),
        subjectsService.findAll(),
        classSubjectsService.findAllAssignments(),
        chaptersService.findAll(),
        lessonsService.findAll(),
        academicYearsService.findCurrent(),
      ]);
    return {
      classes,
      subjects,
      assignments,
      chapters,
      lessons,
      currentYear: yearResult,
    };
  }, []);

  useEffect(() => {
    let active = true;
    void loadData()
      .then((loaded) => {
        if (!active) return;
        setData(loaded);
        setSelectedClassId((current) =>
          loaded.classes.some((schoolClass) => schoolClass.id === current)
            ? current
            : (loaded.classes[0]?.id ?? ''),
        );
        setError('');
      })
      .catch((requestError: unknown) => {
        if (active) setError(getErrorMessage(requestError));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [loadData, refreshId]);

  const chapterCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const lesson of data.lessons) {
      counts.set(lesson.chapterId, (counts.get(lesson.chapterId) ?? 0) + 1);
    }
    return counts;
  }, [data.lessons]);

  const visibleChapters = data.chapters.filter(
    (chapter) =>
      chapter.classSubjectId === selectedAssignmentId &&
      (chapterFilter === 'TOUS' || chapter.status === chapterFilter),
  );
  const assignedSubjectIds = new Set(
    classAssignments.map((assignment) => assignment.subjectId),
  );
  const availableSubjects = data.subjects.filter(
    (subject) => subject.isActive && !assignedSubjectIds.has(subject.id),
  );
  const classGroups = groupByCycle(data.classes);

  const refresh = () => {
    setLoading(true);
    setError('');
    setSuccess('');
    setRefreshId((current) => current + 1);
  };

  const openNewSubject = () => {
    setEditingSubject(null);
    setSubjectName('');
    setSubjectIsActive(true);
    setError('');
    setSubjectModalOpen(true);
  };

  const openEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setSubjectName(subject.name);
    setSubjectIsActive(subject.isActive);
    setError('');
    setSubjectModalOpen(true);
  };

  const handleSubjectSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanName = subjectName.trim();
    if (!cleanName) {
      setError('Le nom de la matière est obligatoire.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      if (editingSubject) {
        const payload: UpdateSubjectDto = {
          name: cleanName,
          isActive: subjectIsActive,
        };
        const updated = await subjectsService.update(editingSubject.id, payload);
        setData((current) => ({
          ...current,
          subjects: current.subjects.map((subject) =>
            subject.id === updated.id ? updated : subject,
          ),
        }));
        setSuccess('La matière a été modifiée.');
      } else {
        const payload: CreateSubjectDto = { name: cleanName };
        const created = await subjectsService.create(payload);
        setData((current) => ({
          ...current,
          subjects: [...current.subjects, created],
        }));
        setSuccess('La matière a été créée.');
      }
      setSubjectModalOpen(false);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  const handleAssignmentSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedClass) return;
    const coefficient = Number(assignmentCoefficient);
    if (!assignmentSubjectId || !Number.isInteger(coefficient) || coefficient < 1) {
      setError('Sélectionnez une matière et un coefficient entier supérieur à zéro.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const payload: AssignSubjectDto = {
        subjectId: assignmentSubjectId,
        coefficient,
        position: classAssignments.length,
      };
      const created = await classSubjectsService.assign(selectedClass.id, payload);
      setData((current) => ({
        ...current,
        assignments: [...current.assignments, created],
      }));
      setSelectedAssignmentId(created.id);
      setAssignModalOpen(false);
      setAssignmentSubjectId('');
      setSuccess(`${created.subject.name} a été affectée à ${selectedClass.label}.`);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  const openCreateChapter = () => {
    if (!selectedAssignment) return;
    const nextPosition =
      data.chapters
        .filter((chapter) => chapter.classSubjectId === selectedAssignment.id)
        .reduce((max, chapter) => Math.max(max, chapter.position), -1) + 2;
    setEditingChapter(null);
    setChapterForm({
      ...initialChapterForm,
      position: String(nextPosition),
    });
    setError('');
    setChapterModalOpen(true);
  };

  const openEditChapter = (chapter: Chapter) => {
    setEditingChapter(chapter);
    setChapterForm({
      title: chapter.title,
      description: chapter.description ?? '',
      position: String(chapter.position + 1),
    });
    setError('');
    setChapterModalOpen(true);
  };

  const handleChapterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = chapterForm.title.trim();
    const position = Number(chapterForm.position);
    if (!title || !Number.isInteger(position) || position < 1) {
      setError('Saisissez un titre et un ordre entier supérieur ou égal à 1.');
      return;
    }
    if (!editingChapter && !selectedAssignment) return;

    const payload: CreateChapterDto = {
      title,
      description: chapterForm.description.trim(),
      position: position - 1,
    };
    setSaving(true);
    setError('');
    try {
      if (editingChapter) {
        await chaptersService.update(editingChapter.id, payload);
        setSuccess('Le chapitre a été modifié.');
      } else {
        await chaptersService.create(selectedAssignment!.id, payload);
        setSuccess('Le chapitre a été créé.');
      }
      setChapterModalOpen(false);
      const chapters = await chaptersService.findAll();
      setData((current) => ({ ...current, chapters }));
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  const confirmChapterAction = async () => {
    if (!chapterAction) return;
    setProcessingId(chapterAction.chapter.id);
    setError('');
    try {
      if (chapterAction.action === 'publish') {
        await chaptersService.publish(chapterAction.chapter.id);
        setSuccess('Le chapitre a été publié.');
      } else {
        await chaptersService.archive(chapterAction.chapter.id);
        setSuccess('Le chapitre a été archivé.');
      }
      const chapters = await chaptersService.findAll();
      setData((current) => ({ ...current, chapters }));
      setChapterAction(null);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setProcessingId(null);
    }
  };

  const selectedClassChapterCount = selectedClass
    ? data.chapters.filter((chapter) => chapter.classId === selectedClass.id)
        .length
    : 0;

  return (
    <div className="structure-page">
      <header className="structure-page-header">
        <div>
          <h1>Structure pédagogique</h1>
          <p>
            Classes, matières et chapitres
            {data.currentYear ? ` de l’année ${data.currentYear.label}` : ''}
          </p>
        </div>
        <button
          type="button"
          className="structure-primary-button"
          onClick={openCreateChapter}
          disabled={!selectedAssignment || loading || saving}
        >
          <Icon name="plus" size={15} />
          Ajouter un chapitre
        </button>
      </header>

      {error && !subjectModalOpen && !assignModalOpen && !chapterModalOpen && (
        <div className="structure-message structure-error" role="alert">
          {error}
          {data.classes.length === 0 && (
            <button type="button" onClick={refresh}>Réessayer</button>
          )}
        </div>
      )}
      {success && (
        <div className="structure-message structure-success" role="status">
          {success}
        </div>
      )}

      <main className="structure-columns">
        {/* ---------- Classes ---------- */}
        <section className="structure-panel structure-classes">
          <h2 className="structure-visually-hidden">Classes</h2>

          {loading && data.classes.length === 0 ? (
            <div className="structure-empty">Chargement des classes...</div>
          ) : data.classes.length === 0 ? (
            <div className="structure-empty">Aucune classe enregistrée.</div>
          ) : (
            <div className="structure-class-groups">
              {Object.entries(classGroups).map(([cycle, classes]) => (
                <div className="structure-class-group" key={cycle}>
                  <h3>{cycleLabels[cycle] ?? cycle}</h3>
                  <div
                    className={`structure-class-grid structure-class-grid-${cycle.toLowerCase()}`}
                  >
                    {classes.map((schoolClass) => (
                      <button
                        type="button"
                        key={schoolClass.id}
                        className={
                          schoolClass.id === selectedClassId
                            ? 'structure-class-button selected'
                            : 'structure-class-button'
                        }
                        onClick={() => {
                          setSelectedClassId(schoolClass.id);
                          setSelectedAssignmentId(
                            data.assignments.find(
                              (assignment) => assignment.classId === schoolClass.id,
                            )?.id ?? '',
                          );
                          setSuccess('');
                        }}
                      >
                        {schoolClass.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedClass && (
            <div className="structure-class-summary">
              <span>{cycleLabels[selectedClass.cycle] ?? selectedClass.cycle}</span>
              <strong>{selectedClass.label}</strong>
              <small>
                {pluralize(classAssignments.length, 'matière')} ·{' '}
                {pluralize(selectedClassChapterCount, 'chapitre')}
              </small>
            </div>
          )}
        </section>

        {/* ---------- Matières ---------- */}
        <section className="structure-panel structure-subjects">
          <div className="structure-panel-heading">
            <h2>
              Matières{selectedClass ? ` · ${selectedClass.label}` : ''}
            </h2>
            <div className="structure-heading-actions">
              <button
                type="button"
                className="structure-icon-button"
                onClick={() => {
                  setAssignmentSubjectId('');
                  setAssignmentCoefficient('1');
                  setError('');
                  setAssignModalOpen(true);
                }}
                disabled={!selectedClass || availableSubjects.length === 0}
                aria-label="Affecter une matière à cette classe"
                title="Affecter une matière à cette classe"
              >
                <Icon name="plus" size={16} />
              </button>
              <button
                type="button"
                className="structure-icon-button"
                onClick={openNewSubject}
                aria-label="Créer une matière"
                title="Créer une matière"
              >
                <Icon name="layers" size={15} />
              </button>
            </div>
          </div>

          {loading && data.subjects.length === 0 ? (
            <div className="structure-empty">Chargement des matières...</div>
          ) : !selectedClass ? (
            <div className="structure-empty">Sélectionnez une classe.</div>
          ) : classAssignments.length === 0 ? (
            <div className="structure-empty">
              <p>Aucune matière n’est affectée à cette classe.</p>
              <button
                type="button"
                className="structure-inline-button"
                onClick={() => setAssignModalOpen(true)}
                disabled={availableSubjects.length === 0}
              >
                Affecter une matière
              </button>
            </div>
          ) : (
            <div className="structure-subject-list">
              {classAssignments.map((assignment) => (
                <div
                  className={
                    assignment.id === selectedAssignment?.id
                      ? 'structure-subject-row selected'
                      : 'structure-subject-row'
                  }
                  key={assignment.id}
                >
                  <button
                    type="button"
                    className="structure-subject-select"
                    onClick={() => setSelectedAssignmentId(assignment.id)}
                  >
                    <strong>{assignment.subject.name}</strong>
                    <span>
                      {pluralize(
                        data.chapters.filter(
                          (chapter) => chapter.classSubjectId === assignment.id,
                        ).length,
                        'chapitre',
                      )}{' '}
                      · coef. {assignment.coefficient}
                    </span>
                  </button>
                  <button
                    type="button"
                    className="structure-subject-edit"
                    onClick={() => {
                      const subject = data.subjects.find(
                        (item) => item.id === assignment.subjectId,
                      );
                      if (subject) openEditSubject(subject);
                    }}
                    aria-label={`Modifier ${assignment.subject.name}`}
                    title="Modifier la matière"
                  >
                    <Icon name="settings" size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ---------- Chapitres ---------- */}
        <section className="structure-panel structure-chapters">
          <div className="structure-panel-heading structure-chapters-heading">
            <div>
              <span className="structure-kicker">
                {selectedAssignment
                  ? `${selectedAssignment.class.label} · ${selectedAssignment.subject.name}`
                  : 'Sélectionnez une matière'}
              </span>
              <h2>Chapitres</h2>
            </div>
            <label className="structure-status-filter">
              <span className="structure-visually-hidden">Filtrer les chapitres</span>
              <select
                value={chapterFilter}
                onChange={(event) =>
                  setChapterFilter(
                    event.target.value as typeof chapterFilter,
                  )
                }
              >
                <option value="TOUS">Tous</option>
                <option value="PUBLIE">Publiés</option>
                <option value="BROUILLON">Brouillons</option>
                <option value="ARCHIVE">Archivés</option>
              </select>
            </label>
          </div>

          {loading && data.chapters.length === 0 ? (
            <div className="structure-empty">Chargement des chapitres...</div>
          ) : !selectedAssignment ? (
            <div className="structure-empty">Choisissez une matière.</div>
          ) : visibleChapters.length === 0 ? (
            <div className="structure-empty">
              <p>Aucun chapitre pour cette matière.</p>
              <button
                type="button"
                className="structure-inline-button"
                onClick={openCreateChapter}
              >
                Ajouter le premier chapitre
              </button>
            </div>
          ) : (
            <div className="structure-chapter-list">
              {visibleChapters.map((chapter) => {
                const lessonCount = chapterCounts.get(chapter.id) ?? 0;
                return (
                  <article className="structure-chapter-row" key={chapter.id}>
                    <span className="structure-chapter-position">
                      {chapter.position + 1}
                    </span>
                    <div className="structure-chapter-info">
                      <strong>{chapter.title}</strong>
                      {chapter.description && <span>{chapter.description}</span>}
                    </div>
                    <span className="structure-chapter-lessons">
                      {pluralize(lessonCount, 'leçon')}
                    </span>
                    <span
                      className={`structure-chapter-status structure-status-${chapter.status.toLowerCase()}`}
                    >
                      {chapterStatusLabels[chapter.status]}
                    </span>
                    <div className="structure-chapter-actions">
                      <button
                        type="button"
                        onClick={() => openEditChapter(chapter)}
                        disabled={processingId !== null || saving}
                      >
                        Modifier
                      </button>
                      {chapter.status === 'BROUILLON' && (
                        <button
                          type="button"
                          className="structure-publish-action"
                          onClick={() =>
                            setChapterAction({ chapter, action: 'publish' })
                          }
                          disabled={processingId !== null}
                        >
                          Publier
                        </button>
                      )}
                      {chapter.status !== 'ARCHIVE' && (
                        <button
                          type="button"
                          className="structure-archive-action"
                          onClick={() =>
                            setChapterAction({ chapter, action: 'archive' })
                          }
                          disabled={processingId !== null}
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
          <p className="structure-chapter-hint">
            Choisissez une classe, puis une matière, pour consulter ou gérer ses
            chapitres.
          </p>
        </section>
      </main>

      {subjectModalOpen && (
        <Modal
          title={editingSubject ? 'Modifier la matière' : 'Créer une matière'}
          onClose={() => {
            if (!saving) {
              setSubjectModalOpen(false);
              setError('');
            }
          }}
          closeDisabled={saving}
        >
          <form className="structure-form" onSubmit={(event) => void handleSubjectSubmit(event)}>
            {error && <div className="structure-form-error" role="alert">{error}</div>}
            <label>
              <span>Nom de la matière</span>
              <input
                value={subjectName}
                onChange={(event) => setSubjectName(event.target.value)}
                maxLength={100}
                placeholder="Ex. Mathématiques"
                required
              />
            </label>
            {editingSubject && (
              <label className="structure-checkbox">
                <input
                  type="checkbox"
                  checked={subjectIsActive}
                  onChange={(event) => setSubjectIsActive(event.target.checked)}
                />
                Matière active
              </label>
            )}
            <div className="structure-form-actions">
              <button
                type="button"
                onClick={() => setSubjectModalOpen(false)}
                disabled={saving}
              >
                Annuler
              </button>
              <button type="submit" disabled={saving}>
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {assignModalOpen && selectedClass && (
        <Modal
          title={`Affecter une matière à ${selectedClass.label}`}
          onClose={() => {
            if (!saving) {
              setAssignModalOpen(false);
              setError('');
            }
          }}
          closeDisabled={saving}
        >
          <form className="structure-form" onSubmit={(event) => void handleAssignmentSubmit(event)}>
            {error && <div className="structure-form-error" role="alert">{error}</div>}
            <label>
              <span>Matière</span>
              <select
                value={assignmentSubjectId}
                onChange={(event) => setAssignmentSubjectId(event.target.value)}
                required
              >
                <option value="">Sélectionner une matière</option>
                {availableSubjects.map((subject) => (
                  <option key={subject.id} value={subject.id}>{subject.name}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Coefficient</span>
              <input
                type="number"
                min={1}
                step={1}
                value={assignmentCoefficient}
                onChange={(event) => setAssignmentCoefficient(event.target.value)}
                required
              />
            </label>
            <div className="structure-form-actions">
              <button type="button" onClick={() => setAssignModalOpen(false)} disabled={saving}>
                Annuler
              </button>
              <button type="submit" disabled={saving || availableSubjects.length === 0}>
                {saving ? 'Enregistrement...' : 'Affecter'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {chapterModalOpen && (
        <Modal
          title={editingChapter ? 'Modifier le chapitre' : 'Ajouter un chapitre'}
          description={
            editingChapter
              ? `${editingChapter.classSubject.class.label} · ${editingChapter.classSubject.subject.name}`
              : `${selectedAssignment?.class.label ?? ''} · ${selectedAssignment?.subject.name ?? ''}`
          }
          onClose={() => {
            if (!saving) {
              setChapterModalOpen(false);
              setError('');
            }
          }}
          closeDisabled={saving}
        >
          <form className="structure-form" onSubmit={(event) => void handleChapterSubmit(event)}>
            {error && <div className="structure-form-error" role="alert">{error}</div>}
            <label>
              <span>Titre du chapitre</span>
              <input
                value={chapterForm.title}
                onChange={(event) =>
                  setChapterForm((current) => ({ ...current, title: event.target.value }))
                }
                maxLength={150}
                required
              />
            </label>
            <label>
              <span>Ordre</span>
              <input
                type="number"
                min={1}
                step={1}
                value={chapterForm.position}
                onChange={(event) =>
                  setChapterForm((current) => ({ ...current, position: event.target.value }))
                }
                required
              />
            </label>
            <label>
              <span>Description</span>
              <textarea
                rows={3}
                maxLength={1000}
                value={chapterForm.description}
                onChange={(event) =>
                  setChapterForm((current) => ({ ...current, description: event.target.value }))
                }
              />
            </label>
            <div className="structure-form-actions">
              <button type="button" onClick={() => setChapterModalOpen(false)} disabled={saving}>
                Annuler
              </button>
              <button type="submit" disabled={saving}>
                {saving ? 'Enregistrement...' : 'Enregistrer'}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {chapterAction && (
        <ConfirmationModal
          title={chapterAction.action === 'publish' ? 'Publier le chapitre' : 'Archiver le chapitre'}
          message={`Voulez-vous ${chapterAction.action === 'publish' ? 'publier' : 'archiver'} « ${chapterAction.chapter.title} » ?`}
          confirmLabel={chapterAction.action === 'publish' ? 'Publier' : 'Archiver'}
          destructive={chapterAction.action === 'archive'}
          loading={processingId === chapterAction.chapter.id}
          error={error}
          onCancel={() => {
            if (processingId === null) {
              setChapterAction(null);
              setError('');
            }
          }}
          onConfirm={() => void confirmChapterAction()}
        />
      )}
    </div>
  );
}