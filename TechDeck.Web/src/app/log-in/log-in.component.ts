import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { containsLowerCaseChar } from '../validators/contains-lower-case-char.validator';
import { containsSpecialChar } from '../validators/contains-special-char.validator';
import { containsUpperCaseChar } from '../validators/contains-upper-case-char.validator';

import { MessageService } from 'primeng/api';
import { SecurityService } from '../security/security.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent {
  constructor(
    private readonly accountService: AccountService, 
    private readonly securityService: SecurityService,
    private messageService: MessageService) { }
  
  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), containsSpecialChar, containsLowerCaseChar, containsUpperCaseChar]),
  })

  get email() {
    return this.form.controls.email;
  }
  get password() {
    return this.form.controls.password;
  }

  onSubmit() {
    this.accountService.checkExistingEmail(this.email.value!).subscribe(isInUse => {
      if(isInUse) { 
        this.accountService.logIn(this.email.value!, this.password.value!).subscribe({
          next: result => {
            if (result.isSuccess) {
              this.securityService.userIsLoggedIn(result.value!);
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Log in successful' });
            }
            else {
              this.messageService.add({ severity: 'error', summary: 'Failed', detail: result.errorMessage! });
            }
          }
        })
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'There does not exist an account with this email. Did you mean to sign up instead?' });
      }
    });
  }
}
