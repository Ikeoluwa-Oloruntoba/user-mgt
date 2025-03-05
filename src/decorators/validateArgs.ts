import 'reflect-metadata';
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { formatValidationErrors } from '../utils/format-validation';
import { BadRequestException } from '../common/exceptions/badRequest.exception';

export function ValidateArgs(dtoParam: string) {
  return function (
    target: Object,
    key: string,
    descriptor: PropertyDescriptor,
  ) {
    const targetMethod = descriptor.value;
    const types = Reflect.getMetadata('design:paramtypes', target, key);
    const paramNames = getParameterNames(targetMethod);

    descriptor.value = function (...args: any[]) {
      const dtoIndex = paramNames.indexOf(dtoParam);
      if (dtoIndex !== -1) {
        const arg = args[dtoIndex];
        const argType = types[dtoIndex];

        const transformedArg = plainToInstance(argType, arg);
        args[dtoIndex] = transformedArg;

        const errors = validateSync(transformedArg, {
          whitelist: true,
          forbidNonWhitelisted: true,
        });

        if (errors.length > 0) {
          const formattedErrors = formatValidationErrors(errors);
          throw new BadRequestException("Validation Failed", formattedErrors);
        }
      }

      return targetMethod.apply(this, args);
    };

    return descriptor;
  };
}

// Helper function to get parameter names
function getParameterNames(func: Function) {
  const fnStr = func.toString().replace(/[\r\n\s]+/g, ' ');
  const result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).split(',');
  return result.map(param => param.trim());
}
