import { Response } from "express";
import { StatusCode } from "./http.response/code.status.js";

export class SUCCESS {
  code: number;
  metadata: any;

  constructor({ code = StatusCode.OK, metadata = undefined } = {}) {
    this.code = code;
    this.metadata = metadata || "";
  }

  send = (res: Response) => {
    return res.status(this.code).json(
      this.metadata
        ? {
            metadata: this.metadata,
          }
        : null,
    );
  };
}

export class CREATE extends SUCCESS {
  constructor({ metadata = undefined }) {
    super({ metadata });
    this.code = StatusCode.CREATED;
  }
}
