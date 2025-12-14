import { HttpStatusCode } from 'axios';
import { ErrorResponse } from './contracts/error-response';

export class ExceptionHandlerResult {
  constructor(
    public httpStatusCode: HttpStatusCode,
    public errorResponse: ErrorResponse
  ) {}
}
