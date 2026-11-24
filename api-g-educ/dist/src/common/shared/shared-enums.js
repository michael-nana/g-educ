"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityType = exports.ContentStatus = exports.SchoolCycle = exports.ClassSeries = exports.ClassLevel = exports.UserStatus = exports.Role = void 0;
exports.Role = {
    ELEVE: 'ELEVE',
    ENSEIGNANT: 'ENSEIGNANT',
    MODERATEUR: 'MODERATEUR',
    ADMINISTRATEUR: 'ADMINISTRATEUR',
};
exports.UserStatus = {
    ACTIF: 'ACTIF',
    SUSPENDU: 'SUSPENDU',
};
exports.ClassLevel = {
    SIXIEME: 'SIXIEME',
    CINQUIEME: 'CINQUIEME',
    QUATRIEME: 'QUATRIEME',
    TROISIEME: 'TROISIEME',
    SECONDE: 'SECONDE',
    PREMIERE: 'PREMIERE',
    TERMINALE: 'TERMINALE',
};
exports.ClassSeries = {
    A: 'A',
    C: 'C',
    D: 'D',
};
exports.SchoolCycle = {
    COLLEGE: 'COLLEGE',
    LYCEE: 'LYCEE',
};
exports.ContentStatus = {
    BROUILLON: 'BROUILLON',
    PUBLIE: 'PUBLIE',
    ARCHIVE: 'ARCHIVE',
};
exports.ActivityType = {
    LECON_TERMINEE: 'LECON_TERMINEE',
    EXERCICE_TERMINE: 'EXERCICE_TERMINE',
    QUIZ_TERMINE: 'QUIZ_TERMINE',
    CONTRIBUTION_PUBLIEE: 'CONTRIBUTION_PUBLIEE',
    FORUM_REPONSE: 'FORUM_REPONSE',
};
//# sourceMappingURL=shared-enums.js.map