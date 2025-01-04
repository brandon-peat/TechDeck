import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Button, ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { MessageService } from 'primeng/api';
import { httpInterceptorProviders } from './security/interceptor-providers';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MenubarModule,
    ChipModule,
    DropdownModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    MessagesModule,
    InputTextModule,
    ButtonModule,
    Button,
    PasswordModule,
    ToastModule,
    InputTextareaModule
  ],
  providers: [
    MessageService, 
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
