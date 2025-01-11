export type ErrorTypes =
  | 'required'
  | 'email'
  | 'minlength'
  | 'maxlength'
  | 'invalidDate'
  | 'invalidYear'
  | 'specialchar'
  | 'lowercasechar'
  | 'uppercasechar';

export const ERROR_MESSAGES: { [key: string]: (...args: any) => string } = {
  required: (formControlName: string) => `${formControlName} is required.`,
  email: () => `This is not a valid email address.`,
  minlength: (formControlName, requirement) =>
    `${formControlName} should be at least ${requirement} characters.`,
  maxlength: (formControlName, requirement) =>
    `${formControlName} should be less than ${requirement} characters.`,
  invalidDate: () => `This is not a valid date.`,
  invalidYear: () => `Date of Birth should be after year 1900.`,
  specialchar: (formControlName) => 
    `${formControlName} should contain at least one special character`,
  lowercasechar: (formControlName) => 
    `${formControlName} should contain at least one lower case character`,
  uppercasechar: (formControlName) => 
    `${formControlName} should contain at least one upper case character`,
};