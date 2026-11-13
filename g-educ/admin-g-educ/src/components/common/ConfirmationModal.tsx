import type { ReactNode } from 'react';

import Modal from './Modal';

import './ConfirmationModal.css';

interface ConfirmationModalProps {
  title: string;
  message: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  error?: string;
  onCancel: () => void;
  onConfirm: () => void;
  children?: ReactNode;
}

export default function ConfirmationModal({
  title,
  message,
  confirmLabel,
  cancelLabel = 'Annuler',
  destructive = false,
  loading = false,
  error,
  onCancel,
  onConfirm,
  children,
}: ConfirmationModalProps) {
  return (
    <Modal title={title} onClose={onCancel} closeDisabled={loading}>
      <div className="geduc-confirmation">
        <p className="geduc-confirmation-message">{message}</p>
        {children}
        {error && (
          <div className="geduc-confirmation-error" role="alert">
            {error}
          </div>
        )}
        <div className="geduc-confirmation-actions">
          <button
            type="button"
            className="geduc-confirmation-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={
              destructive
                ? 'geduc-confirmation-submit geduc-confirmation-danger'
                : 'geduc-confirmation-submit'
            }
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Traitement...' : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
