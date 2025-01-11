import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { containsLowerCaseChar } from '../validators/contains-lower-case-char.validator';
import { containsSpecialChar } from '../validators/contains-special-char.validator';
import { containsUpperCaseChar } from '../validators/contains-upper-case-char.validator';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SecurityService } from '../security/security.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  constructor(
    private readonly accountService: AccountService, 
    private readonly messageService: MessageService,
    private readonly securityService: SecurityService,
    private readonly router: Router) { }

  public ngOnInit(): void {
    if (this.securityService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }
  
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
        this.accountService.signUp(this.email.value!, this.firstName.value!, this.lastName.value!, this.password.value!)
          .subscribe(() => {
            this.router.navigateByUrl('/log-in');
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account created successfully!' })
          });
      }
    });
  }
}