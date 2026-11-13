
import { useState } from 'react';
import type { FormEvent } from 'react';

import type {
  Subject,
  CreateSubjectDto,
  UpdateSubjectDto,
} from '../../../../services/subjects.types';

interface SubjectFormModalProps {
  subject?: Subject | null;
  loading: boolean;
  serverError?: string;
  onClose: () => void;
  onSubmit: (
    payload: CreateSubjectDto | UpdateSubjectDto,
  ) => void;
}

export default function SubjectFormModal({
  subject,
  loading,
  serverError = '',
  onClose,
  onSubmit,
}: SubjectFormModalProps) {
  const [name, setName] = useState(subject?.name ?? '');
  const [isActive, setIsActive] = useState(subject?.isActive ?? true);
  const [error, setError] = useState('');

  const isEditing = Boolean(subject);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const cleanName = name.trim();

    if (!cleanName) {
      setError('Le nom de la matière est obligatoire.');
      return;
    }

    if (cleanName.length > 100) {
      setError('Le nom ne doit pas dépasser 100 caractères.');
      return;
    }

    if (isEditing) {
      const payload: UpdateSubjectDto = {
        name: cleanName,
        isActive,
      };

      onSubmit(payload);
    } else {
      const payload: CreateSubjectDto = {
        name: cleanName,
      };

      onSubmit(payload);
    }
  };

  return (
    <div
      className="subject-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="subject-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="subject-modal-header">
          <div>
            <h2>
              {isEditing ? 'Modifier la matière' : 'Nouvelle matière'}
            </h2>

            <p>
              {isEditing
                ? 'Modifiez les informations de cette matière.'
                : 'Enregistrez une nouvelle matière.'}
            </p>
          </div>

          <button
            type="button"
            className="subject-modal-close"
            onClick={onClose}
            disabled={loading}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="subject-form-error">
              {error}
            </div>
          )}
          {serverError && (
            <div className="subject-form-error" role="alert">
              {serverError}
            </div>
          )}

          <div className="subject-form-field">
            <label htmlFor="subjectName">
              Nom de la matière
            </label>

            <input
              id="subjectName"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
              placeholder="Ex. Mathématiques"
              required
            />

            <small>{name.length}/100 caractères</small>
          </div>

          {isEditing && (
            <label className="subject-active-checkbox">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(event) => setIsActive(event.target.checked)}
              />

              <span>Matière active</span>
            </label>
          )}

          <div className="subject-modal-actions">
            <button
              type="button"
              className="subject-cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </button>

            <button
              type="submit"
              className="subject-submit-button"
              disabled={loading}
            >
              {loading
                ? 'Enregistrement...'
                : isEditing
                  ? 'Enregistrer les modifications'
                  : 'Créer la matière'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
