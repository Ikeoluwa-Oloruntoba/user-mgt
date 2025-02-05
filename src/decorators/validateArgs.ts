import 'reflect-metadata';
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { formatValidationErrors } from '../utils/format-validation';
import { BadRequestException } from '../common/exceptions/badRequest.exception';

export function ValidateArgs(
    target: Object,
    key: string,
    descriptor: PropertyDescriptor,
  ) {
    const targetMethod = descriptor.value;
    const types = Reflect.getMetadata('design:paramtypes', target, key);
  
    descriptor.value = function (...args: any[]) {
      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        const argType = types[i];
  
        const transformedArg = plainToInstance(argType, arg);
        Object.assign(arg, transformedArg);
  
        const errors =  validateSync(transformedArg, {
            whitelist: true,
            forbidNonWhitelisted: true,
          });

  
        if (errors.length > 0) {

            const formattedErrors = formatValidationErrors(errors);
       
            throw new BadRequestException("Validation Failed", formattedErrors)
        }
      }
  
      return targetMethod.apply(this, args);
    };
  
    return descriptor;
  }
