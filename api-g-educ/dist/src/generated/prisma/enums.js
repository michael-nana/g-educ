"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpPurpose = exports.RequestStatus = exports.SanctionType = exports.ReportStatus = exports.ReportReason = exports.ForumStatus = exports.ContributionStatus = exports.ActivityRefType = exports.ActivityType = exports.DevicePlatform = exports.NotificationType = exports.ReminderStatus = exports.EventType = exports.Recurrence = exports.AttemptStatus = exports.QuestionType = exports.AssessmentKind = exports.AssetProcessingStatus = exports.VideoQuality = exports.AssetKind = exports.LessonType = exports.ContentStatus = exports.ClassSeries = exports.ClassLevel = exports.SchoolCycle = exports.UserStatus = exports.Role = void 0;
exports.Role = {
    ELEVE: 'ELEVE',
    ENSEIGNANT: 'ENSEIGNANT',
    MODERATEUR: 'MODERATEUR',
    ADMINISTRATEUR: 'ADMINISTRATEUR'
};
exports.UserStatus = {
    ACTIF: 'ACTIF',
    SUSPENDU: 'SUSPENDU'
};
exports.SchoolCycle = {
    COLLEGE: 'COLLEGE',
    LYCEE: 'LYCEE'
};
exports.ClassLevel = {
    SIXIEME: 'SIXIEME',
    CINQUIEME: 'CINQUIEME',
    QUATRIEME: 'QUATRIEME',
    TROISIEME: 'TROISIEME',
    SECONDE: 'SECONDE',
    PREMIERE: 'PREMIERE',
    TERMINALE: 'TERMINALE'
};
exports.ClassSeries = {
    A: 'A',
    C: 'C',
    D: 'D'
};
exports.ContentStatus = {
    BROUILLON: 'BROUILLON',
    PUBLIE: 'PUBLIE',
    ARCHIVE: 'ARCHIVE'
};
exports.LessonType = {
    TEXTE: 'TEXTE',
    PDF: 'PDF',
    VIDEO: 'VIDEO'
};
exports.AssetKind = {
    VIDEO: 'VIDEO',
    PDF: 'PDF',
    IMAGE: 'IMAGE',
    THUMBNAIL: 'THUMBNAIL'
};
exports.VideoQuality = {
    Q240: 'Q240',
    Q360: 'Q360',
    Q480: 'Q480'
};
exports.AssetProcessingStatus = {
    EN_ATTENTE: 'EN_ATTENTE',
    EN_COURS: 'EN_COURS',
    PRET: 'PRET',
    ECHEC: 'ECHEC'
};
exports.AssessmentKind = {
    EXERCICE: 'EXERCICE',
    QUIZ: 'QUIZ'
};
exports.QuestionType = {
    QCM_UNIQUE: 'QCM_UNIQUE',
    QCM_MULTIPLE: 'QCM_MULTIPLE',
    VRAI_FAUX: 'VRAI_FAUX'
};
exports.AttemptStatus = {
    EN_COURS: 'EN_COURS',
    TERMINEE: 'TERMINEE'
};
exports.Recurrence = {
    AUCUNE: 'AUCUNE',
    QUOTIDIENNE: 'QUOTIDIENNE',
    HEBDOMADAIRE: 'HEBDOMADAIRE'
};
exports.EventType = {
    EXAMEN: 'EXAMEN',
    DEVOIR: 'DEVOIR',
    AUTRE: 'AUTRE'
};
exports.ReminderStatus = {
    PLANIFIE: 'PLANIFIE',
    ENVOYE: 'ENVOYE',
    ECHEC: 'ECHEC',
    ANNULE: 'ANNULE'
};
exports.NotificationType = {
    EVENEMENT_ANNONCE: 'EVENEMENT_ANNONCE',
    EVENEMENT_RAPPEL: 'EVENEMENT_RAPPEL',
    FLAMME_RAPPEL: 'FLAMME_RAPPEL',
    CONTRIBUTION_DECISION: 'CONTRIBUTION_DECISION',
    FORUM_REPONSE: 'FORUM_REPONSE',
    SANCTION: 'SANCTION',
    SYSTEME: 'SYSTEME'
};
exports.DevicePlatform = {
    ANDROID: 'ANDROID',
    IOS: 'IOS'
};
exports.ActivityType = {
    LECON_TERMINEE: 'LECON_TERMINEE',
    EXERCICE_TERMINE: 'EXERCICE_TERMINE',
    QUIZ_TERMINE: 'QUIZ_TERMINE',
    CONTRIBUTION_PUBLIEE: 'CONTRIBUTION_PUBLIEE',
    FORUM_REPONSE: 'FORUM_REPONSE'
};
exports.ActivityRefType = {
    LESSON: 'LESSON',
    ASSESSMENT: 'ASSESSMENT',
    CONTRIBUTION: 'CONTRIBUTION',
    FORUM_ANSWER: 'FORUM_ANSWER'
};
exports.ContributionStatus = {
    EN_ATTENTE: 'EN_ATTENTE',
    PUBLIEE: 'PUBLIEE',
    REFUSEE: 'REFUSEE'
};
exports.ForumStatus = {
    VISIBLE: 'VISIBLE',
    MASQUE: 'MASQUE'
};
exports.ReportReason = {
    INAPPROPRIE: 'INAPPROPRIE',
    HARCELEMENT: 'HARCELEMENT',
    SPAM: 'SPAM',
    HORS_SUJET: 'HORS_SUJET',
    ERREUR_CONTENU: 'ERREUR_CONTENU',
    AUTRE: 'AUTRE'
};
exports.ReportStatus = {
    OUVERT: 'OUVERT',
    TRAITE: 'TRAITE',
    REJETE: 'REJETE'
};
exports.SanctionType = {
    AVERTISSEMENT: 'AVERTISSEMENT',
    SUSPENSION: 'SUSPENSION'
};
exports.RequestStatus = {
    EN_ATTENTE: 'EN_ATTENTE',
    APPROUVEE: 'APPROUVEE',
    REFUSEE: 'REFUSEE'
};
exports.OtpPurpose = {
    INSCRIPTION: 'INSCRIPTION',
    REINITIALISATION: 'REINITIALISATION'
};
//# sourceMappingURL=enums.js.map