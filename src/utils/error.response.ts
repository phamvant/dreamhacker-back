import { StatusCode } from "./http.response/code.status.js";

export class ErrorResponse extends Error {
  statusCode: number;

  constructor({ statusCode = StatusCode.INTERNAL_SERVER_ERROR, message = "" }) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends ErrorResponse {
  constructor({ statusCode = StatusCode.NOT_FOUND, message = "" } = {}) {
    super({ statusCode, message });
  }
}

export class UnAuthorizedError extends ErrorResponse {
  constructor({ statusCode = StatusCode.UNAUTHORIZED, message = "" } = {}) {
    super({ statusCode, message });
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor({ statusCode = StatusCode.FORBIDDEN, message = "" } = {}) {
    super({ statusCode, message });
  }
}

export class BadRequestError extends ErrorResponse {
  constructor({ statusCode = StatusCode.BAD_REQUEST, message = "" } = {}) {
    super({ statusCode, message });
  }
}
