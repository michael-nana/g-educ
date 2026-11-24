"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = exports.ConfigService = void 0;
class ConfigService {
    getOrThrow(key) {
        const value = process.env[key];
        if (value === undefined) {
            throw new Error(`Configuration manquante : ${key}`);
        }
        return value;
    }
    get(key) {
        return process.env[key];
    }
}
exports.ConfigService = ConfigService;
class ConfigModule {
    static forRoot(_options) {
        return {
            module: ConfigModule,
            global: true,
            providers: [ConfigService],
            exports: [ConfigService],
        };
    }
}
exports.ConfigModule = ConfigModule;
//# sourceMappingURL=nestjs-config.mock.js.map