
import { useCallback, useEffect, useState } from 'react';

import { classesService } from '../../../../services/classes.service';
import { classSubjectsService } from '../../../../services/class-subjects.service';

import type { SchoolClass } from '../../../../services/classes.types';
import type {
  AssignSubjectDto,
  ClassSubject,
} from '../../../../services/class-subjects.types';
import type { Subject } from '../../../../services/subjects.types';
import { subjectsService } from '../../../../services/subjects.service';
import ClassesTable from '../components/ClassesTable';
import AssignSubjectModal from '../../class-subjects/component/AssignSubjectModal';

import './ClassesPage.css';

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

export default function ClassesPage() {
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classSubjectsByClass, setClassSubjectsByClass] = useState<
    Record<string, ClassSubject[]>
  >({});
  const [selectedClass, setSelectedClass] =
    useState<SchoolClass | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fetchData = useCallback(async () => {
    const [classList, subjectList] = await Promise.all([
      classesService.findAll(),
      subjectsService.findAll(),
    ]);
    const assignments = await classSubjectsService.findAllAssignments();

    return {
      classes: classList,
      subjects: subjectList,
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
      setClasses(data.classes);
      setSubjects(data.subjects);
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

  const handleAssign = async (payload: AssignSubjectDto) => {
    if (!selectedClass) return;

    setSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      const assignment = await classSubjectsService.assign(
        selectedClass.id,
        payload,
      );

      setClassSubjectsByClass((current) => ({
        ...current,
        [selectedClass.id]: [
          ...(current[selectedClass.id] ?? []),
          assignment,
        ],
      }));
      setSuccessMessage(
        `La matière a été affectée à ${selectedClass.label}.`,
      );

      setSelectedClass(null);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="classes-page">
      <div className="classes-page-header">
        <div>
          <h1>Gestion des classes</h1>
          <p>
            Consultez les classes scolaires et affectez-leur
            des matières.
          </p>
        </div>

        <button
          type="button"
          className="classes-refresh-button"
          onClick={() => void loadData()}
          disabled={loading}
        >
          Actualiser
        </button>
      </div>

      {successMessage && (
        <div className="classes-success">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="classes-error">
          {error}
        </div>
      )}

      <div className="classes-summary">
        <div className="classes-summary-card">
          <span className="classes-summary-label">
            Nombre de classes
          </span>

          <strong>{classes.length}</strong>
        </div>
      </div>

      <section className="classes-content-card">
        <div className="classes-content-header">
          <div>
            <h2>Liste des classes</h2>
            <p>Classes enregistrées sur la plateforme.</p>
          </div>
        </div>

        {loading ? (
          <div className="classes-loading">
            Chargement des classes...
          </div>
        ) : error && classes.length === 0 ? (
          <div className="classes-empty">
            Impossible de charger les classes.
          </div>
        ) : (
          <ClassesTable
            classes={classes}
            classSubjectsByClass={classSubjectsByClass}
            onAssign={(schoolClass) => {
              setError('');
              setSuccessMessage('');
              setSelectedClass(schoolClass);
            }}
          />
        )}
      </section>

      {selectedClass && (
        <AssignSubjectModal
          schoolClass={selectedClass}
          subjects={subjects.filter(
            (subject) =>
              subject.isActive &&
              !(classSubjectsByClass[selectedClass.id] ?? []).some(
                (assignment) => assignment.subjectId === subject.id,
              ),
          )}
          initialPosition={
            (classSubjectsByClass[selectedClass.id] ?? []).length
          }
          loading={submitting}
          serverError={error}
          onClose={() => {
            if (!submitting) {
              setSelectedClass(null);
            }
          }}
          onSubmit={handleAssign}
        />
      )}
    </div>
  );
}
