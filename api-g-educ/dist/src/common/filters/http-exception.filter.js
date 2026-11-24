"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../../generated/prisma/client");
let HttpExceptionFilter = class HttpExceptionFilter {
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let error = 'Internal Server Error';
        let code;
        if (exception instanceof client_1.Prisma.PrismaClientKnownRequestError && exception.code === 'P2025') {
            const mapped = new common_1.NotFoundException('Resource not found');
            status = mapped.getStatus();
            message = mapped.message;
            error = mapped.name.replace('Exception', '');
        }
        else if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const payload = exception.getResponse();
            if (typeof payload === 'string') {
                message = payload;
                error = exception.name.replace('Exception', '');
            }
            else {
                const body = payload;
                message = Array.isArray(body.message)
                    ? body.message.join(', ')
                    : body.message ?? exception.message;
                error = body.error ?? exception.name.replace('Exception', '');
                code = body.code;
            }
        }
        response.status(status).json({
            statusCode: status,
            message,
            error,
            ...(code ? { code } : {}),
            path: request.originalUrl ?? request.url,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)()
], HttpExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map