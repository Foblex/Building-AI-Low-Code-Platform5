export class ExecutionResult {
  constructor(
    public readonly output?: string | null,
    public readonly nodeKey?: string | null,
    public readonly executionTime?: number | null,
    public readonly status?: 'success' | 'error' | null,
    public readonly error?: string | null,
  ) {}

}
