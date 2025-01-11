import { Directive, Input, OnInit, Optional, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

// Nicked from https://blog.bitsrc.io/effortlessly-show-validation-messages-in-angular-fbcf7bce8f4c

@Directive({
  selector: 'input[showError], textarea[showError], select[showError], p-password[showError]',
})
export class ShowErrorDirective implements OnInit {
  
  @Input() showError: string | null = null; 

  public controlName: string = '';

  constructor(@Optional() @Self() public ngControl: NgControl) {}

  public ngOnInit(): void {
    if (this.showError) {
      this.controlName = this.showError;
    }
    else {
      const formControlName = <string>this.ngControl.name;
      const result = formControlName.replace(/([A-Z])/g, " $1");
      this.controlName = result.charAt(0).toUpperCase() + result.slice(1);
    }
  }
}
