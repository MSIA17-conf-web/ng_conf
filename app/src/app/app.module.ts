import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
import {
  MatMenuModule, MatToolbarModule, MatIconModule,
  MatSidenavModule, MatListModule, MatButtonModule,
  MatStepperModule, MatInputModule, MatFormFieldModule,
  MatCheckboxModule, MatRadioModule, MatDialogModule,
  MatTabsModule, MatSnackBarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DefaultTemplateComponent } from './components/default-template/default-template.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { OpenContactResponseDialogComponent } from './components/contact/dialogs/open-contact-response-dialog/open-contact-response-dialog.component';
import { ConferencesComponent } from './components/conferences/conferences.component';
import { AlreadyExistDialogComponent } from './components/sign-up-page/dialogs/already-exist-dialog/already-exist-dialog.component';
import { TokenSentDialogComponent } from './components/sign-up-page/dialogs/token-sent-dialog/token-sent-dialog.component';
import { SuccessfullSignUpDialogComponent } from './components/sign-up-page/dialogs/successfull-sign-up-dialog/successfull-sign-up-dialog.component';
import { UserNotFoundDialogComponent } from './components/sign-up-page/dialogs/user-not-found-dialog/user-not-found-dialog.component';
import { TokenNotMatchDialogComponent } from './components/sign-up-page/dialogs/token-not-match-dialog/token-not-match-dialog.component';
import { UpdateErrorDialogComponent } from './components/sign-up-page/dialogs/update-error-dialog/update-error-dialog.component';
import { EmailNotFoundDialogComponent } from './components/sign-up-page/dialogs/email-not-found-dialog/email-not-found-dialog.component';
import { InternalServerErrorDialogComponent } from './components/dialogs/internal-server-error-dialog/internal-server-error-dialog.component';
import { GenericDialogComponent } from './components/dialogs/generic-dialog/generic-dialog.component';
import { UpdateUserDialogComponent } from './components/sign-up-page/dialogs/update-user-dialog/update-user-dialog.component';
import { DeleteUserDialogComponent } from './components/sign-up-page/dialogs/delete-user-dialog/delete-user-dialog.component';

import { ContactFormValidatorDirective } from './directives/contact-form-validator.directive';

import { EmailService } from './services/email/email.service';
import { ConferencesService } from './services/conferences/conferences.service';
import { FormService } from './services/form-service/form-service.service';

// import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultTemplateComponent,
    HomeComponent,
    SignUpComponent,
    SignUpPageComponent,
    AboutComponent,
    ContactComponent,
    // ContactFormValidatorDirective,
    ConferencesComponent,
    OpenContactResponseDialogComponent,
    SuccessfullSignUpDialogComponent,
    AlreadyExistDialogComponent,
    TokenSentDialogComponent,
    UserNotFoundDialogComponent,
    TokenNotMatchDialogComponent,
    UpdateErrorDialogComponent,
    EmailNotFoundDialogComponent,
    InternalServerErrorDialogComponent,
    // TestComponent,
    GenericDialogComponent,
    UpdateUserDialogComponent,
    DeleteUserDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MarkdownModule.forRoot()
  ],
  entryComponents : [
    OpenContactResponseDialogComponent,
    SuccessfullSignUpDialogComponent,
    AlreadyExistDialogComponent,
    TokenSentDialogComponent,
    UserNotFoundDialogComponent,
    TokenNotMatchDialogComponent,
    UpdateErrorDialogComponent,
    EmailNotFoundDialogComponent,
    InternalServerErrorDialogComponent,
    GenericDialogComponent,
    UpdateUserDialogComponent,
    DeleteUserDialogComponent
  ],
  providers: [EmailService, ConferencesService, FormService],
  bootstrap: [AppComponent]
})
export class AppModule { }
