import { useEffect, useState } from 'react';
import axios from 'axios';

import Icon from '../../../components/common/Icon';
import { usersService } from '../../../services/users.service';
import type { FormEvent } from 'react';
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

type ModalType = 'details' | 'edit' | 'create' | null;

function formatDate(value: string | null): string {
  if (!value) return 'Jamais connecté';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
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

  const [search, setSearch] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [status, setStatus] = useState<UserStatus | ''>('');

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const [modal, setModal] = useState<ModalType>(null);
  const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [editRole, setEditRole] = useState<UserRole>('ELEVE');
  const [editCanPublish, setEditCanPublish] = useState(false);

  const [staffPhone, setStaffPhone] = useState('+226');
  const [staffRole, setStaffRole] = useState<StaffRole>('MODERATEUR');
  const [staffCanPublish, setStaffCanPublish] = useState(false);
  const [staffClassSubjectIds, setStaffClassSubjectIds] = useState('');
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
          role: role || undefined,
          status: status || undefined,
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
  }, [search, role, status, pagination.page, reloadKey]);

  function refreshUsers() {
    setReloadKey((current) => current + 1);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPagination((current) => ({ ...current, page: 1 }));
  }

  function handleRoleChange(value: string) {
    setRole(value as UserRole | '');
    setPagination((current) => ({ ...current, page: 1 }));
  }

  function handleStatusChange(value: string) {
    setStatus(value as UserStatus | '');
    setPagination((current) => ({ ...current, page: 1 }));
  }

  function handlePageChange(nextPage: number) {
    setPagination((current) => ({ ...current, page: nextPage }));
  }

  function resetFilters() {
    setSearch('');
    setRole('');
    setStatus('');
    setPagination((current) => ({ ...current, page: 1 }));
  }

  function closeModal() {
    if (isSubmitting) return;

    setModal(null);
    setSelectedUser(null);
    setUserDetails(null);
    setActionError('');
    setSuccessMessage('');
    setCreatedStaff(null);
  }

  async function openDetails(user: UserListItem) {
    setSelectedUser(user);
    setUserDetails(null);
    setActionError('');
    setModal('details');

    try {
      const details = await usersService.findOne(user.id);
      setUserDetails(details);
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

  function openCreate() {
    setStaffPhone('+226');
    setStaffRole('MODERATEUR');
    setStaffCanPublish(false);
    setStaffClassSubjectIds('');
    setCreatedStaff(null);
    setActionError('');
    setModal('create');
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

  async function handleSuspend(user: UserListItem) {
    const confirmed = window.confirm(
      `Voulez-vous vraiment suspendre le compte ${user.phone} ?`,
    );

    if (!confirmed) return;

    setActionError('');

    try {
      await usersService.suspend(user.id);
      setSuccessMessage(`Le compte ${user.phone} a été suspendu.`);
      refreshUsers();
    } catch (err) {
      setActionError(getErrorMessage(err));
      window.alert(getErrorMessage(err));
    }
  }

  async function handleReactivate(user: UserListItem) {
    const confirmed = window.confirm(
      `Voulez-vous vraiment réactiver le compte ${user.phone} ?`,
    );

    if (!confirmed) return;

    setActionError('');

    try {
      await usersService.reactivate(user.id);
      setSuccessMessage(`Le compte ${user.phone} a été réactivé.`);
      refreshUsers();
    } catch (err) {
      setActionError(getErrorMessage(err));
      window.alert(getErrorMessage(err));
    }
  }

  async function handleCreateStaff(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setActionError('');

    const classSubjectIds = staffClassSubjectIds
      .split(/[\s,;]+/)
      .map((id) => id.trim())
      .filter(Boolean);

    if (staffRole === 'ENSEIGNANT' && classSubjectIds.length === 0) {
      setActionError(
        'Un enseignant doit être affecté à au moins une classe et une matière. Saisissez les identifiants ClassSubject existants.',
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
      setActionError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  const hasFilters = Boolean(search || role || status);

  return (
    <div className="users-page">
      <section className="users-heading">
        <div>
          <span className="users-eyebrow">ADMINISTRATION</span>
          <h2>Gestion des utilisateurs</h2>
          <p>
            Consultez et gérez les comptes des élèves, enseignants et membres
            du personnel.
          </p>
        </div>

        <div className="users-heading-icon">
          <Icon name="users" size={30} />
        </div>
      </section>

      {successMessage && (
        <div className="users-success" role="status">
          <Icon name="check" size={19} />
          <span>{successMessage}</span>
          <button type="button" onClick={() => setSuccessMessage('')}>
            Fermer
          </button>
        </div>
      )}

      <section className="users-section">
        <div className="users-section-heading">
          <div>
            <h3>Liste des utilisateurs</h3>
            <p>{pagination.total} utilisateur(s) enregistré(s)</p>
          </div>

          <button
            type="button"
            className="users-create-button"
            onClick={openCreate}
          >
            <Icon name="plus" size={17} />
            Créer un membre du personnel
          </button>
        </div>

        <div className="users-toolbar">
          <div className="users-search">
            <Icon name="search" size={19} />
            <input
              type="search"
              placeholder="Rechercher par téléphone ou nom..."
              value={search}
              onChange={(event) => handleSearchChange(event.target.value)}
            />
          </div>

          <select
            className="users-filter"
            value={role}
            onChange={(event) => handleRoleChange(event.target.value)}
            aria-label="Filtrer par rôle"
          >
            <option value="">Tous les rôles</option>
            <option value="ELEVE">Élèves</option>
            <option value="ENSEIGNANT">Enseignants</option>
            <option value="MODERATEUR">Modérateurs</option>
            <option value="ADMINISTRATEUR">Administrateurs</option>
          </select>

          <select
            className="users-filter"
            value={status}
            onChange={(event) => handleStatusChange(event.target.value)}
            aria-label="Filtrer par statut"
          >
            <option value="">Tous les statuts</option>
            <option value="ACTIF">Actifs</option>
            <option value="SUSPENDU">Suspendus</option>
          </select>

          {hasFilters && (
            <button
              type="button"
              className="users-reset"
              onClick={resetFilters}
            >
              Réinitialiser
            </button>
          )}
        </div>

        {error && (
          <div className="users-error" role="alert">
            <Icon name="shield" size={20} />
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
                <th>Utilisateur</th>
                <th>Téléphone</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Publication</th>
                <th>Dernière connexion</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="users-table-message">
                    Chargement des utilisateurs...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="users-table-message">
                    Les utilisateurs n'ont pas pu être chargés.
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="users-table-message">
                    Aucun utilisateur trouvé.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="users-identity">
                        <div className="users-avatar">
                          <Icon name="user" size={19} />
                        </div>

                        <div className="users-identity-info">
                          <strong>
                            {user.studentProfile?.displayName ||
                              roleLabels[user.role]}
                          </strong>
                          <span>
                            {user.studentProfile?.schoolName || 'Compte G-EDUC'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="users-phone">{user.phone}</td>

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
                        <span />
                        {statusLabels[user.status]}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`users-permission ${
                          user.canPublish ? 'permission-yes' : 'permission-no'
                        }`}
                      >
                        {user.canPublish ? 'Autorisée' : 'Non autorisée'}
                      </span>
                    </td>

                    <td className="users-date">
                      {formatDate(user.lastLoginAt)}
                    </td>

                    <td>
                      <div className="users-row-actions">
                        <button
                          type="button"
                          title="Voir les détails"
                          onClick={() => openDetails(user)}
                        >
                          Voir
                        </button>

                        <button
                          type="button"
                          title="Modifier l'utilisateur"
                          onClick={() => openEdit(user)}
                        >
                          Modifier
                        </button>

                        {user.status === 'ACTIF' ? (
                          <button
                            type="button"
                            className="users-action-danger"
                            onClick={() => handleSuspend(user)}
                          >
                            Suspendre
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="users-action-success"
                            onClick={() => handleReactivate(user)}
                          >
                            Réactiver
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="users-pagination">
          <span>
            Page {pagination.page} sur {pagination.totalPages || 1}
          </span>

          <div className="users-pagination-actions">
            <button
              type="button"
              disabled={isLoading || pagination.page <= 1}
              onClick={() => handlePageChange(pagination.page - 1)}
            >
              Précédent
            </button>

            <button
              type="button"
              disabled={
                isLoading ||
                pagination.page >= pagination.totalPages
              }
              onClick={() => handlePageChange(pagination.page + 1)}
            >
              Suivant
            </button>
          </div>
        </div>
      </section>

      {modal && (
        <div className="users-modal-backdrop" onMouseDown={closeModal}>
          <section
            className="users-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="users-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="users-modal-header">
              <div>
                <span className="users-eyebrow">G-EDUC / UTILISATEURS</span>
                <h3 id="users-modal-title">
                  {modal === 'details'
                    ? 'Détails du compte'
                    : modal === 'edit'
                      ? 'Modifier le compte'
                      : 'Créer un membre du personnel'}
                </h3>
              </div>

              <button
                type="button"
                className="users-modal-close"
                onClick={closeModal}
                aria-label="Fermer"
              >
                <Icon name="close" size={20} />
              </button>
            </div>

            {actionError && (
              <div className="users-error" role="alert">
                <Icon name="shield" size={19} />
                <span>{actionError}</span>
              </div>
            )}

            {modal === 'details' && (
              <div className="users-modal-content">
                {!userDetails ? (
                  <p className="users-modal-loading">
                    Chargement des informations...
                  </p>
                ) : (
                  <>
                    <div className="users-detail-grid">
                      <div>
                        <span>Téléphone</span>
                        <strong>{userDetails.phone}</strong>
                      </div>
                      <div>
                        <span>Rôle</span>
                        <strong>{roleLabels[userDetails.role]}</strong>
                      </div>
                      <div>
                        <span>Statut</span>
                        <strong>{statusLabels[userDetails.status]}</strong>
                      </div>
                      <div>
                        <span>Publication</span>
                        <strong>
                          {userDetails.canPublish ? 'Autorisée' : 'Non autorisée'}
                        </strong>
                      </div>
                      <div>
                        <span>Téléphone vérifié le</span>
                        <strong>{formatDate(userDetails.phoneVerifiedAt)}</strong>
                      </div>
                      <div>
                        <span>Dernière connexion</span>
                        <strong>{formatDate(userDetails.lastLoginAt)}</strong>
                      </div>
                      <div>
                        <span>Compte créé le</span>
                        <strong>{formatDate(userDetails.createdAt)}</strong>
                      </div>
                      <div>
                        <span>Mot de passe à changer</span>
                        <strong>
                          {userDetails.mustChangePassword ? 'Oui' : 'Non'}
                        </strong>
                      </div>
                    </div>

                    {userDetails.studentProfile && (
                      <div className="users-detail-block">
                        <h4>Profil élève</h4>
                        <p>
                          <strong>Nom :</strong>{' '}
                          {userDetails.studentProfile.displayName}
                        </p>
                        <p>
                          <strong>Établissement :</strong>{' '}
                          {userDetails.studentProfile.schoolName || '—'}
                        </p>
                        <p>
                          <strong>Identifiant classe :</strong>{' '}
                          {userDetails.studentProfile.classId}
                        </p>
                        <p>
                          <strong>Année scolaire :</strong>{' '}
                          {userDetails.studentProfile.academicYearId}
                        </p>
                      </div>
                    )}

                    {userDetails.teacherAssignments.length > 0 && (
                      <div className="users-detail-block">
                        <h4>Affectations enseignant</h4>
                        {userDetails.teacherAssignments.map((assignment) => (
                          <p key={assignment.id}>
                            {assignment.classSubjectId}
                          </p>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {modal === 'edit' && selectedUser && (
              <form className="users-modal-content" onSubmit={handleUpdateUser}>
                <label className="users-form-field">
                  <span>Rôle</span>
                  <select
                    value={editRole}
                    onChange={(event) =>
                      setEditRole(event.target.value as UserRole)
                    }
                  >
                    <option value="ELEVE">Élève</option>
                    <option value="ENSEIGNANT">Enseignant</option>
                    <option value="MODERATEUR">Modérateur</option>
                    <option value="ADMINISTRATEUR">Administrateur</option>
                  </select>
                </label>

                <label className="users-checkbox-field">
                  <input
                    type="checkbox"
                    checked={editCanPublish}
                    onChange={(event) =>
                      setEditCanPublish(event.target.checked)
                    }
                  />
                  <span>Autoriser la publication</span>
                </label>

                <p className="users-form-note">
                  Le backend contrôle les changements de rôle sensibles,
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
                  <button
                    type="submit"
                    className="users-button-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer'}
                  </button>
                </div>
              </form>
            )}

            {modal === 'create' && (
              <form className="users-modal-content" onSubmit={handleCreateStaff}>
                {createdStaff ? (
                  <div className="users-created-result">
                    <div className="users-created-icon">
                      <Icon name="check" size={25} />
                    </div>

                    <h4>Personnel créé avec succès</h4>
                    <p>{createdStaff.message}</p>

                    <div className="users-temporary-password">
                      <span>Mot de passe temporaire</span>
                      <strong>{createdStaff.temporaryPassword}</strong>
                      <button
                        type="button"
                        onClick={() =>
                          navigator.clipboard.writeText(
                            createdStaff.temporaryPassword,
                          )
                        }
                      >
                        Copier le mot de passe
                      </button>
                    </div>

                    <p className="users-form-note">
                      Communiquez ce mot de passe au titulaire du compte.
                      Il devra le changer à sa première connexion.
                    </p>

                    <div className="users-modal-actions">
                      <button
                        type="button"
                        className="users-button-primary"
                        onClick={closeModal}
                      >
                        Terminer
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <label className="users-form-field">
                      <span>Numéro de téléphone</span>
                      <input
                        type="tel"
                        value={staffPhone}
                        onChange={(event) => setStaffPhone(event.target.value)}
                        placeholder="+226XXXXXXXX"
                        pattern="^\+226\d{8}$"
                        required
                      />
                      <small>Format attendu : +226 suivi de 8 chiffres.</small>
                    </label>

                    <label className="users-form-field">
                      <span>Rôle du personnel</span>
                      <select
                        value={staffRole}
                        onChange={(event) => {
                          const nextRole = event.target.value as StaffRole;
                          setStaffRole(nextRole);
                          if (nextRole === 'MODERATEUR') {
                            setStaffCanPublish(false);
                          }
                        }}
                      >
                        <option value="MODERATEUR">Modérateur</option>
                        <option value="ENSEIGNANT">Enseignant</option>
                      </select>
                    </label>

                    {staffRole === 'ENSEIGNANT' && (
                      <>
                        <label className="users-form-field">
                          <span>Identifiants des affectations (ClassSubject)</span>
                          <textarea
                            rows={4}
                            value={staffClassSubjectIds}
                            onChange={(event) =>
                              setStaffClassSubjectIds(event.target.value)
                            }
                            placeholder="Collez ici les UUID des affectations existantes, séparés par des virgules ou des retours à la ligne."
                            required
                          />
                          <small>
                            Chaque identifiant doit correspondre à une
                            affectation classe-matière déjà créée.
                          </small>
                        </label>

                        <label className="users-checkbox-field">
                          <input
                            type="checkbox"
                            checked={staffCanPublish}
                            onChange={(event) =>
                              setStaffCanPublish(event.target.checked)
                            }
                          />
                          <span>Autoriser la publication</span>
                        </label>
                      </>
                    )}

                    {staffRole === 'MODERATEUR' && (
                      <p className="users-form-note">
                        Un modérateur ne nécessite aucune affectation de
                        classe-matière. La permission de publication sera
                        désactivée conformément au backend.
                      </p>
                    )}

                    <div className="users-modal-actions">
                      <button
                        type="button"
                        className="users-button-secondary"
                        onClick={closeModal}
                        disabled={isSubmitting}
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="users-button-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Création...' : 'Créer le compte'}
                      </button>
                    </div>
                  </>
                )}
              </form>
            )}
          </section>
        </div>
      )}
    </div>
  );
}