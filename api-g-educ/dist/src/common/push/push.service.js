"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PushService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushService = void 0;
const common_1 = require("@nestjs/common");
const app_1 = require("firebase-admin/app");
const messaging_1 = require("firebase-admin/messaging");
let PushService = PushService_1 = class PushService {
    logger = new common_1.Logger(PushService_1.name);
    onModuleInit() {
        if ((0, app_1.getApps)().length === 0) {
            (0, app_1.initializeApp)({
                credential: (0, app_1.applicationDefault)(),
                projectId: process.env.FIREBASE_PROJECT_ID,
            });
        }
        this.logger.log('Firebase Admin SDK initialisé.');
    }
    async sendToTokens(tokens, message) {
        const result = {
            successTokens: [],
            invalidTokens: [],
        };
        const uniqueTokens = [...new Set(tokens)];
        if (uniqueTokens.length === 0) {
            return result;
        }
        const messaging = (0, messaging_1.getMessaging)();
        for (let index = 0; index < uniqueTokens.length; index += 500) {
            const batch = uniqueTokens.slice(index, index + 500);
            try {
                const response = await messaging.sendEachForMulticast({
                    tokens: batch,
                    notification: {
                        title: message.title,
                        body: message.body,
                    },
                    data: message.data ?? {},
                });
                response.responses.forEach((item, responseIndex) => {
                    const token = batch[responseIndex];
                    if (item.success) {
                        result.successTokens.push(token);
                        return;
                    }
                    const errorCode = item.error?.code;
                    if (errorCode ===
                        'messaging/registration-token-not-registered' ||
                        errorCode === 'messaging/invalid-registration-token') {
                        result.invalidTokens.push(token);
                    }
                    else {
                        this.logger.warn(`Échec Push pour un token : ${errorCode ?? 'erreur inconnue'}`);
                    }
                });
            }
            catch (error) {
                this.logger.error('Impossible d’envoyer un lot de notifications Firebase.', error instanceof Error ? error.stack : String(error));
            }
        }
        return result;
    }
};
exports.PushService = PushService;
exports.PushService = PushService = PushService_1 = __decorate([
    (0, common_1.Injectable)()
], PushService);
//# sourceMappingURL=push.service.js.map