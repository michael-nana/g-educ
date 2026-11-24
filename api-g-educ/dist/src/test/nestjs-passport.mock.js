"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = AuthGuard;
function AuthGuard() {
    return class {
        canActivate() {
            return true;
        }
    };
}
//# sourceMappingURL=nestjs-passport.mock.js.map