import { Injectable } from '@angular/core';
import { ERROR_MESSAGES, ErrorTypes } from './error-messages';

@Injectable({
  providedIn: 'root'
})
export class FormErrorService {
  constructor() {}

  public getErrorValidationMessages(
    formControlName: string,
    errors: [string, any][]
  ): string[] {
    return errors.map(error => this.getErrorValidationMessage(formControlName, [error]));
  }

  private getErrorValidationMessage(
    formControlName: string,
    errors: [string, any][]
  ): string {
    switch (true) {
      case this.checkErrorType(errors, 'required'):
        return ERROR_MESSAGES['required'](formControlName);
      case this.checkErrorType(errors, 'invalidYear'):
        return ERROR_MESSAGES['invalidYear']();
      case this.checkErrorType(errors, 'invalidDate'):
        return ERROR_MESSAGES['invalidDate']();

      case this.checkErrorType(errors, 'email'):
        return ERROR_MESSAGES['email']();

      case this.checkErrorType(errors, 'minlength'):
        const min = this.getErrorMessage(errors,'minlength')?.requiredLength;
        return ERROR_MESSAGES['minlength'](formControlName, min);

      case this.checkErrorType(errors, 'maxlength'):
          const max = this.getErrorMessage(errors,'maxlength')?.requiredLength;
          return ERROR_MESSAGES['maxlength'](formControlName, max);
  
      case this.checkErrorType(errors, 'specialchar'):
        return ERROR_MESSAGES['specialchar'](formControlName);

      case this.checkErrorType(errors, 'lowercasechar'):
        return ERROR_MESSAGES['lowercasechar'](formControlName);

      case this.checkErrorType(errors, 'uppercasechar'):
        return ERROR_MESSAGES['uppercasechar'](formControlName);
      default:
        return '';
    }
  }

  private checkErrorType(errors: [string, any][], key: ErrorTypes) {
    return errors.some(([errorKey, value]) => errorKey === key);
  }

  private getErrorMessage(errors: [string, any][], key: ErrorTypes) {
    return errors.find(([k, v]) => k === key)?.[1];
  }
}
