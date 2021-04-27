import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse();

    const errors = message['message'].toString().split(',');
    const fixedErrors = errors.map((err: string): string => {
      if (err.split('.').length === 3) {
        return err.split('.')[2];
      }
      return err;
    });

    response.status(status).json({
      response: 'fail',
      error: fixedErrors,
    });
  }
}
