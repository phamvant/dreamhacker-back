import { StatusCode } from "./http.response/code.status.js";

export class ErrorResponse extends Error {
  code: number;

  constructor({
    code = StatusCode.INTERNAL_SERVER_ERROR,
    message = undefined,
  }) {
    super(message);
    this.code = code;
  }
}

export class NotFoundError extends ErrorResponse {
  constructor({ code = StatusCode.NOT_FOUND, message }) {
    super({ code, message });
  }
}

export class UnAuthorizedError extends ErrorResponse {
  constructor({ code = StatusCode.UNAUTHORIZED, message }) {
    super({ code, message });
  }
}

export class ForbiddenError extends ErrorResponse {
  constructor({ code = StatusCode.FORBIDDEN, message }) {
    super({ code, message });
  }
}
