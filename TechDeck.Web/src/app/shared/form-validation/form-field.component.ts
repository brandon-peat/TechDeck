import { Component, ContentChild } from '@angular/core';
import { FormErrorService } from './form-error.service';
import { ShowErrorDirective } from './show-error.directive';

@Component({
  selector: 'form-field',
  templateUrl: './form-field.component.html'
})
export class FormFieldComponent {
  @ContentChild(ShowErrorDirective, { static: true }) errorDirective!: ShowErrorDirective;

  constructor(private readonly errorService: FormErrorService) {}

  get errorMessages(): string[] | null {
    const errors = Object.entries(
      this.errorDirective?.ngControl?.control?.errors || {}
    );

    if (!this.errorDirective?.ngControl?.dirty && !this.errorDirective?.ngControl?.touched) return null;
    if (!errors.length) { return null;
    }

    const passedControlName = this.errorDirective?.controlName;
    const formControlName = passedControlName ?? 'This field';

    return this.errorService.getErrorValidationMessages(formControlName, errors);
  }

  ngOnInit() {
    if (!this.errorDirective) {
      throw new Error('Without showError directive this is a useless component!');
    }
  } 
}
