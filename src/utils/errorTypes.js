class NotFoundError extends Error {
  constructor(message = "Not Found") {
    super();
    this.message = message;
  }
}

class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super();
    this.message = message;
  }
}

class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super();
    this.message = message;
  }
}

class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super();
    this.message = message;
  }
}

export { BadRequestError, ForbiddenError, NotFoundError, UnauthorizedError };
