export interface IValidator<TRequest> {
  validate(request: TRequest): Promise<void>;
}
