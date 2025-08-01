// customized error with status code

export class CustomizedError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}
