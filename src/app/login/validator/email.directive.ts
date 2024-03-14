import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function emailValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const valid = nameRe.test(control.value);
    return !valid ? { invalidEmail: true } : null;
  };
}

// @Directive({
//   selector: '[appForbiddenName]',
//   providers: [
//     {
//       provide: NG_VALIDATORS,
//       useExisting: ForbiddenValidatorDirective,
//       multi: true,
//     },
//   ],
//   standalone: true,
// })
// export class ForbiddenValidatorDirective implements Validator {
//   @Input('appForbiddenName') forbiddenName = '';

//   validate(control: AbstractControl): ValidationErrors | null {
//     return this.forbiddenName
//       ? forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
//       : null;
//   }
// }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/