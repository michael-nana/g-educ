export declare const Role: {
    readonly ELEVE: "ELEVE";
    readonly ENSEIGNANT: "ENSEIGNANT";
    readonly MODERATEUR: "MODERATEUR";
    readonly ADMINISTRATEUR: "ADMINISTRATEUR";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const UserStatus: {
    readonly ACTIF: "ACTIF";
    readonly SUSPENDU: "SUSPENDU";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const SchoolCycle: {
    readonly COLLEGE: "COLLEGE";
    readonly LYCEE: "LYCEE";
};
export type SchoolCycle = (typeof SchoolCycle)[keyof typeof SchoolCycle];
export declare const ClassLevel: {
    readonly SIXIEME: "SIXIEME";
    readonly CINQUIEME: "CINQUIEME";
    readonly QUATRIEME: "QUATRIEME";
    readonly TROISIEME: "TROISIEME";
    readonly SECONDE: "SECONDE";
    readonly PREMIERE: "PREMIERE";
    readonly TERMINALE: "TERMINALE";
};
export type ClassLevel = (typeof ClassLevel)[keyof typeof ClassLevel];
export declare const ClassSeries: {
    readonly A: "A";
    readonly C: "C";
    readonly D: "D";
};
export type ClassSeries = (typeof ClassSeries)[keyof typeof ClassSeries];
export declare const ContentStatus: {
    readonly BROUILLON: "BROUILLON";
    readonly PUBLIE: "PUBLIE";
    readonly ARCHIVE: "ARCHIVE";
};
export type ContentStatus = (typeof ContentStatus)[keyof typeof ContentStatus];
export declare const LessonType: {
    readonly TEXTE: "TEXTE";
    readonly PDF: "PDF";
    readonly VIDEO: "VIDEO";
};
export type LessonType = (typeof LessonType)[keyof typeof LessonType];
export declare const AssetKind: {
    readonly VIDEO: "VIDEO";
    readonly PDF: "PDF";
    readonly IMAGE: "IMAGE";
    readonly THUMBNAIL: "THUMBNAIL";
};
export type AssetKind = (typeof AssetKind)[keyof typeof AssetKind];
export declare const VideoQuality: {
    readonly Q240: "Q240";
    readonly Q360: "Q360";
    readonly Q480: "Q480";
};
export type VideoQuality = (typeof VideoQuality)[keyof typeof VideoQuality];
export declare const AssetProcessingStatus: {
    readonly EN_ATTENTE: "EN_ATTENTE";
    readonly EN_COURS: "EN_COURS";
    readonly PRET: "PRET";
    readonly ECHEC: "ECHEC";
};
export type AssetProcessingStatus = (typeof AssetProcessingStatus)[keyof typeof AssetProcessingStatus];
export declare const AssessmentKind: {
    readonly EXERCICE: "EXERCICE";
    readonly QUIZ: "QUIZ";
};
export type AssessmentKind = (typeof AssessmentKind)[keyof typeof AssessmentKind];
export declare const QuestionType: {
    readonly QCM_UNIQUE: "QCM_UNIQUE";
    readonly QCM_MULTIPLE: "QCM_MULTIPLE";
    readonly VRAI_FAUX: "VRAI_FAUX";
};
export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];
export declare const AttemptStatus: {
    readonly EN_COURS: "EN_COURS";
    readonly TERMINEE: "TERMINEE";
};
export type AttemptStatus = (typeof AttemptStatus)[keyof typeof AttemptStatus];
export declare const Recurrence: {
    readonly AUCUNE: "AUCUNE";
    readonly QUOTIDIENNE: "QUOTIDIENNE";
    readonly HEBDOMADAIRE: "HEBDOMADAIRE";
};
export type Recurrence = (typeof Recurrence)[keyof typeof Recurrence];
export declare const EventType: {
    readonly EXAMEN: "EXAMEN";
    readonly DEVOIR: "DEVOIR";
    readonly AUTRE: "AUTRE";
};
export type EventType = (typeof EventType)[keyof typeof EventType];
export declare const ReminderStatus: {
    readonly PLANIFIE: "PLANIFIE";
    readonly ENVOYE: "ENVOYE";
    readonly ECHEC: "ECHEC";
    readonly ANNULE: "ANNULE";
};
export type ReminderStatus = (typeof ReminderStatus)[keyof typeof ReminderStatus];
export declare const NotificationType: {
    readonly EVENEMENT_ANNONCE: "EVENEMENT_ANNONCE";
    readonly EVENEMENT_RAPPEL: "EVENEMENT_RAPPEL";
    readonly FLAMME_RAPPEL: "FLAMME_RAPPEL";
    readonly CONTRIBUTION_DECISION: "CONTRIBUTION_DECISION";
    readonly FORUM_REPONSE: "FORUM_REPONSE";
    readonly SANCTION: "SANCTION";
    readonly SYSTEME: "SYSTEME";
};
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
export declare const DevicePlatform: {
    readonly ANDROID: "ANDROID";
    readonly IOS: "IOS";
};
export type DevicePlatform = (typeof DevicePlatform)[keyof typeof DevicePlatform];
export declare const ActivityType: {
    readonly LECON_TERMINEE: "LECON_TERMINEE";
    readonly EXERCICE_TERMINE: "EXERCICE_TERMINE";
    readonly QUIZ_TERMINE: "QUIZ_TERMINE";
    readonly CONTRIBUTION_PUBLIEE: "CONTRIBUTION_PUBLIEE";
    readonly FORUM_REPONSE: "FORUM_REPONSE";
};
export type ActivityType = (typeof ActivityType)[keyof typeof ActivityType];
export declare const ActivityRefType: {
    readonly LESSON: "LESSON";
    readonly ASSESSMENT: "ASSESSMENT";
    readonly CONTRIBUTION: "CONTRIBUTION";
    readonly FORUM_ANSWER: "FORUM_ANSWER";
};
export type ActivityRefType = (typeof ActivityRefType)[keyof typeof ActivityRefType];
export declare const ContributionStatus: {
    readonly EN_ATTENTE: "EN_ATTENTE";
    readonly PUBLIEE: "PUBLIEE";
    readonly REFUSEE: "REFUSEE";
};
export type ContributionStatus = (typeof ContributionStatus)[keyof typeof ContributionStatus];
export declare const ForumStatus: {
    readonly VISIBLE: "VISIBLE";
    readonly MASQUE: "MASQUE";
};
export type ForumStatus = (typeof ForumStatus)[keyof typeof ForumStatus];
export declare const ReportReason: {
    readonly INAPPROPRIE: "INAPPROPRIE";
    readonly HARCELEMENT: "HARCELEMENT";
    readonly SPAM: "SPAM";
    readonly HORS_SUJET: "HORS_SUJET";
    readonly ERREUR_CONTENU: "ERREUR_CONTENU";
    readonly AUTRE: "AUTRE";
};
export type ReportReason = (typeof ReportReason)[keyof typeof ReportReason];
export declare const ReportStatus: {
    readonly OUVERT: "OUVERT";
    readonly TRAITE: "TRAITE";
    readonly REJETE: "REJETE";
};
export type ReportStatus = (typeof ReportStatus)[keyof typeof ReportStatus];
export declare const SanctionType: {
    readonly AVERTISSEMENT: "AVERTISSEMENT";
    readonly SUSPENSION: "SUSPENSION";
};
export type SanctionType = (typeof SanctionType)[keyof typeof SanctionType];
export declare const RequestStatus: {
    readonly EN_ATTENTE: "EN_ATTENTE";
    readonly APPROUVEE: "APPROUVEE";
    readonly REFUSEE: "REFUSEE";
};
export type RequestStatus = (typeof RequestStatus)[keyof typeof RequestStatus];
export declare const OtpPurpose: {
    readonly INSCRIPTION: "INSCRIPTION";
    readonly REINITIALISATION: "REINITIALISATION";
};
export type OtpPurpose = (typeof OtpPurpose)[keyof typeof OtpPurpose];
