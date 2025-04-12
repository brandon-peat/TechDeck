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
import { FileUploadModule } from 'primeng/fileupload';
import { FloatLabelModule } from 'primeng/floatlabel';
import { GalleriaModule } from 'primeng/galleria';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';
import { HomeComponent } from './home/home.component';
import { PostCardComponent } from './post-card/post-card.component';
import { ProfileComponent } from './profile/profile.component';
import { ReplyCardComponent } from './reply-card/reply-card.component';
import { httpInterceptorProviders } from './security/interceptor-providers';
import { SecurePipe } from './security/secure-pipe';
import { FormFieldComponent } from './shared/form-validation/form-field.component';
import { ShowErrorDirective } from './shared/form-validation/show-error.directive';
import { TimelineComponent } from './timeline/timeline.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { PersonSearchResultCardComponent } from './person-search-result-card/person-search-result-card.component';
import { PersonSearchBarComponent } from './person-search-bar/person-search-bar.component';
import { MessagesAreaComponent } from './messages-area/messages-area.component';
import { ConversationCardComponent } from './conversation-card/conversation-card.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    HomeComponent,
    TimelineComponent,
        PostCardComponent,
        ShowErrorDirective,
        FormFieldComponent,
        ViewPostComponent,
        ReplyCardComponent,
        SecurePipe,
        ProfileComponent,
        PersonSearchResultCardComponent,
        PersonSearchBarComponent,
        MessagesAreaComponent,
        ConversationCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MenubarModule,
    MenuModule,
    ChipModule,
    DropdownModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    MessagesModule,
    InputTextModule,
    ButtonModule,
    Button,
    OverlayPanelModule,
    PasswordModule,
    ToastModule,
    InputTextareaModule,
    FileUploadModule,
    GalleriaModule,
    FloatLabelModule
  ],
  providers: [
    MessageService, 
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
