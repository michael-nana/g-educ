import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '../../generated/prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let error = 'Internal Server Error';
    let code: string | undefined;

    if (exception instanceof Prisma.PrismaClientKnownRequestError && exception.code === 'P2025') {
      const mapped = new NotFoundException('Resource not found');
      status = mapped.getStatus();
      message = mapped.message;
      error = mapped.name.replace('Exception', '');
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const payload = exception.getResponse();
      if (typeof payload === 'string') {
        message = payload;
        error = exception.name.replace('Exception', '');
      } else {
        const body = payload as {
          message?: string | string[];
          error?: string;
          code?: string;
        };
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
}
