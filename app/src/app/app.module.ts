import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';
// import { BROWSER_FAVICONS_CONFIG } from "./favicons";
// import { BrowserFavicons } from "./favicons";
// import { Favicons } from "./favicons";
import {
  MatMenuModule, MatToolbarModule, MatIconModule,
  MatSidenavModule, MatListModule, MatButtonModule,
  MatStepperModule, MatInputModule, MatFormFieldModule,
  MatCheckboxModule, MatRadioModule, MatDialogModule,
  MatTabsModule, MatSnackBarModule, MatCardModule,
  MatExpansionModule, MatProgressSpinnerModule, MatBottomSheetModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpPageComponent } from './components/sign-up-page/sign-up-page.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ConferencesComponent } from './components/conferences/conferences.component';
import { GenericDialogComponent } from './components/dialogs/generic-dialog/generic-dialog.component';
import { UpdateUserDialogComponent } from './components/dialogs/update-user-dialog/update-user-dialog.component';
import { DeleteUserDialogComponent } from './components/dialogs/delete-user-dialog/delete-user-dialog.component';
import { AlreadyUserExistComponent } from './components/dialogs/already-user-exist/already-user-exist.component';
import { BottomSheetOverviewComponent } from './components/bottom-sheet-overview/bottom-sheet-overview.component';

import { EmailService } from './services/email/email.service';
import { ConferencesService } from './services/conferences/conferences.service';
import { MobileService } from './services/mobile/mobile.service';
import { GuestsService } from 'src/app/services/guests/guests.service';
import { LoaderService } from './services/loader/loader.service';
import { FooterComponent } from './components/footer/footer.component';

// import { TestComponent } from './components/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpPageComponent,
    AboutComponent,
    ContactComponent,
    // ContactFormValidatorDirective,
    ConferencesComponent,
    GenericDialogComponent,
    UpdateUserDialogComponent,
    DeleteUserDialogComponent,
    FooterComponent,
    BottomSheetOverviewComponent,
    AlreadyUserExistComponent
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
    MatCardModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MarkdownModule.forRoot()
  ],
  entryComponents : [
    GenericDialogComponent,
    UpdateUserDialogComponent,
    DeleteUserDialogComponent,
    BottomSheetOverviewComponent,
    AlreadyUserExistComponent
  ],
  providers: [
    EmailService,
    ConferencesService,
    GuestsService,
    MobileService,
    LoaderService,
  //   {
  //     provide: Favicons,
  //     useClass: BrowserFavicons
  // },
  // {
  //   provide: BROWSER_FAVICONS_CONFIG,
  //   useValue: {
  //       icons: {
  //           happy: {
  //               type: 'image/png',
  //               href: '../assets/Logo_Conference_MSIA.png'
  //           }
  //       },

  //       // I determine whether or not a random token is auto-appended to the HREF
  //       // values whenever an icon is injected into the document.
  //       cacheBusting: true
  //   }
// }

  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
