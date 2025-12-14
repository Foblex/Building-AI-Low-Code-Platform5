export abstract class Exception extends Error {
  protected constructor(message?: string) {
    super(message);
  }
}
