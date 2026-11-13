import type { ReactNode, MouseEvent } from 'react';

import './Modal.css';

interface ModalProps {
  title: string;
  description?: string;
  onClose: () => void;
  closeDisabled?: boolean;
  children: ReactNode;
}

export default function Modal({
  title,
  description,
  onClose,
  closeDisabled = false,
  children,
}: ModalProps) {
  const handleBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && !closeDisabled) {
      onClose();
    }
  };

  return (
    <div
      className="geduc-modal-backdrop"
      onMouseDown={handleBackdropMouseDown}
    >
      <section
        className="geduc-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="geduc-modal-title"
        aria-describedby={description ? 'geduc-modal-description' : undefined}
      >
        <header className="geduc-modal-header">
          <div>
            <h2 id="geduc-modal-title">{title}</h2>
            {description && (
              <p id="geduc-modal-description">{description}</p>
            )}
          </div>
          <button
            type="button"
            className="geduc-modal-close"
            onClick={onClose}
            disabled={closeDisabled}
            aria-label="Fermer"
          >
            ×
          </button>
        </header>
        <div className="geduc-modal-body">{children}</div>
      </section>
    </div>
  );
}
