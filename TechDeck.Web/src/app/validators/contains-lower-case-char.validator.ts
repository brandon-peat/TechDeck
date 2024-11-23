import { AbstractControl, ValidationErrors } from "@angular/forms";

export function containsLowerCaseChar(control: AbstractControl): ValidationErrors | null {
  const lowerCaseChars : String = "abcdefghijklmnopqrstuvwxyz";

  const containsLowerCase = lowerCaseChars
      .split('')
      .some(character => control.value.includes(character));

  return containsLowerCase ? null : { lowercasechar: true };
}