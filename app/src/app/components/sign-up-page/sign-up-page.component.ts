import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ConferencesService } from 'src/app/services/conferences/conferences.service';
import { EmailService } from 'src/app/services/email/email.service';

import { AlreadyExistDialogComponent } from './dialog/already-exist-dialog/already-exist-dialog.component';
import { TokenSentDialogComponent } from './dialog/token-sent-dialog/token-sent-dialog.component';

import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';
import { CfCreneau } from 'src/app/interfaces/ConfFormData.model';
@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  userForm: FormGroup;
  confForm: FormGroup = new FormGroup({});
  validatedUserFormValue: any = {};
  utilsUserForm: any = {};
  validatedConfFormValue: any = {};
  utilsConfForm: any = {};
  noneString = 'Aucune';
  // mockCreneau: any;
  cfCreneau: Array<CfCreneau>;

  constructor(private formBuilder: FormBuilder,
              private conferencesService: ConferencesService,
              private emailService: EmailService,
              public dialog: MatDialog,
              private ngRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // this.mockCreneau = this.conferencesService.mockCreneau;
    this.initUserInfoForm();
    this.conferencesService.getConfFormData().subscribe(res => {
      this.cfCreneau = res;
      this.initConfForm();
    });
    this.ngRoute.queryParams.subscribe(event => {
      if (event.userdata) {
        const user = JSON.parse(atob(event.userdata));
        if (user.email && user.token) {
          this.conferencesService.confirmUser(user.email, user.token).subscribe(verifResult => {
            console.log(verifResult);
            /* send the result in a moda
            type to handle :
            */
          });
        }
      }
    });
  }

  openTokenSentDialog(user: UserInformations): void {
    const dialogRef = this.dialog.open(TokenSentDialogComponent, {
      width: '500px',
      data: { user }
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('Token sent dialog closed');
    });
  }

  openAlreadyExistDialog(email): void {
    const dialogRef = this.dialog.open(AlreadyExistDialogComponent, {
      width: '570px',
      data: email
    });

    dialogRef.afterClosed().subscribe(data => {
      console.log('Already exist dialog closed');
    });
  }

  initUserInfoForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(70)]],
      fName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      lName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      company: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
      position: ['', [Validators.required, Validators.maxLength(60), Validators.minLength(2)]],
      vehicle: [false, [Validators.required]]
    });
    // console.log(this.userForm);
  }

  initConfForm() {
    this.confForm = this.formBuilder.group({});
    this.cfCreneau.forEach(creneau => {
      this.confForm.addControl(creneau.crenId.toString(), this.formBuilder.control(null, [Validators.required]));
    });
    // console.log(this.confForm);
  }

  onSubmitUserInfo() {
    const userFormValue = this.userForm.value;
    this.validatedUserFormValue = this.userForm.value;
    this.utilsUserForm.keys = Object.keys(this.validatedUserFormValue);
    console.log('User form values', userFormValue);

  }

  onSubmitConf() {
    const confFormValue = this.confForm.value;
    this.validatedConfFormValue = this.confForm.value;
    this.utilsConfForm.conf = Object.keys(this.validatedConfFormValue).map((key, i) => this.validatedConfFormValue[i + 1]);
    this.utilsConfForm.ids = Object.keys(this.validatedConfFormValue).map((key, i) => {
      if (this.validatedConfFormValue[i + 1] === '-1') {
        return -1;
      } else {
        return this.validatedConfFormValue[i + 1].confId;
      }
    });
    console.log('Conf form values', confFormValue, this.utilsConfForm);
  }

  validateSignUp() {
    // console.log(this.validatedUserFormValue, this.validatedConfFormValue);
    const u = this.validatedUserFormValue;
    const token = this.generateToken(16);
    const user = new UserInformations(
      u.lName,
      u.fName,
      u.company,
      u.email,
      u.position,
      u.vehicle,
      false,
      token,
      this.utilsConfForm.ids
    );
    this.conferencesService.createUser(user).subscribe(data => {
      console.log(data);
      if (data.err) {
        this.openAlreadyExistDialog(u.email);
      } else {
        console.log('Sending email confirmation');
        this.emailService.sendEmail(
          {
            templateName: 'tokenMail',
            data: {
              from: 'msia',
              to: user.email,
              templateOptions: {
                fName: 'Willem',
                url: 'https://msia17conferences.com/dev/inscription-willem?' + this.encodeData({
                  userdata: btoa(JSON.stringify({email: user.email, token: user.token}))
                })
              }
            }
          }).subscribe(mailRes => {
            console.log('attempt token mail ? ', mailRes);

            this.openTokenSentDialog(user);
          });
      }
    });
  }

  log() {
    console.log(this.generateToken(16));
    const u = this.validatedUserFormValue;
    const user = new UserInformations(
      u.lName,
      u.fName,
      u.company,
      u.email,
      u.position,
      u.vehicle,
      false,
      '',
      this.utilsConfForm.ids
    );
    console.log('https://msia17conferences.com/dev/conferences?' + this.encodeData({
      userdata: btoa(JSON.stringify(user)),
      token: this.generateToken(16)
    }));
  }

  fillUserInfoForm() {
    this.userForm.setValue({
      email: 'willineito@gmail.com',
      fName: 'Willem',
      lName: 'Houm',
      company: 'General Electrics',
      position: 'Apprenti Architecte Solution',
      vehicle: true,
    });
  }

  isNone(conf) {
    return conf === '-1';
  }

  dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
  }

  generateToken(len) {
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join('');
  }

  encodeData(data) {
    return Object.keys(data).map(key => {
      return [key, data[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }
}
