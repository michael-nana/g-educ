import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import Icon from '../../../components/common/Icon';
import ConfirmationModal from '../../../components/common/ConfirmationModal';
import { usersService } from '../../../services/users.service';
import type { FormEvent, KeyboardEvent } from 'react';
import type {
  UserListItem,
  UserDetails,
  UserRole,
  UserStatus,
  UsersPagination,
  StaffRole,
  CreateStaffDto,
  CreateStaffResponse,
} from '../../../services/users.types';

import './UsersPage.css';

const PAGE_SIZE = 20;

const roleLabels: Record<UserRole, string> = {
  ELEVE: 'Élève',
  ENSEIGNANT: 'Enseignant',
  MODERATEUR: 'Modérateur',
  ADMINISTRATEUR: 'Administrateur',
};

const statusLabels: Record<UserStatus, string> = {
  ACTIF: 'Actif',
  SUSPENDU: 'Suspendu',
};

type Tab = 'ELEVES' | 'PERSONNEL' | 'SUSPENDUS';
type ModalType = 'details' | 'edit' | null;
type UserStatusAction = { user: UserListItem; action: 'suspend' | 'reactivate' };

const tabs: { id: Tab; label: string }[] = [
  { id: 'ELEVES', label: 'Élèves' },
  { id: 'PERSONNEL', label: 'Personnel' },
  { id: 'SUSPENDUS', label: 'Suspendus' },
];

function formatDate(value: string | null): string {
  if (!value) return 'Jamais connecté';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function formatRelative(value: string | null): string {
  if (!value) return 'Jamais connecté';
  const diff = Date.now() - new Date(value).getTime();
  if (Number.isNaN(diff)) return '—';
  const min = Math.floor(diff / 60000);
  if (min < 2) return 'maintenant';
  if (min < 60) return `il y a ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `il y a ${h} h`;
  const d = Math.floor(h / 24);
  if (d === 1) return 'hier';
  if (d < 30) return `il y a ${d} j`;
  return formatDate(value);
}

function initials(label: string): string {
  const parts = label.replace(/[^\p{L}\d\s]/gu, '').trim().split(/\s+/);
  return (parts[0]?.[0] ?? '?').concat(parts[1]?.[0] ?? '').toUpperCase();
}

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) return message.join(', ');
    if (typeof message === 'string') return message;
    if (!error.response) {
      return 'Impossible de contacter le serveur. Vérifiez votre connexion.';
    }
    return 'Une erreur est survenue pendant cette opération.';
  }
  return 'Une erreur inattendue est survenue.';
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserListItem[]>([]);
  const [pagination, setPagination] = useState<UsersPagination>({
    page: 1,
    limit: PAGE_SIZE,
    total: 0,
    totalPages: 0,
  });
  const [tab, setTab] = useState<Tab>('PERSONNEL');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const [modal, setModal] = useState<ModalType>(null);
  const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [pendingStatusAction, setPendingStatusAction] =
    useState<UserStatusAction | null>(null);

  const [editRole, setEditRole] = useState<UserRole>('ELEVE');
  const [editCanPublish, setEditCanPublish] = useState(false);

  const [staffPhone, setStaffPhone] = useState('+226');
  const [staffRole, setStaffRole] = useState<StaffRole>('ENSEIGNANT');
  const [staffCanPublish, setStaffCanPublish] = useState(false);
  const [staffIds, setStaffIds] = useState<string[]>([]);
  const [idDraft, setIdDraft] = useState('');
  const [formError, setFormError] = useState('');
  const [createdStaff, setCreatedStaff] =
    useState<CreateStaffResponse | null>(null);

  useEffect(() => {
    let cancelled = false;

    const timeout = window.setTimeout(async () => {
      setIsLoading(true);
      setError('');
      try {
        const response = await usersService.list({
          search: search.trim() || undefined,
          role: tab === 'ELEVES' ? 'ELEVE' : undefined,
          status: tab === 'SUSPENDUS' ? 'SUSPENDU' : undefined,
          page: pagination.page,
          limit: PAGE_SIZE,
        });
        if (cancelled) return;
        setUsers(response.data);
        setPagination(response.pagination);
      } catch (err) {
        if (cancelled) return;
        setUsers([]);
        setError(getErrorMessage(err));
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [search, tab, pagination.page, reloadKey]);

  // L'onglet « Personnel » exclut les élèves (l'API n'accepte qu'un seul rôle).
  const rows = useMemo(
    () =>
      tab === 'PERSONNEL'
        ? users.filter((u) => u.role !== 'ELEVE' && u.status === 'ACTIF')
        : users,
    [users, tab],
  );

  function refreshUsers() {
    setReloadKey((c) => c + 1);
  }

  function changeTab(next: Tab) {
    setTab(next);
    setPagination((c) => ({ ...c, page: 1 }));
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPagination((c) => ({ ...c, page: 1 }));
  }

  function closeModal() {
    if (isSubmitting) return;
    setModal(null);
    setSelectedUser(null);
    setUserDetails(null);
    setActionError('');
  }

  async function openDetails(user: UserListItem) {
    setSelectedUser(user);
    setUserDetails(null);
    setActionError('');
    setModal('details');
    try {
      setUserDetails(await usersService.findOne(user.id));
    } catch (err) {
      setActionError(getErrorMessage(err));
    }
  }

  function openEdit(user: UserListItem) {
    setSelectedUser(user);
    setEditRole(user.role);
    setEditCanPublish(user.canPublish);
    setActionError('');
    setModal('edit');
  }

  async function handleUpdateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedUser) return;
    setIsSubmitting(true);
    setActionError('');
    try {
      await usersService.update(selectedUser.id, {
        role: editRole,
        canPublish: editCanPublish,
      });
      setSuccessMessage('Les informations de l’utilisateur ont été mises à jour.');
      setModal(null);
      refreshUsers();
    } catch (err) {
      setActionError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function togglePublish(user: UserListItem) {
    setError('');
    try {
      await usersService.update(user.id, {
        role: user.role,
        canPublish: !user.canPublish,
      });
      refreshUsers();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  async function confirmStatusAction() {
    if (!pendingStatusAction) return;
    const { user, action } = pendingStatusAction;
    setIsSubmitting(true);
    setActionError('');
    try {
      if (action === 'suspend') {
        await usersService.suspend(user.id);
        setSuccessMessage(`Le compte ${user.phone} a été suspendu.`);
      } else {
        await usersService.reactivate(user.id);
        setSuccessMessage(`Le compte ${user.phone} a été réactivé.`);
      }
      setPendingStatusAction(null);
      refreshUsers();
    } catch (err) {
      setActionError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  function addIds(raw: string) {
    const ids = raw.split(/[\s,;]+/).map((i) => i.trim()).filter(Boolean);
    if (ids.length === 0) return;
    setStaffIds((current) => Array.from(new Set([...current, ...ids])));
    setIdDraft('');
  }

  function handleIdKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      addIds(idDraft);
    }
  }

  function resetCreateForm() {
    setStaffPhone('+226');
    setStaffRole('ENSEIGNANT');
    setStaffCanPublish(false);
    setStaffIds([]);
    setIdDraft('');
    setFormError('');
    setCreatedStaff(null);
  }

  async function handleCreateStaff(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError('');

    const classSubjectIds = Array.from(
      new Set([
        ...staffIds,
        ...idDraft.split(/[\s,;]+/).map((i) => i.trim()).filter(Boolean),
      ]),
    );

    if (staffRole === 'ENSEIGNANT' && classSubjectIds.length === 0) {
      setFormError(
        'Un enseignant doit être affecté à au moins une classe et une matière.',
      );
      return;
    }

    const payload: CreateStaffDto = {
      phone: staffPhone.trim(),
      role: staffRole,
      canPublish: staffRole === 'ENSEIGNANT' ? staffCanPublish : false,
      ...(staffRole === 'ENSEIGNANT' ? { classSubjectIds } : {}),
    };

    setIsSubmitting(true);
    try {
      const response = await usersService.createStaff(payload);
      setCreatedStaff(response);
      setSuccessMessage(response.message);
      refreshUsers();
    } catch (err) {
      setFormError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="users-page">
      <header className="users-heading">
        <div>
          <h2>Utilisateurs</h2>
          <p>
            Les comptes du personnel sont créés ici. L’inscription publique ne
            crée que des comptes élèves.
          </p>
        </div>
        <button
          type="button"
          className="users-add-button"
          onClick={() => {
            resetCreateForm();
            document.getElementById('staff-phone')?.focus();
          }}
        >
          <Icon name="plus" size={16} />
          Ajouter un membre
        </button>
      </header>

      {successMessage && (
        <div className="users-success" role="status">
          <Icon name="check" size={18} />
          <span>{successMessage}</span>
          <button type="button" onClick={() => setSuccessMessage('')}>
            Fermer
          </button>
        </div>
      )}

      <div className="users-layout">
        <section className="users-card users-list-card">
          <div className="users-tabs-row">
            <div className="users-tabs" role="tablist">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === t.id}
                  className={tab === t.id ? 'is-active' : ''}
                  onClick={() => changeTab(t.id)}
                >
                  {t.label}
                  {tab === t.id && !isLoading && (
                    <em>{tab === 'PERSONNEL' ? rows.length : pagination.total}</em>
                  )}
                </button>
              ))}
            </div>

            <label className="users-search">
              <Icon name="search" size={16} />
              <input
                type="search"
                placeholder="Téléphone ou nom"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </label>
          </div>

          {error && (
            <div className="users-error" role="alert">
              <Icon name="shield" size={18} />
              <span>{error}</span>
              <button type="button" onClick={refreshUsers}>
                Réessayer
              </button>
            </div>
          )}

          <div className="users-table-wrapper">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Rôle</th>
                  <th>Statut</th>
                  <th>Publie seul</th>
                  <th>Dernière activité</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="users-table-message">
                      Chargement des utilisateurs...
                    </td>
                  </tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="users-table-message">
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                ) : (
                  rows.map((user) => {
                    const name =
                      user.studentProfile?.displayName || roleLabels[user.role];
                    return (
                      <tr key={user.id}>
                        <td>
                          <div className="users-identity">
                            <span className="users-avatar">{initials(name)}</span>
                            <div>
                              <strong>{name}</strong>
                              <span>{user.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`users-role role-${user.role.toLowerCase()}`}
                          >
                            {roleLabels[user.role]}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`users-status status-${user.status.toLowerCase()}`}
                          >
                            {statusLabels[user.status]}
                          </span>
                        </td>
                        <td>
                          {user.role === 'ENSEIGNANT' ? (
                            <button
                              type="button"
                              role="switch"
                              aria-checked={user.canPublish}
                              aria-label="Autoriser la publication"
                              className="users-switch"
                              onClick={() => togglePublish(user)}
                            />
                          ) : (
                            <span className="users-muted">—</span>
                          )}
                        </td>
                        <td
                          className={
                            user.lastLoginAt ? 'users-date' : 'users-date is-alert'
                          }
                        >
                          {formatRelative(user.lastLoginAt)}
                        </td>
                        <td>
                          <div className="users-row-actions">
                            <button type="button" onClick={() => openDetails(user)}>
                              Voir
                            </button>
                            <button type="button" onClick={() => openEdit(user)}>
                              Modifier
                            </button>
                            {user.status === 'ACTIF' ? (
                              <button
                                type="button"
                                className="is-danger"
                                onClick={() => {
                                  setActionError('');
                                  setPendingStatusAction({ user, action: 'suspend' });
                                }}
                              >
                                Suspendre
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setActionError('');
                                  setPendingStatusAction({
                                    user,
                                    action: 'reactivate',
                                  });
                                }}
                              >
                                Réactiver
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="users-pagination">
            <span>
              Page {pagination.page} sur {pagination.totalPages || 1}
            </span>
            <div>
              <button
                type="button"
                disabled={isLoading || pagination.page <= 1}
                onClick={() =>
                  setPagination((c) => ({ ...c, page: c.page - 1 }))
                }
              >
                Précédent
              </button>
              <button
                type="button"
                disabled={isLoading || pagination.page >= pagination.totalPages}
                onClick={() =>
                  setPagination((c) => ({ ...c, page: c.page + 1 }))
                }
              >
                Suivant
              </button>
            </div>
          </div>
        </section>

        <aside className="users-card users-form-card">
          {createdStaff ? (
            <div className="users-created">
              <span className="users-created-icon">
                <Icon name="check" size={22} />
              </span>
              <h3>Compte créé</h3>
              <p>{createdStaff.message}</p>
              <div className="users-temporary-password">
                <span>Mot de passe temporaire</span>
                <strong>{createdStaff.temporaryPassword}</strong>
                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(createdStaff.temporaryPassword)
                  }
                >
                  Copier le mot de passe
                </button>
              </div>
              <p className="users-hint">
                Communiquez-le au titulaire : il devra le changer à sa première
                connexion.
              </p>
              <button
                type="button"
                className="users-submit"
                onClick={resetCreateForm}
              >
                Ajouter un autre membre
              </button>
            </div>
          ) : (
            <form onSubmit={handleCreateStaff} className="users-form">
              <div>
                <h3>Nouveau membre</h3>
                <p className="users-hint">
                  Un mot de passe temporaire sera généré à la création.
                </p>
              </div>

              <label className="users-field">
                <span>Téléphone</span>
                <input
                  id="staff-phone"
                  type="tel"
                  value={staffPhone}
                  onChange={(e) => setStaffPhone(e.target.value)}
                  placeholder="+226XXXXXXXX"
                  pattern="^\+226\d{8}$"
                  required
                />
                <small>+226 suivi de 8 chiffres.</small>
              </label>

              <div className="users-field">
                <span>Rôle</span>
                <div className="users-segmented" role="radiogroup">
                  {(['ENSEIGNANT', 'MODERATEUR'] as StaffRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      role="radio"
                      aria-checked={staffRole === r}
                      className={staffRole === r ? 'is-active' : ''}
                      onClick={() => {
                        setStaffRole(r);
                        if (r === 'MODERATEUR') setStaffCanPublish(false);
                      }}
                    >
                      {roleLabels[r]}
                    </button>
                  ))}
                </div>
              </div>

              {staffRole === 'ENSEIGNANT' && (
                <>
                  <div className="users-field">
                    <span>Classes et matières</span>
                    <div className="users-chips">
                      {staffIds.map((id) => (
                        <span key={id} className="users-chip" title={id}>
                          {id.length > 12 ? `${id.slice(0, 8)}…` : id}
                          <button
                            type="button"
                            aria-label={`Retirer ${id}`}
                            onClick={() =>
                              setStaffIds((c) => c.filter((i) => i !== id))
                            }
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <input
                        className="users-chip-input"
                        value={idDraft}
                        onChange={(e) => setIdDraft(e.target.value)}
                        onKeyDown={handleIdKeyDown}
                        onBlur={() => addIds(idDraft)}
                        placeholder="Identifiant ClassSubject"
                      />
                      <button
                        type="button"
                        className="users-chip-add"
                        onClick={() => addIds(idDraft)}
                      >
                        + Ajouter
                      </button>
                    </div>
                  </div>

                  <div className="users-switch-row">
                    <div>
                      <strong>Peut publier seul</strong>
                      <span>Sinon ses contenus restent en brouillon</span>
                    </div>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={staffCanPublish}
                      aria-label="Peut publier seul"
                      className="users-switch"
                      onClick={() => setStaffCanPublish((v) => !v)}
                    />
                  </div>
                </>
              )}

              {staffRole === 'MODERATEUR' && (
                <p className="users-hint">
                  Un modérateur n’a pas d’affectation de classe et ne publie pas
                  seul.
                </p>
              )}

              {formError && (
                <div className="users-error" role="alert">
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                className="users-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Création...' : 'Créer le compte'}
              </button>
            </form>
          )}
        </aside>
      </div>

      {pendingStatusAction && (
        <ConfirmationModal
          title={
            pendingStatusAction.action === 'suspend'
              ? 'Suspendre le compte'
              : 'Réactiver le compte'
          }
          message={`Voulez-vous vraiment ${
            pendingStatusAction.action === 'suspend' ? 'suspendre' : 'réactiver'
          } le compte ${pendingStatusAction.user.phone} ?`}
          confirmLabel={
            pendingStatusAction.action === 'suspend' ? 'Suspendre' : 'Réactiver'
          }
          destructive={pendingStatusAction.action === 'suspend'}
          loading={isSubmitting}
          error={actionError}
          onCancel={() => {
            if (!isSubmitting) {
              setPendingStatusAction(null);
              setActionError('');
            }
          }}
          onConfirm={() => void confirmStatusAction()}
        />
      )}

      {modal && (
        <div className="users-modal-backdrop" onMouseDown={closeModal}>
          <section
            className="users-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="users-modal-title"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="users-modal-header">
              <h3 id="users-modal-title">
                {modal === 'details' ? 'Détails du compte' : 'Modifier le compte'}
              </h3>
              <button
                type="button"
                className="users-modal-close"
                onClick={closeModal}
                aria-label="Fermer"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            {actionError && !pendingStatusAction && (
              <div className="users-error" role="alert">
                <span>{actionError}</span>
              </div>
            )}

            {modal === 'details' && (
              <div className="users-modal-content">
                {!userDetails ? (
                  <p className="users-hint">Chargement des informations...</p>
                ) : (
                  <>
                    <div className="users-detail-grid">
                      <div><span>Téléphone</span><strong>{userDetails.phone}</strong></div>
                      <div><span>Rôle</span><strong>{roleLabels[userDetails.role]}</strong></div>
                      <div><span>Statut</span><strong>{statusLabels[userDetails.status]}</strong></div>
                      <div>
                        <span>Publication</span>
                        <strong>{userDetails.canPublish ? 'Autorisée' : 'Non autorisée'}</strong>
                      </div>
                      <div><span>Téléphone vérifié le</span><strong>{formatDate(userDetails.phoneVerifiedAt)}</strong></div>
                      <div><span>Dernière connexion</span><strong>{formatDate(userDetails.lastLoginAt)}</strong></div>
                      <div><span>Compte créé le</span><strong>{formatDate(userDetails.createdAt)}</strong></div>
                      <div>
                        <span>Mot de passe à changer</span>
                        <strong>{userDetails.mustChangePassword ? 'Oui' : 'Non'}</strong>
                      </div>
                    </div>

                    {userDetails.studentProfile && (
                      <div className="users-detail-block">
                        <h4>Profil élève</h4>
                        <p><strong>Nom :</strong> {userDetails.studentProfile.displayName}</p>
                        <p><strong>Établissement :</strong> {userDetails.studentProfile.schoolName || '—'}</p>
                        <p><strong>Identifiant classe :</strong> {userDetails.studentProfile.classId}</p>
                        <p><strong>Année scolaire :</strong> {userDetails.studentProfile.academicYearId}</p>
                      </div>
                    )}

                    {userDetails.teacherAssignments.length > 0 && (
                      <div className="users-detail-block">
                        <h4>Affectations enseignant</h4>
                        {userDetails.teacherAssignments.map((a) => (
                          <p key={a.id}>{a.classSubjectId}</p>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {modal === 'edit' && selectedUser && (
              <form className="users-modal-content" onSubmit={handleUpdateUser}>
                <label className="users-field">
                  <span>Rôle</span>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as UserRole)}
                  >
                    <option value="ELEVE">Élève</option>
                    <option value="ENSEIGNANT">Enseignant</option>
                    <option value="MODERATEUR">Modérateur</option>
                    <option value="ADMINISTRATEUR">Administrateur</option>
                  </select>
                </label>

                <div className="users-switch-row">
                  <div>
                    <strong>Peut publier seul</strong>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={editCanPublish}
                    aria-label="Peut publier seul"
                    className="users-switch"
                    onClick={() => setEditCanPublish((v) => !v)}
                  />
                </div>

                <p className="users-hint">
                  Le serveur contrôle les changements de rôle sensibles,
                  notamment la protection du dernier administrateur actif.
                </p>

                <div className="users-modal-actions">
                  <button
                    type="button"
                    className="users-button-secondary"
                    onClick={closeModal}
                    disabled={isSubmitting}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="users-submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}