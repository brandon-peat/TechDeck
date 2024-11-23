import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { containsSpecialChar } from '../validators/contains-special-char.validator';
import { containsLowerCaseChar} from '../validators/contains-lower-case-char.validator';
import { containsUpperCaseChar } from '../validators/contains-upper-case-char.validator';

import { AccountService } from '../services/account.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  constructor(private readonly accountService: AccountService, private messageService: MessageService) { }
  
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(25)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), containsSpecialChar, containsLowerCaseChar, containsUpperCaseChar]),
  })

  get email() {
    return this.form.controls.email;
  }
  get firstName() {
    return this.form.controls.firstName;
  }
  get lastName() {
    return this.form.controls.lastName;
  }
  get password() {
    return this.form.controls.password;
  }

  onSubmit() {
    this.accountService.checkExistingEmail(this.email.value!).subscribe(isInUse => {
      if(isInUse) { 
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'There already exists an account using this email. Did you mean to log in instead?' });
      }
      else {
        this.accountService.signUp(
          this.email.value!,
          this.firstName.value!,
          this.lastName.value!,
          this.password.value!)
          .subscribe(() => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account created successfully!' }));
      }
    });
  }
}