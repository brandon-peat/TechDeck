import { AbstractControl, ValidationErrors } from "@angular/forms";

export function containsSpecialChar(control: AbstractControl): ValidationErrors | null {
  const specialChars : String = "/[!@#$%^&*()_+\-=\[\]{};':" + '"\\|,.<>\/?]/';

  const containsSpecialChars = specialChars
      .split('')
      .some(character => control.value.includes(character));

  return containsSpecialChars ? null : { specialchar: true };
}