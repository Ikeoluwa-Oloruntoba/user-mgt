import { ValidationError } from "class-validator";

export function formatValidationErrors(errors: ValidationError[]): Record<string, any> {
    const formattedErrors: Record<string, any> = {};
    for (const error of errors) {
      if (error.constraints) {
        formattedErrors[error.property] = Object.values(error.constraints);
      } else if (error.children && error.children.length > 0) {
        formattedErrors[error.property] = formatValidationErrors(error.children);
      }
    }
    return formattedErrors;
  }