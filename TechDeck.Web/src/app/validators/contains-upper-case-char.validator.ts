import { AbstractControl, ValidationErrors } from "@angular/forms";

export function containsUpperCaseChar(control: AbstractControl): ValidationErrors | null {
  const upperCaseChars : String = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const containsUpperCase = upperCaseChars
      .split('')
      .some(character => control.value.includes(character));

  return containsUpperCase ? null : { uppercasechar: true };
}