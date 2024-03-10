import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as uuid from 'uuid';

@ValidatorConstraint()
export class IsUUIDOrNullConstraint implements ValidatorConstraintInterface {
  validate = (value: any) => value === null || uuid.validate(value);
}

export const IsUUIDOrNull =
  (validationOptions?: ValidationOptions) =>
  (object: NonNullable<object>, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        message: `The ${propertyName} must be a valid UUID or null`,
        ...validationOptions,
      },
      validator: IsUUIDOrNullConstraint,
    });
