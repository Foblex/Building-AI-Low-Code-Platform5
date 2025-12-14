import { ErrorDescription } from './error-description';

export class ErrorResponse {
  constructor(
    public referenceId: string,
    public errors: ErrorDescription[] = []
  ) {}
}
