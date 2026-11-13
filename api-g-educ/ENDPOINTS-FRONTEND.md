# Endpoints backend à intégrer au frontend G-EDUC

Ce document inventorie les routes déclarées dans les contrôleurs du backend au 11 novembre 2026. Il les organise selon les pages et parcours du frontend.

## Conventions

- Préfixe de toutes les routes : `/api/v1`.
- Sauf indication contraire, les routes nécessitent un jeton `Bearer`.
- `ELEVE`, `ENSEIGNANT` et `ADMINISTRATEUR` désignent les rôles autorisés par les contrôleurs.
- Les noms de paramètres entre accolades, par exemple `:id`, sont à remplacer par leur valeur.
- Cette liste reflète les routes présentes dans le code ; elle ne garantit pas à elle seule que tous les parcours ou fonctionnalités métier sont complets.

## Application élève

### Inscription et connexion — Auth

| Page / action | Méthode et endpoint | Accès |
|---|---|---|
| Choisir une classe pour l’inscription | `GET /classes` | Public |
| Demander un code OTP d’inscription | `POST /auth/registration/otp` | Public |
| Vérifier le code d’inscription | `POST /auth/registration/verify` | Public |
| Créer le compte élève | `POST /auth/register` | Public |
| Se connecter | `POST /auth/login` | Public |
| Renouveler les jetons de session | `POST /auth/refresh` | Public |
| Se déconnecter | `POST /auth/logout` | Public |
| Demander un code de réinitialisation | `POST /auth/forgot-password` | Public |
| Réinitialiser le mot de passe | `POST /auth/reset-password` | Public |
| Changer le mot de passe connecté | `PATCH /auth/change-password` | Authentifié |

### Accueil, profil et matières

| Page / action | Méthode et endpoint | Accès |
|---|---|---|
| Charger le profil et les informations du compte | `GET /me` | Authentifié |
| Modifier le profil élève | `PATCH /me/profile` | `ELEVE` |
| Voir les matières de sa classe | `GET /me/subjects` | `ELEVE` |
| Voir les chapitres de sa classe | `GET /me/chapters` | `ELEVE` — filtre facultatif `classSubjectId` |
| Demander un changement de classe | `POST /me/class-change-requests` | `ELEVE` |
| Anonymiser / supprimer son compte | `DELETE /me` | Authentifié |

### Cours et leçons

| Page / action | Méthode et endpoint | Accès |
|---|---|---|
| Lister les leçons | `GET /lessons` | `ELEVE`, `ENSEIGNANT`, `ADMINISTRATEUR` — filtres `chapterId`, `classSubjectId`, `type`, `favorite` |
| Consulter une leçon | `GET /lessons/:id` | `ELEVE`, `ENSEIGNANT`, `ADMINISTRATEUR` |
| Ajouter une leçon aux favoris | `PUT /lessons/:id/favorite` | `ELEVE` |
| Retirer une leçon des favoris | `DELETE /lessons/:id/favorite` | `ELEVE` |
| Enregistrer la progression / position de lecture | `PUT /lessons/:id/progress` | `ELEVE` |
| Reprendre les leçons commencées | `GET /me/progress/lessons` | `ELEVE` |

**Limite actuelle :** la route d’ajout de fichier du module Courses est destinée aux PDF ; l’ajout de vidéos n’est pas encore pris en charge.

### Exercices, quiz et tentatives — Assessments

| Page / action | Méthode et endpoint | Accès |
|---|---|---|
| Lister les évaluations publiées | `GET /assessments` | `ELEVE` — filtre facultatif `chapterId` |
| Consulter une évaluation avant de la faire | `GET /assessments/:id` | `ELEVE` |
| Soumettre les réponses d’une tentative et obtenir le résultat | `POST /assessments/:id/attempts` | `ELEVE` |
| Voir l’historique de ses tentatives | `GET /me/attempts` | `ELEVE` — filtre facultatif `assessmentId` |
| Consulter une tentative et sa correction | `GET /me/attempts/:id` | `ELEVE` |

Il n’existe pas de route distincte de démarrage de tentative dans le contrôleur actuel.

### Flamme et activité

| Page / action | Méthode et endpoint | Accès |
|---|---|---|
| Consulter sa flamme | `GET /me/streak` | `ELEVE` |
| Consulter son calendrier d’activité | `GET /me/activity` | `ELEVE` — filtres `from`, `to` |
| Enregistrer une activité | `POST /activities` | `ELEVE` |

**Intégration :** les actions de progression d’une leçon et de soumission d’une tentative peuvent déjà enregistrer l’activité correspondante côté serveur. Éviter d’envoyer également une activité séparée pour la même action, afin de ne pas créer de doublon.

### Planning de révision

| Page / action | Méthode et endpoint | Accès |
|---|---|---|
| Lister les séances | `GET /study-sessions` | `ELEVE` — filtres `from`, `to`, `updatedSince` |
| Créer une séance | `POST /study-sessions` | `ELEVE` |
| Modifier ou terminer une séance | `PATCH /study-sessions/:id` | `ELEVE` |
| Supprimer logiquement une séance | `DELETE /study-sessions/:id` | `ELEVE` |

### Calendrier scolaire

| Page / action | Méthode et endpoint | Accès |
|---|---|---|
| Lister les événements scolaires | `GET /events` | `ELEVE`, `ENSEIGNANT`, `ADMINISTRATEUR` — filtres `from`, `to`, `type`, `subjectId` |

### Notifications et préférences

| Page / action | Méthode et endpoint | Accès |
|---|---|---|
| Consulter ses notifications | `GET /me/notifications` | Authentifié |
| Marquer une notification comme lue | `POST /me/notifications/:id/read` | Authentifié |
| Tout marquer comme lu | `POST /me/notifications/read-all` | Authentifié |
| Consulter ses préférences | `GET /me/notification-preferences` | Authentifié |
| Modifier ses préférences | `PUT /me/notification-preferences` | Authentifié |
| Enregistrer l’appareil pour les notifications push | `POST /me/devices` | Authentifié |
| Retirer l’appareil enregistré | `DELETE /me/devices/:token` | Authentifié |

## Back-office enseignant et administration

### Gestion des chapitres

| Page / action | Méthode et endpoint | Accès |
|---|---|---|
| Créer un chapitre | `POST /class-subjects/:classSubjectId/chapters` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Modifier un chapitre | `PATCH /chapters/:id` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Publier un chapitre | `POST /chapters/:id/publish` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Archiver un chapitre | `POST /chapters/:id/archive` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Réordonner les chapitres | `PUT /class-subjects/:classSubjectId/chapters/order` | `ADMINISTRATEUR`, `ENSEIGNANT` |

**Limite actuelle :** `GET /me/chapters` est réservé aux élèves ; aucune route dédiée au personnel pour lister ses chapitres n’apparaît dans les contrôleurs examinés.

### Gestion des cours

| Page / action | Méthode et endpoint | Accès |
|---|---|---|
| Créer une leçon | `POST /chapters/:chapterId/lessons` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Modifier une leçon | `PATCH /lessons/:id` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Ajouter un fichier à une leçon | `POST /lessons/:id/assets` | `ADMINISTRATEUR`, `ENSEIGNANT` — multipart |
| Retirer un fichier | `DELETE /lessons/:id/assets/:assetId` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Publier une leçon | `POST /lessons/:id/publish` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Archiver une leçon | `POST /lessons/:id/archive` | `ADMINISTRATEUR`, `ENSEIGNANT` |

La route de fichier est actuellement dédiée à l’upload PDF ; l’upload et le traitement vidéo restent à développer.

### Gestion des exercices et quiz

| Page / action | Méthode et endpoint | Accès |
|---|---|---|
| Créer un exercice avec ses questions | `POST /chapters/:chapterId/exercises` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Créer un quiz avec ses questions | `POST /chapters/:chapterId/quizzes` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Modifier une évaluation | `PATCH /assessments/:id` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Publier une évaluation | `POST /assessments/:id/publish` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Archiver une évaluation | `POST /assessments/:id/archive` | `ADMINISTRATEUR`, `ENSEIGNANT` |

**Limite actuelle :** les routes `GET /assessments` et `GET /assessments/:id` sont réservées aux élèves. Aucune route GET de liste des évaluations ou brouillons pour le personnel n’apparaît dans le contrôleur.

### Gestion des événements

| Page / action | Méthode et endpoint | Accès |
|---|---|---|
| Lister les événements | `GET /events` | `ELEVE`, `ENSEIGNANT`, `ADMINISTRATEUR` |
| Créer un événement | `POST /events` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Modifier un événement | `PATCH /events/:id` | `ADMINISTRATEUR`, `ENSEIGNANT` |
| Archiver un événement | `DELETE /events/:id` | `ADMINISTRATEUR`, `ENSEIGNANT` |

### Administration des comptes et des données scolaires

| Page / action | Méthode et endpoint | Accès |
|---|---|---|
| Lister les utilisateurs | `GET /users` | `ADMINISTRATEUR` |
| Consulter un utilisateur | `GET /users/:id` | `ADMINISTRATEUR` |
| Créer un compte du personnel | `POST /users/staff` | `ADMINISTRATEUR` |
| Modifier un utilisateur / ses permissions | `PATCH /users/:id` | `ADMINISTRATEUR` |
| Suspendre un utilisateur | `POST /users/:id/suspend` | `ADMINISTRATEUR` |
| Réactiver un utilisateur | `POST /users/:id/reactivate` | `ADMINISTRATEUR` |
| Lister les demandes de changement de classe | `GET /class-change-requests` | `ADMINISTRATEUR` |
| Approuver une demande | `POST /class-change-requests/:id/approve` | `ADMINISTRATEUR` |
| Refuser une demande | `POST /class-change-requests/:id/reject` | `ADMINISTRATEUR` |
| Consulter les statistiques du tableau de bord | `GET /admin/dashboard?period=14` | `ADMINISTRATEUR` — `period` accepte `14`, `30` ou `365` jours |
| Lister les classes | `GET /classes` | Public |
| Consulter l’année scolaire courante | `GET /academic-years/current` | Authentifié |
| Lister les années scolaires | `GET /academic-years` | `ADMINISTRATEUR` |
| Créer une année scolaire | `POST /academic-years` | `ADMINISTRATEUR` |
| Créer une matière | `POST /subjects` | `ADMINISTRATEUR` |
| Modifier une matière | `PATCH /subjects/:id` | `ADMINISTRATEUR` |
| Associer une matière à une classe | `POST /classes/:classId/subjects` | `ADMINISTRATEUR` |
| Lister les matières d’une classe | `GET /classes/:classId/subjects` | `ADMINISTRATEUR` |
| Lister toutes les affectations classe-matière | `GET /class-subjects` | `ADMINISTRATEUR` |
| Consulter le journal d’audit | `GET /audit` | `ADMINISTRATEUR` |
| Envoyer une annonce | `POST /notifications/announcements` | `ADMINISTRATEUR` |

`GET /admin/dashboard` renvoie les effectifs actifs, les activités du jour, les activités quotidiennes et les cinq classes les plus actives, les éléments en attente (contributions, signalements et changements de classe) et les trois prochains événements publiés. La période du graphique accepte `14`, `30` ou `365` jours, aujourd’hui inclus. Un élève est compté comme actif pour une journée s’il a au moins une activité enregistrée ce jour-là ; les dates sont calculées en UTC. Les flammes actives représentent la somme des jours de série en cours pour les élèves actifs dont la dernière activité date d’aujourd’hui ou d’hier.

## Fonctionnalités sans endpoints actuellement observés

Les contrôleurs inspectés ne présentent pas encore de routes pour :

- le tableau de bord global de progression (`Progress`) : par exemple `GET /me/progress` et `GET /me/progress/subjects/:classSubjectId` ;
- la synchronisation hors-ligne (`Sync`) ;
- la liste et la modération des contributions des élèves (le tableau de bord expose uniquement leur nombre en attente) ;
- le forum ;
- la liste et le traitement des signalements (le tableau de bord expose uniquement leur nombre ouvert).

## Documentation interactive

L’application expose Swagger sous `/api/docs` lorsque le backend est lancé. Utiliser cette documentation pour vérifier les DTO, les corps de requête et les réponses réels lors de l’intégration.
