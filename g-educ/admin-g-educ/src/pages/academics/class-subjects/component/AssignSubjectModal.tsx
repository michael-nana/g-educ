
import { useState } from 'react';
import type { FormEvent } from 'react';

import type { SchoolClass } from '../../../../services/classes.types';
import type { AssignSubjectDto } from '../../../../services/class-subjects.types';
import type { Subject } from '../../../../services/subjects.types';

interface AssignSubjectModalProps {
  schoolClass: SchoolClass;
  subjects: Subject[];
  loading: boolean;
  serverError?: string;
  initialPosition?: number;
  onClose: () => void;
  onSubmit: (payload: AssignSubjectDto) => void;
}

export default function AssignSubjectModal({
  schoolClass,
  subjects,
  loading,
  serverError = '',
  initialPosition = 0,
  onClose,
  onSubmit,
}: AssignSubjectModalProps) {
  const [subjectId, setSubjectId] = useState('');
  const [coefficient, setCoefficient] = useState('1');
  const [position, setPosition] = useState(String(initialPosition));
  const [error, setError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const cleanSubjectId = subjectId.trim();

    if (!subjects.some((subject) => subject.id === cleanSubjectId)) {
      setError('Sélectionnez une matière dans la liste.');
      return;
    }

    const parsedCoefficient = Number(coefficient);
    const parsedPosition = Number(position);

    if (
      !Number.isInteger(parsedCoefficient) ||
      parsedCoefficient < 1
    ) {
      setError('Le coefficient doit être un entier supérieur ou égal à 1.');
      return;
    }

    if (
      !Number.isInteger(parsedPosition) ||
      parsedPosition < 0
    ) {
      setError('La position doit être un entier positif ou nul.');
      return;
    }

    onSubmit({
      subjectId: cleanSubjectId,
      coefficient: parsedCoefficient,
      position: parsedPosition,
    });
  };

  return (
    <div
      className="assign-modal-backdrop"
      onClick={onClose}
    >
      <div
        className="assign-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="assign-modal-header">
          <div>
            <h2>Affecter une matière</h2>
            <p>
              Classe : <strong>{schoolClass.label}</strong>
            </p>
          </div>

          <button
            type="button"
            className="assign-modal-close"
            onClick={onClose}
            disabled={loading}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="assign-modal-error">
              {error}
            </div>
          )}
          {serverError && (
            <div className="assign-modal-error" role="alert">
              {serverError}
            </div>
          )}

          <div className="assign-form-field">
            <label htmlFor="subjectId">Matière</label>
            <select
              id="subjectId"
              value={subjectId}
              onChange={(event) => setSubjectId(event.target.value)}
              required
              disabled={loading || subjects.length === 0}
            >
              <option value="">Sélectionner une matière</option>

              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>

            <small>
              {subjects.length === 0
                ? 'Aucune matière active disponible.'
                : 'Sélectionnez une matière existante et active.'}
            </small>
          </div>

          <div className="assign-form-field">
            <label htmlFor="coefficient">
              Coefficient
            </label>

            <input
              id="coefficient"
              type="number"
              min="1"
              step="1"
              value={coefficient}
              onChange={(event) => setCoefficient(event.target.value)}
              required
            />
          </div>

          <div className="assign-form-field">
            <label htmlFor="position">
              Position
            </label>

            <input
              id="position"
              type="number"
              min="0"
              step="1"
              value={position}
              onChange={(event) => setPosition(event.target.value)}
            />
          </div>

          <div className="assign-modal-actions">
            <button
              type="button"
              className="assign-cancel-button"
              onClick={onClose}
              disabled={loading}
            >
              Annuler
            </button>

            <button
              type="submit"
              className="assign-submit-button"
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 'Affecter la matière'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
