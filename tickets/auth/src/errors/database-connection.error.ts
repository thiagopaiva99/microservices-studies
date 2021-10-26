export class DatabaseConnectionError extends Error {
  reason = 'Error connecting to database';

  constructor(message: string) {
    super(message);
    this.name = 'DatabaseConnectionError';
  }
}