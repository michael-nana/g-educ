export const Role = {
  ELEVE: 'ELEVE',
  ENSEIGNANT: 'ENSEIGNANT',
  MODERATEUR: 'MODERATEUR',
  ADMINISTRATEUR: 'ADMINISTRATEUR',
} as const;

export const UserStatus = {
  ACTIF: 'ACTIF',
  SUSPENDU: 'SUSPENDU',
} as const;

export const ClassLevel = {
  SIXIEME: 'SIXIEME',
  CINQUIEME: 'CINQUIEME',
  QUATRIEME: 'QUATRIEME',
  TROISIEME: 'TROISIEME',
  SECONDE: 'SECONDE',
  PREMIERE: 'PREMIERE',
  TERMINALE: 'TERMINALE',
} as const;

export const ClassSeries = {
  A: 'A',
  C: 'C',
  D: 'D',
} as const;

export const SchoolCycle = {
  COLLEGE: 'COLLEGE',
  LYCEE: 'LYCEE',
} as const;

export const ContentStatus = {
  BROUILLON: 'BROUILLON',
  PUBLIE: 'PUBLIE',
  ARCHIVE: 'ARCHIVE',
} as const;

export const ActivityType = {
  LECON_TERMINEE: 'LECON_TERMINEE',
  EXERCICE_TERMINE: 'EXERCICE_TERMINE',
  QUIZ_TERMINE: 'QUIZ_TERMINE',
  CONTRIBUTION_PUBLIEE: 'CONTRIBUTION_PUBLIEE',
  FORUM_REPONSE: 'FORUM_REPONSE',
} as const;
