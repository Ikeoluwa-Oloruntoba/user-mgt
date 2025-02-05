import { HttpStatusCode } from "axios";

export class BadRequestException extends Error {
    status: number;
    errors: any;
  
    constructor(message: string, errors?: any) {
      super(message);
      this.name = this.constructor.name;
      this.status = HttpStatusCode.BadRequest;
      this.errors = errors || null;
  
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  
    toJSON() {
      return {
        status: this.status,
        message: this.message,
        ...(this.errors && { errors: this.errors }),
      };
    }
  }
  