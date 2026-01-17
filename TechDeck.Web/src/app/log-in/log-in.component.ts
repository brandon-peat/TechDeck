import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { SecurityService } from '../security/security.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LogInComponent implements OnInit {
  constructor(
    private readonly accountService: AccountService, 
    private readonly securityService: SecurityService,
    private readonly messageService: MessageService,
    private readonly router: Router) { }

  public ngOnInit(): void {
    if (this.securityService.isLoggedIn()) {
      this.redirectToHome();
    }
  }

  public form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
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
              this.redirectToHome();
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

  private redirectToHome() {
    this.router.navigateByUrl('/home');
  }
}
