import type { ClassSubject, Lesson, ProgressLesson } from './types';

function isComplete(type: string | undefined, percent: number, completedAt?: string | null) {
  return Boolean(completedAt) || (type === 'VIDEO' ? percent >= 80 : percent >= 100);
}

export function getSubjectProgress(
  subject: ClassSubject,
  lessons: Lesson[],
  progressRecords: ProgressLesson[],
) {
  const subjectLessons = lessons.filter((lesson) => lesson.chapter?.classSubjectId === subject.id);
  const subjectProgress = progressRecords.filter((item) => item.lesson.chapter.classSubjectId === subject.id);
  const progressById = new Map(subjectProgress.map((item) => [item.lesson.id, item]));
  const total = subjectLessons.length || subject.totalLessons || 0;

  const progressValues = subjectLessons.length
    ? subjectLessons.map((lesson) => {
      const record = progressById.get(lesson.id);
      const percent = lesson.myProgress?.progressPercent ?? record?.progressPercent ?? 0;
      const completedAt = lesson.myProgress?.completedAt ?? record?.completedAt;
      return isComplete(lesson.type, percent, completedAt) ? 100 : Math.max(0, Math.min(percent, 100));
    })
    : subjectProgress.map((record) => isComplete(record.lesson.type, record.progressPercent, record.completedAt)
      ? 100
      : Math.max(0, Math.min(record.progressPercent, 100)));

  const completed = subjectLessons.length
    ? subjectLessons.filter((lesson) => {
      const record = progressById.get(lesson.id);
      const percent = lesson.myProgress?.progressPercent ?? record?.progressPercent ?? 0;
      const completedAt = lesson.myProgress?.completedAt ?? record?.completedAt;
      return isComplete(lesson.type, percent, completedAt);
    }).length
    : subjectProgress.filter((record) => isComplete(record.lesson.type, record.progressPercent, record.completedAt)).length;

  const progressPercent = total
    ? Math.round(progressValues.reduce((sum, value) => sum + value, 0) / total)
    : subject.progressPercent ?? 0;

  return {
    total,
    completed,
    tracked: subjectLessons.length
      ? subjectLessons.filter((lesson) => Boolean(lesson.myProgress) || progressById.has(lesson.id)).length
      : subjectProgress.length,
    progressPercent,
  };
}
