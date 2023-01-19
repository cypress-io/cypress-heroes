import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

// Prisma doesn't export an exception class that we can filter on, so we extend base and handle it by checking the name
@Catch()
export class EntityNotFoundFilter extends BaseExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    if (exception.name === 'NotFoundError') {
      const context = host.switchToHttp();
      const response = context.getResponse<Response>();
      const request = context.getRequest<Request>();
      response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: exception.message,
        error: exception.name,
        url: request.url,
      });
    } else {
      super.catch(exception, host);
    }
  }
}
