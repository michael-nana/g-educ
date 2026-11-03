"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const serialization_interceptor_1 = require("./common/interceptors/serialization.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    app.useGlobalInterceptors(new serialization_interceptor_1.SerializationInterceptor());
    app.use((0, compression_1.default)());
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: process.env.CORS_ORIGINS?.split(',').map((origin) => origin.trim()) ?? false,
        credentials: true,
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('G-Educ API')
        .setDescription('API backend de la plateforme G-Educ')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map