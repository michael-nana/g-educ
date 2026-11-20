import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { FormEvent } from 'react';

import ConfirmationModal from '../../../../components/common/ConfirmationModal';
import Modal from '../../../../components/common/Modal';
import { assessmentsService } from '../../../../services/assessments.service';
import type {
  Assessment,
  AssessmentKind,
  AssessmentStatus,
  CreateAssessmentDto,
  QuestionType,
  UpdateAssessmentDto,
} from '../../../../services/assessments.types';
import { chaptersService } from '../../../../services/chapters.service';
import type { Chapter } from '../../../../services/chapters.types';

import './AssessmentsPage.css';

type StatusFilter = 'TOUS' | AssessmentStatus;
type KindFilter = 'TOUS' | AssessmentKind;
type AssessmentAction = {
  assessment: Assessment;
  action: 'publish' | 'archive';
};

interface AssessmentOptionForm {
  label: string;
  isCorrect: boolean;
}

interface AssessmentQuestionForm {
  type: QuestionType;
  statement: string;
  explanation: string;
  points: string;
  options: AssessmentOptionForm[];
}

interface AssessmentForm {
  exerciseFormat: 'TEXTE' | 'PDF';
  exercisePdfFile: File | null;
  correctionPdfFile: File | null;
  title: string;
  instructions: string;
  durationMinutes: string;
  passingPercent: string;
  position: string;
  questions: AssessmentQuestionForm[];
}

const statusLabels: Record<AssessmentStatus, string> = {
  BROUILLON: 'Brouillon',
  PUBLIE: 'Publié',
  ARCHIVE: 'Archivé',
};

const kindLabels: Record<AssessmentKind, string> = {
  EXERCICE: 'Exercice',
  QUIZ: 'Quiz',
};

const questionTypeLabels: Record<QuestionType, string> = {
  QCM_UNIQUE: 'Choix unique',
  QCM_MULTIPLE: 'Choix multiples',
  VRAI_FAUX: 'Vrai ou faux',
};

const statusFilters: StatusFilter[] = ['TOUS', 'BROUILLON', 'PUBLIE', 'ARCHIVE'];

function createEmptyQuestion(): AssessmentQuestionForm {
  return {
    type: 'QCM_UNIQUE',
    statement: '',
    explanation: '',
    points: '1',
    options: [
      { label: '', isCorrect: true },
      { label: '', isCorrect: false },
    ],
  };
}

function createEmptyForm(): AssessmentForm {
  return {
    exerciseFormat: 'TEXTE',
    exercisePdfFile: null,
    correctionPdfFile: null,
    title: '',
    instructions: '',
    durationMinutes: '',
    passingPercent: '',
    position: '1',
    questions: [createEmptyQuestion()],
  };
}

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

function getChapterContext(chapter: Chapter): string {
  return `${chapter.classSubject.class.label} (${chapter.classSubject.class.code}) · ${chapter.classSubject.subject.name}`;
}

function formatUpdatedDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
  }).format(date);
}

function getFormFromAssessment(assessment: Assessment): AssessmentForm {
  return {
    exerciseFormat: assessment.exerciseFormat ?? 'TEXTE',
    exercisePdfFile: null,
    correctionPdfFile: null,
    title: assessment.title,
    instructions: assessment.instructions ?? '',
    durationMinutes:
      assessment.durationSeconds === null
        ? ''
        : String(assessment.durationSeconds / 60),
    passingPercent:
      assessment.passingPercent === null
        ? ''
        : String(assessment.passingPercent),
    position: String(assessment.position + 1),
    questions: assessment.questions.map((question) => ({
      type: question.type,
      statement: question.statement,
      explanation: question.explanation ?? '',
      points: String(question.points),
      options: question.options.map((option) => ({
        label: option.label,
        isCorrect: option.isCorrect,
      })),
    })),
  };
}

interface AssessmentsPageProps {
  fixedKindFilter?: AssessmentKind;
  initialKindFilter?: AssessmentKind | 'TOUS';
}

export default function AssessmentsPage({
  fixedKindFilter,
  initialKindFilter = 'TOUS',
}: AssessmentsPageProps) {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('TOUS');
  const [kindFilter, setKindFilter] =
    useState<KindFilter>(fixedKindFilter ?? initialKindFilter);
  const [form, setForm] = useState<AssessmentForm>(createEmptyForm);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [newKind, setNewKind] = useState<AssessmentKind>('EXERCICE');
  const [editingAssessment, setEditingAssessment] =
    useState<Assessment | null>(null);
  const [viewingAssessment, setViewingAssessment] =
    useState<Assessment | null>(null);
  const [assessmentAction, setAssessmentAction] =
    useState<AssessmentAction | null>(null);
  const [loadingChapters, setLoadingChapters] = useState(true);
  const [loadingAssessments, setLoadingAssessments] = useState(false);
  const [saving, setSaving] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [pageError, setPageError] = useState('');
  const [formError, setFormError] = useState('');
  const [actionError, setActionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [assessmentRefreshId, setAssessmentRefreshId] = useState(0);

  const selectedChapter = useMemo(
    () => chapters.find((chapter) => chapter.id === selectedChapterId) ?? null,
    [chapters, selectedChapterId],
  );
  const activeQuestion =
    form.questions[activeQuestionIndex] ?? form.questions[0];
  const exerciseEditorMode = (editingAssessment?.kind ?? newKind) === 'EXERCICE';
  const pdfExerciseMode = exerciseEditorMode && form.exerciseFormat === 'PDF';

  useEffect(() => {
    let active = true;

    void chaptersService
      .findAll()
      .then((chapterList) => {
        if (active) {
          setChapters(chapterList);
          setLoadingAssessments(chapterList.length > 0);
          setSelectedChapterId((current) => {
            if (chapterList.some((chapter) => chapter.id === current)) {
              return current;
            }
            return chapterList[0]?.id ?? '';
          });
        }
      })
      .catch((error: unknown) => {
        if (active) setPageError(getErrorMessage(error));
      })
      .finally(() => {
        if (active) setLoadingChapters(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedChapterId) return;
    let active = true;

    void assessmentsService
      .findForChapter(selectedChapterId)
      .then((result) => {
        if (active) setAssessments(result);
      })
      .catch((error: unknown) => {
        if (active) setPageError(getErrorMessage(error));
      })
      .finally(() => {
        if (active) setLoadingAssessments(false);
      });

    return () => {
      active = false;
    };
  }, [assessmentRefreshId, selectedChapterId]);

  const visibleAssessments = useMemo(
    () =>
      assessments.filter(
        (assessment) =>
          (statusFilter === 'TOUS' || assessment.status === statusFilter) &&
          (kindFilter === 'TOUS' || assessment.kind === kindFilter),
      ),
    [assessments, kindFilter, statusFilter],
  );
  const kindAssessments = useMemo(
    () =>
      assessments.filter(
        (assessment) =>
          (fixedKindFilter ?? kindFilter) === 'TOUS' ||
          assessment.kind === (fixedKindFilter ?? kindFilter),
      ),
    [assessments, fixedKindFilter, kindFilter],
  );
  const statusCounts = useMemo(
    () => ({
      TOUS: kindAssessments.length,
      BROUILLON: kindAssessments.filter((item) => item.status === 'BROUILLON').length,
      PUBLIE: kindAssessments.filter((item) => item.status === 'PUBLIE').length,
      ARCHIVE: kindAssessments.filter((item) => item.status === 'ARCHIVE').length,
    }),
    [kindAssessments],
  );

  const openCreateForm = (kind: AssessmentKind) => {
    setNewKind(kind);
    setEditingAssessment(null);
    setForm(createEmptyForm());
    setActiveQuestionIndex(0);
    setFormError('');
    setSuccessMessage('');
    setFormOpen(true);
  };

  const openEditForm = (assessment: Assessment) => {
    setEditingAssessment(assessment);
    setForm(getFormFromAssessment(assessment));
    setActiveQuestionIndex(0);
    setFormError('');
    setSuccessMessage('');
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingAssessment(null);
    setForm(createEmptyForm());
    setActiveQuestionIndex(0);
    setFormError('');
  };

  const addQuestion = () => {
    setActiveQuestionIndex(form.questions.length);
    setForm((current) => ({
      ...current,
      questions: [...current.questions, createEmptyQuestion()],
    }));
  };

  const removeQuestion = (questionIndex: number) => {
    setForm((current) => ({
      ...current,
      questions: current.questions.filter((_, index) => index !== questionIndex),
    }));
    setActiveQuestionIndex((current) => {
      if (current > questionIndex) return current - 1;
      if (current === questionIndex) return Math.max(0, current - 1);
      return current;
    });
  };

  const updateQuestion = (
    questionIndex: number,
    changes: Partial<AssessmentQuestionForm>,
  ) => {
    setForm((current) => ({
      ...current,
      questions: current.questions.map((question, index) =>
        index === questionIndex ? { ...question, ...changes } : question,
      ),
    }));
  };

  const changeQuestionType = (
    questionIndex: number,
    type: QuestionType,
  ) => {
    const question = form.questions[questionIndex];
    if (!question) return;

    let options = question.options;
    if (type === 'VRAI_FAUX') {
      options = [
        { label: 'Vrai', isCorrect: false },
        { label: 'Faux', isCorrect: false },
      ];
    } else if (question.type === 'VRAI_FAUX') {
      options = [
        { label: '', isCorrect: true },
        { label: '', isCorrect: false },
      ];
    } else if (
      type === 'QCM_UNIQUE' &&
      question.options.filter((option) => option.isCorrect).length !== 1
    ) {
      let firstCorrect = false;
      options = question.options.map((option) => {
        if (option.isCorrect && !firstCorrect) {
          firstCorrect = true;
          return option;
        }
        return { ...option, isCorrect: false };
      });
      if (!firstCorrect && options.length > 0) {
        options[0] = { ...options[0], isCorrect: true };
      }
    }

    updateQuestion(questionIndex, { type, options });
  };

  const addOption = (questionIndex: number) => {
    const question = form.questions[questionIndex];
    if (!question || question.type === 'VRAI_FAUX') return;
    updateQuestion(questionIndex, {
      options: [...question.options, { label: '', isCorrect: false }],
    });
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    const question = form.questions[questionIndex];
    if (!question || question.options.length <= 2) return;
    updateQuestion(questionIndex, {
      options: question.options.filter((_, index) => index !== optionIndex),
    });
  };

  const setOptionCorrect = (
    questionIndex: number,
    optionIndex: number,
    isCorrect: boolean,
  ) => {
    const question = form.questions[questionIndex];
    if (!question) return;
    updateQuestion(questionIndex, {
      options: question.options.map((option, index) => ({
        ...option,
        isCorrect:
          question.type === 'QCM_MULTIPLE'
            ? index === optionIndex
              ? isCorrect
              : option.isCorrect
            : index === optionIndex,
      })),
    });
  };

  const validateQuestions = (): boolean => {
    const exerciseEditor = (editingAssessment?.kind ?? newKind) === 'EXERCICE';
    if (form.questions.length === 0) {
      setFormError('Ajoutez au moins une question.');
      return false;
    }

    for (let index = 0; index < form.questions.length; index += 1) {
      const question = form.questions[index];
      if (!question.statement.trim()) {
        setFormError(`Saisissez l’énoncé de la question ${index + 1}.`);
        return false;
      }
      if (exerciseEditor && !question.options[0]?.label.trim()) {
        setFormError(`Saisissez la réponse attendue pour l’exercice ${index + 1}.`);
        return false;
      }
      if (!exerciseEditor && question.options.some((option) => !option.label.trim())) {
        setFormError(
          `Complétez toutes les réponses de la question ${index + 1}.`,
        );
        return false;
      }

      if (exerciseEditor) continue;

      const correctCount = question.options.filter(
        (option) => option.isCorrect,
      ).length;
      if (
        (question.type === 'QCM_UNIQUE' && correctCount !== 1) ||
        (question.type === 'QCM_MULTIPLE' && correctCount < 1) ||
        (question.type === 'VRAI_FAUX' &&
          (question.options.length !== 2 || correctCount !== 1))
      ) {
        setFormError(
          `Vérifiez les bonnes réponses de la question ${index + 1}.`,
        );
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError('');

    const title = form.title.trim();
    const position = Number(form.position);
    const durationMinutes =
      form.durationMinutes.trim() === ''
        ? null
        : Number(form.durationMinutes);
    const passingPercent =
      form.passingPercent.trim() === ''
        ? null
        : Number(form.passingPercent);

    if (!title || title.length < 2) {
      setFormError('Le titre doit contenir au moins deux caractères.');
      return;
    }
    if (!Number.isInteger(position) || position < 1) {
      setFormError('L’ordre doit être un entier supérieur ou égal à 1.');
      return;
    }
    if (
      durationMinutes !== null &&
      (!Number.isFinite(durationMinutes) || durationMinutes <= 0)
    ) {
      setFormError('La durée doit être supérieure à zéro.');
      return;
    }
    if (
      passingPercent !== null &&
      (!Number.isInteger(passingPercent) ||
        passingPercent < 0 ||
        passingPercent > 100)
    ) {
      setFormError('Le seuil de réussite doit être entre 0 et 100 %.');
      return;
    }
    const exerciseEditor = (editingAssessment?.kind ?? newKind) === 'EXERCICE';
    const pdfExercise = exerciseEditor && form.exerciseFormat === 'PDF';
    if (!pdfExercise && !validateQuestions()) return;
    if (pdfExercise) {
      if (!form.exercisePdfFile && !editingAssessment?.exercisePdfName) {
        setFormError('Ajoutez le PDF de l’énoncé de l’exercice.');
        return;
      }
      if (!form.correctionPdfFile && !editingAssessment?.correctionPdfName) {
        setFormError('Ajoutez le PDF de correction de l’exercice.');
        return;
      }
    }

    setSaving(true);
    setPageError('');
    setSuccessMessage('');

    try {
      if (editingAssessment) {
        const payload: UpdateAssessmentDto = {
          ...(exerciseEditor ? { exerciseFormat: form.exerciseFormat } : {}),
          title,
          instructions: form.instructions.trim(),
          durationSeconds:
            durationMinutes === null
              ? null
              : Math.round(durationMinutes * 60),
          passingPercent,
          position: position - 1,
          ...(!pdfExercise ? { questions: form.questions.map((question, questionIndex) => ({
            type: question.type,
            statement: question.statement.trim(),
            explanation: question.explanation.trim() || undefined,
            points: Number(question.points),
            position: questionIndex,
            options: (exerciseEditor
              ? [question.options[0]!, { label: '—', isCorrect: false }]
              : question.options).map((option, optionIndex) => ({
              label: option.label.trim(),
              isCorrect: option.isCorrect,
              position: optionIndex,
            })),
          })) } : {}),
        };
        const updated = await assessmentsService.update(
          editingAssessment.id,
          payload,
        );
        let updatedWithFiles = updated;
        if (pdfExercise && form.exercisePdfFile) {
          const file = await assessmentsService.uploadExerciseFile(updated.id, 'EXERCISE', form.exercisePdfFile);
          updatedWithFiles = { ...updatedWithFiles, exercisePdfName: file.name };
        }
        if (pdfExercise && form.correctionPdfFile) {
          const file = await assessmentsService.uploadExerciseFile(updated.id, 'CORRECTION', form.correctionPdfFile);
          updatedWithFiles = { ...updatedWithFiles, correctionPdfName: file.name };
        }
        setAssessments((current) =>
          current.map((item) =>
            item.id === updated.id
              ? {
                  ...item,
                  ...updatedWithFiles,
                  questions: updatedWithFiles.questions ?? item.questions,
                  _count: updatedWithFiles._count ?? item._count,
                }
              : item,
          ),
        );
        setSuccessMessage('Les paramètres du brouillon ont été modifiés.');
      } else {
        if (!selectedChapterId) {
          setFormError('Sélectionnez un chapitre.');
          return;
        }
        const payload: CreateAssessmentDto = {
          ...(newKind === 'EXERCICE' ? { exerciseFormat: form.exerciseFormat } : {}),
          title,
          instructions: form.instructions.trim(),
          durationSeconds:
            durationMinutes === null
              ? undefined
              : Math.round(durationMinutes * 60),
          passingPercent: passingPercent ?? undefined,
          position: position - 1,
          ...(!pdfExercise ? { questions: form.questions.map((question, questionIndex) => ({
            type: question.type,
            statement: question.statement.trim(),
            explanation: question.explanation.trim() || undefined,
            points: Number(question.points),
            position: questionIndex,
            options: (exerciseEditor
              ? [question.options[0]!, { label: '—', isCorrect: false }]
              : question.options).map((option, optionIndex) => ({
              label: option.label.trim(),
              isCorrect: option.isCorrect,
              position: optionIndex,
            })),
          })) } : {}),
        };
        const created = await assessmentsService.create(
          selectedChapterId,
          newKind,
          payload,
        );
        if (pdfExercise) {
          setEditingAssessment(created);
          setAssessments((current) => [...current, created]);
          let createdWithFiles = created;
          if (form.exercisePdfFile) {
            const file = await assessmentsService.uploadExerciseFile(created.id, 'EXERCISE', form.exercisePdfFile);
            createdWithFiles = { ...createdWithFiles, exercisePdfName: file.name };
          }
          if (form.correctionPdfFile) {
            const file = await assessmentsService.uploadExerciseFile(created.id, 'CORRECTION', form.correctionPdfFile);
            createdWithFiles = { ...createdWithFiles, correctionPdfName: file.name };
          }
          setEditingAssessment(createdWithFiles);
          setAssessments((current) => current.map(item => item.id === created.id ? createdWithFiles : item));
        } else {
        setAssessments((current) => [...current, created]);
        }
        setSuccessMessage(
          newKind === 'QUIZ'
            ? `Le quiz « ${created.title} » a été créé en brouillon.`
            : `L’exercice « ${created.title} » a été créé en brouillon.`,
        );
      }

      closeForm();
    } catch (error) {
      setFormError(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const confirmAction = async () => {
    if (!assessmentAction) return;
    const { assessment, action } = assessmentAction;
    setProcessingId(assessment.id);
    setActionError('');
    setSuccessMessage('');

    try {
      const updated =
        action === 'publish'
          ? await assessmentsService.publish(assessment.id)
          : await assessmentsService.archive(assessment.id);
      setAssessments((current) =>
        current.map((item) =>
          item.id === updated.id
            ? {
                ...item,
                ...updated,
                questions: updated.questions ?? item.questions,
                _count: updated._count ?? item._count,
              }
            : item,
        ),
      );
      setSuccessMessage(
        action === 'publish'
          ? assessment.kind === 'QUIZ'
            ? 'Le quiz a été publié.'
            : 'L’exercice a été publié.'
          : assessment.kind === 'QUIZ'
            ? 'Le quiz a été archivé.'
            : 'L’exercice a été archivé.',
      );
      setAssessmentAction(null);
      if (action === 'publish' && formOpen && editingAssessment?.id === assessment.id) {
        closeForm();
      }
    } catch (error) {
      setActionError(getErrorMessage(error));
    } finally {
      setProcessingId(null);
    }
  };

  const refreshAssessments = () => {
    setSuccessMessage('');
    setPageError('');
    setLoadingAssessments(Boolean(selectedChapterId));
    setAssessmentRefreshId((current) => current + 1);
  };

  return (
    <div className="courses-page assessments-page">
      <header className="courses-header">
        <div>
          <h1>
            {fixedKindFilter
              ? fixedKindFilter === 'QUIZ'
                ? 'Quiz'
                : 'Exercices'
              : 'Exercices et quiz'}
          </h1>
          <p>
            {fixedKindFilter === 'QUIZ'
              ? 'Créez et gérez les quiz des chapitres.'
              : fixedKindFilter === 'EXERCICE'
                ? 'Créez et gérez les exercices des chapitres.'
                : 'Créez et gérez les exercices et quiz des chapitres.'}
          </p>
        </div>
        <div className="courses-header-actions">
          <button
            type="button"
            className="courses-button"
            onClick={refreshAssessments}
            disabled={loadingChapters || loadingAssessments || saving}
          >
            Actualiser
          </button>
          {fixedKindFilter ? (
            <button
              type="button"
              className="courses-button courses-button-primary"
              onClick={() => openCreateForm(fixedKindFilter)}
              disabled={!selectedChapterId || loadingChapters || saving}
            >
              + Nouveau {fixedKindFilter === 'QUIZ' ? 'quiz' : 'exercice'}
            </button>
          ) : (
            <>
              <button
                type="button"
                className="courses-button courses-button-primary"
                onClick={() => openCreateForm('EXERCICE')}
                disabled={!selectedChapterId || loadingChapters || saving}
              >
                + Nouvel exercice
              </button>
              <button
                type="button"
                className="courses-button courses-button-primary"
                onClick={() => openCreateForm('QUIZ')}
                disabled={!selectedChapterId || loadingChapters || saving}
              >
                + Nouveau quiz
              </button>
            </>
          )}
        </div>
      </header>

      {pageError && (
        <div className="assessments-message assessments-error" role="alert">
          {pageError}
        </div>
      )}
      {successMessage && (
        <div className="assessments-message assessments-success" role="status">
          {successMessage}
        </div>
      )}

      <div className="courses-toolbar assessments-toolbar">
        <div className="chips" aria-label="Filtrer par statut">
          {statusFilters.map((status) => (
            <button
              key={status}
              type="button"
              aria-pressed={statusFilter === status}
              className={statusFilter === status ? 'is-active' : ''}
              onClick={() => setStatusFilter(status)}
            >
              {status === 'TOUS' ? 'Tous' : statusLabels[status]}
              <span>{statusCounts[status]}</span>
            </button>
          ))}
        </div>
        <div className="filters">
          <select
            aria-label="Chapitre"
            value={selectedChapterId}
            onChange={(event) => {
              const chapterId = event.target.value;
              setSelectedChapterId(chapterId);
              setLoadingAssessments(Boolean(chapterId));
              if (!chapterId) setAssessments([]);
              setSuccessMessage('');
              setPageError('');
            }}
            disabled={loadingChapters}
          >
            <option value="">
              {loadingChapters ? 'Chargement...' : 'Chapitre : choisir'}
            </option>
            {chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                {chapter.title} · {getChapterContext(chapter)}
              </option>
            ))}
          </select>
          {!fixedKindFilter && (
            <select
              aria-label="Type d’évaluation"
              value={kindFilter}
              onChange={(event) =>
                setKindFilter(event.target.value as KindFilter)
              }
            >
              <option value="TOUS">Type : tous</option>
              <option value="EXERCICE">Exercices</option>
              <option value="QUIZ">Quiz</option>
            </select>
          )}
        </div>
      </div>

      <section className="courses-table-card">
        {loadingAssessments ? (
          <div className="courses-empty">Chargement des évaluations...</div>
        ) : !selectedChapter ? (
          <div className="courses-empty">
            {chapters.length === 0
              ? 'Créez d’abord un chapitre pour pouvoir ajouter des exercices et des quiz.'
              : 'Sélectionnez un chapitre pour consulter ses évaluations.'}
          </div>
        ) : visibleAssessments.length === 0 ? (
          <div className="courses-empty">
            Aucune évaluation ne correspond à ces filtres dans ce chapitre.
          </div>
        ) : (
          <div className="table-scroll">
            <table className="courses-table assessments-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Classe</th>
                  <th>Matière · chapitre</th>
                  <th>Statut</th>
                  <th>Version</th>
                  <th>Détails</th>
                  <th>Modifié</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {visibleAssessments.map((assessment) => (
                  <tr key={assessment.id}>
                    <td>
                      <div className="cell-title">
                        <span className="type-icon" aria-hidden="true">
                          {assessment.kind === 'QUIZ' ? '☑' : '✎'}
                        </span>
                        <div>
                          <strong>{assessment.title}</strong>
                          <small>
                            {kindLabels[assessment.kind]} · {assessment.kind === 'EXERCICE' && assessment.exerciseFormat === 'PDF'
                              ? 'PDF'
                              : `${assessment.questions.length} ${assessment.questions.length === 1 ? 'question' : 'questions'}`}
                          </small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <strong>{selectedChapter.classSubject.class.code}</strong>
                    </td>
                    <td className="muted">
                      {selectedChapter.classSubject.subject.name} · {selectedChapter.title}
                    </td>
                    <td>
                      <span className={`pill pill-${assessment.status.toLowerCase()}`}>
                        {statusLabels[assessment.status]}
                      </span>
                    </td>
                    <td className="muted">v{assessment.version}</td>
                    <td className="muted">
                      {assessment.durationSeconds !== null
                        ? `${Math.ceil(assessment.durationSeconds / 60)} min · `
                        : ''}
                      {assessment.questions.reduce(
                        (total, question) => total + question.points,
                        0,
                      )}{' '}
                      pts
                    </td>
                    <td className="muted">{formatUpdatedDate(assessment.updatedAt)}</td>
                    <td>
                      <div className="row-actions">
                        <button
                          type="button"
                          className="courses-text-button"
                          onClick={() => setViewingAssessment(assessment)}
                          disabled={processingId !== null}
                        >
                          Voir
                        </button>
                        {assessment.status === 'BROUILLON' && (
                          <>
                            <button
                              type="button"
                              className="courses-text-button"
                              onClick={() => openEditForm(assessment)}
                              disabled={saving || processingId !== null}
                            >
                              Modifier
                            </button>
                            <button
                              type="button"
                              className="courses-text-button courses-publish-button"
                              onClick={() => {
                                setActionError('');
                                setAssessmentAction({ assessment, action: 'publish' });
                              }}
                              disabled={processingId !== null}
                            >
                              Publier
                            </button>
                          </>
                        )}
                        {assessment.status !== 'ARCHIVE' && (
                          <button
                            type="button"
                            className="courses-text-button courses-danger-button"
                            onClick={() => {
                              setActionError('');
                              setAssessmentAction({ assessment, action: 'archive' });
                            }}
                            disabled={processingId !== null}
                          >
                            Archiver
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <footer className="table-footer">
          {visibleAssessments.length} sur {kindAssessments.length} évaluation(s)
        </footer>
      </section>

      {formOpen && (
        <div className="assessment-editor-page">
          <header className="courses-header">
            <div>
              <button
                type="button"
                className="courses-back"
                onClick={closeForm}
                disabled={saving}
              >
                ← Retour aux {kindLabels[(editingAssessment?.kind ?? newKind)].toLowerCase()}s
              </button>
              <h1>
                {form.title.trim() ||
                  `${editingAssessment ? 'Modifier' : 'Nouveau'} ${kindLabels[
                    editingAssessment?.kind ?? newKind
                  ].toLowerCase()}`}
              </h1>
              <p>
                {selectedChapter
                  ? `${selectedChapter.title} · ${getChapterContext(selectedChapter)}`
                  : 'Sélectionnez un chapitre'}
                {' · '}{pdfExerciseMode ? 'Énoncé et correction PDF' : `${form.questions.length} question(s)`}
              </p>
            </div>
            <div className="courses-header-actions">
              {editingAssessment?.status === 'BROUILLON' && (
                <button
                  type="button"
                  className="courses-button"
                  onClick={() => {
                    setActionError('');
                    setAssessmentAction({
                      assessment: editingAssessment,
                      action: 'publish',
                    });
                  }}
                  disabled={saving || processingId !== null}
                >
                  Publier
                </button>
              )}
              <button
                type="submit"
                form="assessment-editor-form"
                className="courses-button courses-button-primary"
                disabled={saving}
              >
                {saving
                  ? 'Enregistrement...'
                  : editingAssessment
                    ? 'Enregistrer les modifications'
                    : 'Enregistrer le brouillon'}
              </button>
            </div>
          </header>

          {formError && (
            <div className="courses-message courses-error" role="alert">
              {formError}
            </div>
          )}

          <form
            id="assessment-editor-form"
            className="assessment-editor-form"
            onSubmit={handleSubmit}
          >
            <div className="assessment-editor-grid">
              <aside className="assessment-editor-sidebar">
                <section className="courses-card assessment-settings">
                  <h2>Paramètres</h2>
                  {exerciseEditorMode && <div className="field">
                    <span>Format de l’exercice</span>
                    <div className="exercise-format-choice" role="group" aria-label="Format de l’exercice">
                      <button type="button" className={form.exerciseFormat === 'TEXTE' ? 'is-active' : ''} onClick={() => setForm(current => ({ ...current, exerciseFormat: 'TEXTE' }))}>Texte</button>
                      <button type="button" className={form.exerciseFormat === 'PDF' ? 'is-active' : ''} onClick={() => setForm(current => ({ ...current, exerciseFormat: 'PDF' }))}>PDF</button>
                    </div>
                  </div>}
                  <label className="field">
                    <span>Titre</span>
                    <input
                      className="field-title"
                      value={form.title}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          title: event.target.value,
                        }))
                      }
                      maxLength={150}
                      required
                    />
                  </label>
                  <label className="field">
                    <span>Consignes</span>
                    <textarea
                      value={form.instructions}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          instructions: event.target.value,
                        }))
                      }
                      rows={3}
                    />
                  </label>
                  <div className="assessment-settings-grid">
                    <label className="field">
                      <span>Durée (min)</span>
                      <input
                        type="number"
                        min="0.5"
                        step="0.5"
                        value={form.durationMinutes}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            durationMinutes: event.target.value,
                          }))
                        }
                      />
                    </label>
                    <label className="field">
                      <span>Réussite (%)</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                        value={form.passingPercent}
                        onChange={(event) =>
                          setForm((current) => ({
                            ...current,
                            passingPercent: event.target.value,
                          }))
                        }
                      />
                    </label>
                  </div>
                  <label className="field">
                    <span>Ordre dans le chapitre</span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={form.position}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          position: event.target.value,
                        }))
                      }
                      required
                    />
                  </label>
                </section>

                {!pdfExerciseMode && <section className="courses-card quiz-list">
                  <div className="assessment-questions-heading">
                    <div>
                      <h2>Questions</h2>
                      <p>{form.questions.length} au total</p>
                    </div>
                    <button
                      type="button"
                      className="courses-button"
                      onClick={addQuestion}
                    >
                      + Ajouter
                    </button>
                  </div>
                  {form.questions.map((question, questionIndex) => (
                    <button
                      key={`question-nav-${questionIndex}`}
                      type="button"
                      className={`quiz-item${questionIndex === activeQuestionIndex ? ' is-active' : ''}`}
                      onClick={() => setActiveQuestionIndex(questionIndex)}
                    >
                      <span className="quiz-num">{questionIndex + 1}</span>
                      <span>
                        <strong>
                          {question.statement.trim() || 'Question sans titre'}
                        </strong>
                        <small>{(editingAssessment?.kind ?? newKind) === 'EXERCICE' ? 'Réponse libre' : questionTypeLabels[question.type]}</small>
                      </span>
                    </button>
                  ))}
                </section>}
              </aside>

              {pdfExerciseMode ? <section className="courses-card exercise-pdf-editor">
                <h2>Documents PDF de l’exercice</h2>
                <p>Les élèves liront l’énoncé, feront l’exercice dans leur cahier, puis ouvriront la correction PDF.</p>
                <label className="field">
                  <span>PDF de l’énoncé</span>
                  <input type="file" accept="application/pdf,.pdf" onChange={event => setForm(current => ({ ...current, exercisePdfFile: event.target.files?.[0] ?? null }))} />
                  <small>{form.exercisePdfFile?.name ?? editingAssessment?.exercisePdfName ?? 'Aucun fichier sélectionné'}</small>
                </label>
                <label className="field">
                  <span>PDF de correction</span>
                  <input type="file" accept="application/pdf,.pdf" onChange={event => setForm(current => ({ ...current, correctionPdfFile: event.target.files?.[0] ?? null }))} />
                  <small>{form.correctionPdfFile?.name ?? editingAssessment?.correctionPdfName ?? 'Aucun fichier sélectionné'}</small>
                </label>
              </section> : activeQuestion && (
                <section className="courses-card quiz-edit assessment-question-workspace">
                  <div className="assessment-question-heading">
                    <div>
                      <small className="muted">
                        Question {activeQuestionIndex + 1} sur {form.questions.length}
                      </small>
                      <h2>{activeQuestion.statement.trim() || 'Nouvelle question'}</h2>
                    </div>
                    {form.questions.length > 1 && (
                      <button
                        type="button"
                        className="courses-text-button courses-danger-button"
                        onClick={() => removeQuestion(activeQuestionIndex)}
                      >
                        Supprimer
                      </button>
                    )}
                  </div>

                  <label className="field">
                    <span>Énoncé de la question</span>
                    <textarea
                      value={activeQuestion.statement}
                      onChange={(event) =>
                        updateQuestion(activeQuestionIndex, {
                          statement: event.target.value,
                        })
                      }
                      rows={4}
                      required
                    />
                  </label>

                  {(editingAssessment?.kind ?? newKind) !== 'EXERCICE' && <div className="assessment-question-controls">
                    <div className="segmented" aria-label="Type de question">
                      {Object.entries(questionTypeLabels).map(([type, label]) => (
                        <button
                          key={type}
                          type="button"
                          className={activeQuestion.type === type ? 'is-active' : ''}
                          onClick={() =>
                            changeQuestionType(
                              activeQuestionIndex,
                              type as QuestionType,
                            )
                          }
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <label className="field assessment-points-field">
                      <span>Points</span>
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={activeQuestion.points}
                        onChange={(event) =>
                          updateQuestion(activeQuestionIndex, {
                            points: event.target.value,
                          })
                        }
                        required
                      />
                    </label>
                  </div>}

                  {(editingAssessment?.kind ?? newKind) === 'EXERCICE' ? (
                    <label className="field assessment-free-response">
                      <span>Réponse attendue</span>
                      <textarea
                        value={activeQuestion.options[0]?.label ?? ''}
                        onChange={(event) =>
                          updateQuestion(activeQuestionIndex, {
                            options: [
                              { label: event.target.value, isCorrect: true },
                              ...activeQuestion.options.slice(1),
                            ],
                          })
                        }
                        rows={5}
                        placeholder="Saisissez la réponse ou les éléments de réponse attendus…"
                        required
                      />
                    </label>
                  ) : <div className="assessment-options">
                    <div className="assessment-options-heading">
                      <strong>Réponses</strong>
                      <span>
                        {activeQuestion.type === 'QCM_MULTIPLE'
                          ? 'Coche les bonnes réponses.'
                          : 'Choisis la bonne réponse.'}
                      </span>
                    </div>
                    <div className="quiz-answers">
                      {activeQuestion.options.map((option, optionIndex) => (
                        <div
                          className={`quiz-answer${option.isCorrect ? ' is-correct' : ''}`}
                          key={`option-${activeQuestionIndex}-${optionIndex}`}
                        >
                          <input
                            type={
                              activeQuestion.type === 'QCM_MULTIPLE'
                                ? 'checkbox'
                                : 'radio'
                            }
                            name={`correct-answer-${activeQuestionIndex}`}
                            aria-label={`Bonne réponse ${optionIndex + 1}`}
                            checked={option.isCorrect}
                            onChange={(event) =>
                              setOptionCorrect(
                                activeQuestionIndex,
                                optionIndex,
                                event.target.checked,
                              )
                            }
                          />
                          <input
                            className="quiz-answer-text"
                            value={option.label}
                            readOnly={activeQuestion.type === 'VRAI_FAUX'}
                            onChange={(event) =>
                              updateQuestion(activeQuestionIndex, {
                                options: activeQuestion.options.map(
                                  (currentOption, index) =>
                                    index === optionIndex
                                      ? { ...currentOption, label: event.target.value }
                                      : currentOption,
                                ),
                              })
                            }
                            placeholder={`Réponse ${optionIndex + 1}`}
                            aria-label={`Texte de la réponse ${optionIndex + 1}`}
                            required
                          />
                          <span className="quiz-letter">
                            {'ABCDEF'[optionIndex]}
                          </span>
                          {activeQuestion.type !== 'VRAI_FAUX' &&
                            activeQuestion.options.length > 2 && (
                              <button
                                type="button"
                                className="assessment-option-remove"
                                onClick={() =>
                                  removeOption(activeQuestionIndex, optionIndex)
                                }
                                aria-label={`Supprimer la réponse ${optionIndex + 1}`}
                              >
                                ×
                              </button>
                            )}
                        </div>
                      ))}
                      {activeQuestion.type !== 'VRAI_FAUX' &&
                        activeQuestion.options.length < 6 && (
                          <button
                            type="button"
                            className="quiz-add-answer"
                            onClick={() => addOption(activeQuestionIndex)}
                          >
                            ○ Ajouter une réponse
                          </button>
                        )}
                    </div>
                  </div>}

                  <label className="field">
                    <span>Explication après correction</span>
                    <textarea
                      rows={4}
                      value={activeQuestion.explanation}
                      onChange={(event) =>
                        updateQuestion(activeQuestionIndex, {
                          explanation: event.target.value,
                        })
                      }
                    />
                  </label>
                  <div className="quiz-score">
                    <span>Le score sera calculé automatiquement.</span>
                    <strong>
                      {activeQuestion.points} point
                      {Number(activeQuestion.points) > 1 ? 's' : ''}
                    </strong>
                  </div>
                </section>
              )}
            </div>

            <div className="assessment-form-actions">
              <button
                type="button"
                className="courses-button"
                onClick={closeForm}
                disabled={saving}
              >
                Annuler
              </button>
              <button
                type="submit"
                className="courses-button courses-button-primary"
                disabled={saving}
              >
                {saving
                  ? 'Enregistrement...'
                  : editingAssessment
                    ? 'Enregistrer les modifications'
                    : `Créer le ${kindLabels[newKind].toLowerCase()}`}
              </button>
            </div>
          </form>
        </div>
      )}

      {viewingAssessment && (
        <Modal
          title={viewingAssessment.title}
          description={`${kindLabels[viewingAssessment.kind]} · ${selectedChapter?.title ?? ''}`}
          onClose={() => setViewingAssessment(null)}
        >
          <div className="assessment-preview">
            {viewingAssessment.kind === 'EXERCICE' && viewingAssessment.exerciseFormat === 'PDF' && (
              <section className="exercise-pdf-preview">
                <p>Énoncé : {viewingAssessment.exercisePdfName ?? 'PDF manquant'}</p>
                <p>Correction : {viewingAssessment.correctionPdfName ?? 'PDF manquant'}</p>
              </section>
            )}
            {viewingAssessment.instructions && (
              <p className="assessment-preview-instructions">
                {viewingAssessment.instructions}
              </p>
            )}
            {viewingAssessment.kind === 'EXERCICE' && viewingAssessment.exerciseFormat === 'PDF' ? null : viewingAssessment.questions.length === 0 ? (
              <p className="assessments-empty">
                Cette évaluation ne contient pas encore de question.
              </p>
            ) : (
              viewingAssessment.questions.map((question, index) => (
                <article className="assessment-preview-question" key={question.id}>
                  <div className="assessment-question-heading">
                    <h3>
                      {index + 1}. {question.statement}
                    </h3>
                    <span>
                      {question.points} pt · {questionTypeLabels[question.type]}
                    </span>
                  </div>
                  {viewingAssessment.kind === 'EXERCICE' ? (
                    <div className="assessment-preview-answer">
                      <strong>Réponse attendue</strong>
                      <p>{question.options.find((option) => option.isCorrect)?.label}</p>
                    </div>
                  ) : <ul>
                    {question.options.map((option) => (
                      <li
                        className={
                          option.isCorrect
                            ? 'assessment-preview-correct'
                            : undefined
                        }
                        key={option.id}
                      >
                        {option.label}
                        {option.isCorrect && <strong> · Bonne réponse</strong>}
                      </li>
                    ))}
                  </ul>}
                  {question.explanation && (
                    <p className="assessment-preview-explanation">
                      Explication : {question.explanation}
                    </p>
                  )}
                </article>
              ))
            )}
          </div>
        </Modal>
      )}

      {assessmentAction && (
        <ConfirmationModal
          title={
            assessmentAction.action === 'publish'
              ? 'Publier l’évaluation'
              : 'Archiver l’évaluation'
          }
          message={`Voulez-vous ${assessmentAction.action === 'publish' ? 'publier' : 'archiver'} « ${assessmentAction.assessment.title} » ?`}
          confirmLabel={
            assessmentAction.action === 'publish' ? 'Publier' : 'Archiver'
          }
          destructive={assessmentAction.action === 'archive'}
          loading={processingId === assessmentAction.assessment.id}
          error={actionError}
          onCancel={() => {
            if (processingId === null) {
              setAssessmentAction(null);
              setActionError('');
            }
          }}
          onConfirm={() => void confirmAction()}
        />
      )}
    </div>
  );
}
