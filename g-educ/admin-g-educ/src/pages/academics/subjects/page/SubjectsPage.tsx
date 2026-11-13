import { useCallback, useEffect, useState } from 'react';

import { classesService } from '../../../../services/classes.service';
import { classSubjectsService } from '../../../../services/class-subjects.service';
import { subjectsService } from '../../../../services/subjects.service';

import type { SchoolClass } from '../../../../services/classes.types';
import type {
  AssignSubjectDto,
  ClassSubject,
} from '../../../../services/class-subjects.types';
import type {
  Subject,
  CreateSubjectDto,
  UpdateSubjectDto,
} from '../../../../services/subjects.types';

import AssignSubjectModal from '../../class-subjects/component/AssignSubjectModal';
import SubjectFormModal from '../components/SubjectFormModal';

import './SubjectsPage.css';

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

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [classSubjectsByClass, setClassSubjectsByClass] = useState<
    Record<string, ClassSubject[]>
  >({});

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] =
    useState<Subject | null>(null);
  const [assignmentClass, setAssignmentClass] =
    useState<SchoolClass | null>(null);

  const [loading, setLoading] = useState(true);
  const [savingSubject, setSavingSubject] = useState(false);
  const [submittingClassId, setSubmittingClassId] = useState<string | null>(
    null,
  );
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchData = useCallback(async () => {
    const [subjectList, classList] = await Promise.all([
      subjectsService.findAll(),
      classesService.findAll(),
    ]);
    const assignments = await classSubjectsService.findAllAssignments();

    return {
      subjects: subjectList,
      classes: classList,
      classSubjectsByClass: assignments.reduce<
        Record<string, ClassSubject[]>
      >((grouped, assignment) => {
        (grouped[assignment.classId] ??= []).push(assignment);
        return grouped;
      }, {}),
    };
  }, []);

  const applyData = useCallback(
    (data: Awaited<ReturnType<typeof fetchData>>) => {
      setSubjects(data.subjects);
      setClasses(data.classes);
      setClassSubjectsByClass(data.classSubjectsByClass);
    },
    [],
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      applyData(await fetchData());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [applyData, fetchData]);

  useEffect(() => {
    let active = true;

    void fetchData()
      .then((data) => {
        if (active) {
          applyData(data);
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
  }, [applyData, fetchData]);

  const openCreateModal = () => {
    setSelectedSubject(null);
    setError('');
    setSuccessMessage('');
    setModalOpen(true);
  };

  const openEditModal = (subject: Subject) => {
    setSelectedSubject(subject);
    setError('');
    setSuccessMessage('');
    setModalOpen(true);
  };

  const handleSubmitSubject = async (
    payload: CreateSubjectDto | UpdateSubjectDto,
  ) => {
    setSavingSubject(true);
    setError('');
    setSuccessMessage('');

    try {
      if (selectedSubject) {
        const updatedSubject = await subjectsService.update(
          selectedSubject.id,
          payload as UpdateSubjectDto,
        );

        setSubjects((current) =>
          current.map((subject) =>
            subject.id === updatedSubject.id ? updatedSubject : subject,
          ),
        );
        setSuccessMessage('La matière a été modifiée avec succès.');
      } else {
        const newSubject = await subjectsService.create(
          payload as CreateSubjectDto,
        );

        setSubjects((current) => [...current, newSubject]);
        setSuccessMessage('La matière a été créée avec succès.');
      }

      setModalOpen(false);
      setSelectedSubject(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSavingSubject(false);
    }
  };

  const handleAssignSubject = async (payload: AssignSubjectDto) => {
    if (!assignmentClass) return;
    const schoolClass = assignmentClass;

    setSubmittingClassId(schoolClass.id);
    setError('');
    setSuccessMessage('');

    try {
      const assignment = await classSubjectsService.assign(
        schoolClass.id,
        payload,
      );

      setClassSubjectsByClass((current) => ({
        ...current,
        [schoolClass.id]: [
          ...(current[schoolClass.id] ?? []),
          assignment,
        ],
      }));
      setAssignmentClass(null);
      setSuccessMessage(
        `${assignment.subject.name} a été affectée à ${schoolClass.label}.`,
      );
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmittingClassId(null);
    }
  };

  const activeSubjects = subjects.filter((subject) => subject.isActive);

  return (
    <div className="subjects-page">
      <div className="subjects-page-header">
        <div>
          <h1>Gestion des matières</h1>
          <p>
            Créez les matières, puis affectez-les aux classes existantes.
          </p>
        </div>

        <button
          type="button"
          className="subjects-create-button"
          onClick={openCreateModal}
        >
          + Nouvelle matière
        </button>
      </div>

      {successMessage && (
        <div className="subjects-success">{successMessage}</div>
      )}

      {error && <div className="subjects-error">{error}</div>}

      <div className="subjects-summary">
        <div className="subjects-summary-card">
          <span>Matières enregistrées</span>
          <strong>{subjects.length}</strong>
        </div>

        <div className="subjects-summary-card">
          <span>Matières actives</span>
          <strong>{activeSubjects.length}</strong>
        </div>

        <div className="subjects-summary-card">
          <span>Classes disponibles</span>
          <strong>{classes.length}</strong>
        </div>
      </div>

      <section className="subjects-content-card">
        <div className="subjects-content-header">
          <div>
            <h2>Matières</h2>
            <p>Les matières enregistrées dans la base de données.</p>
          </div>
          <button
            type="button"
            className="subjects-refresh-button"
            onClick={() => void loadData()}
            disabled={loading}
          >
            Actualiser
          </button>
        </div>

        {loading ? (
          <div className="subjects-empty">Chargement des matières...</div>
        ) : subjects.length === 0 ? (
          <div className="subjects-empty">
            <div className="subjects-empty-icon">📚</div>
            <h3>Aucune matière enregistrée</h3>
            <p>Créez une matière avant de l’affecter à une classe.</p>
            <button
              type="button"
              className="subjects-create-button"
              onClick={openCreateModal}
            >
              Créer une matière
            </button>
          </div>
        ) : (
          <div className="subjects-table-wrapper">
            <table className="subjects-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Slug</th>
                  <th>Statut</th>
                  <th>Date de création</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.id}>
                    <td>
                      <strong>{subject.name}</strong>
                    </td>
                    <td>{subject.slug}</td>
                    <td>
                      <span
                        className={
                          subject.isActive
                            ? 'subject-status-active'
                            : 'subject-status-inactive'
                        }
                      >
                        {subject.isActive ? 'Active' : 'Désactivée'}
                      </span>
                    </td>
                    <td>
                      {new Date(subject.createdAt).toLocaleDateString(
                        'fr-FR',
                      )}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="subject-edit-button"
                        onClick={() => openEditModal(subject)}
                      >
                        Modifier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="subjects-content-card">
        <div className="subjects-content-header">
          <div>
            <h2>Affecter les matières aux classes</h2>
            <p>
              Les matières déjà affectées à une classe ne sont plus proposées
              pour cette même classe.
            </p>
          </div>
        </div>

        {loading ? (
          <div className="subjects-empty">Chargement des classes...</div>
        ) : classes.length === 0 ? (
          <div className="subjects-empty">
            Aucune classe n’est encore enregistrée.
          </div>
        ) : (
          <div className="subjects-table-wrapper">
            <table className="subjects-table subjects-assignments-table">
              <thead>
                <tr>
                  <th>Classe</th>
                  <th>Matières affectées</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((schoolClass) => {
                  const assignments =
                    classSubjectsByClass[schoolClass.id] ?? [];
                  const assignedSubjectIds = new Set(
                    assignments.map((assignment) => assignment.subjectId),
                  );
                  const availableSubjects = activeSubjects.filter(
                    (subject) => !assignedSubjectIds.has(subject.id),
                  );
                  const isSubmitting =
                    submittingClassId === schoolClass.id;

                  return (
                    <tr key={schoolClass.id}>
                      <td>
                        <strong>{schoolClass.label}</strong>
                        <small className="subjects-class-code">
                          {schoolClass.code}
                        </small>
                      </td>
                      <td>
                        {assignments.length > 0 ? (
                          <div className="subjects-assigned-list">
                            {assignments.map((assignment) => (
                              <span
                                className="subjects-assigned-badge"
                                key={assignment.id}
                              >
                                {assignment.subject.name}
                                <small>Coef. {assignment.coefficient}</small>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="subjects-no-assignments">
                            Aucune matière affectée
                          </span>
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="subjects-assign-button"
                          onClick={() => {
                            setError('');
                            setSuccessMessage('');
                            setAssignmentClass(schoolClass);
                          }}
                          disabled={
                            isSubmitting ||
                            availableSubjects.length === 0
                          }
                        >
                          {availableSubjects.length === 0
                            ? 'Toutes affectées'
                            : 'Affecter une matière'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {modalOpen && (
        <SubjectFormModal
          subject={selectedSubject}
          loading={savingSubject}
          serverError={error}
          onClose={() => {
            if (!savingSubject) {
              setModalOpen(false);
              setSelectedSubject(null);
            }
          }}
          onSubmit={handleSubmitSubject}
        />
      )}
      {assignmentClass && (
        <AssignSubjectModal
          schoolClass={assignmentClass}
          subjects={activeSubjects.filter(
            (subject) =>
              !(classSubjectsByClass[assignmentClass.id] ?? []).some(
                (assignment) => assignment.subjectId === subject.id,
              ),
          )}
          initialPosition={
            (classSubjectsByClass[assignmentClass.id] ?? []).length
          }
          loading={submittingClassId === assignmentClass.id}
          serverError={error}
          onClose={() => {
            if (submittingClassId === null) {
              setAssignmentClass(null);
            }
          }}
          onSubmit={(payload) => void handleAssignSubject(payload)}
        />
      )}
    </div>
  );
}
