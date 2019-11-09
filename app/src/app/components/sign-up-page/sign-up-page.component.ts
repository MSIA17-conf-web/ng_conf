import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ConferencesService } from 'src/app/services/conferences/conferences.service';
import { EmailService } from 'src/app/services/email/email.service';

import CustomeDialogUtils from 'src/app/utils/CustomeDialogUtils';

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
        let user;
        try {
          user = JSON.parse(atob(event.userdata));
        } catch (e) {
          console.log('La clé utilisée est erronnée', event.userdata);
          console.log('JSON parse exeption : ', e);
          CustomeDialogUtils.openTokenNotMatchDialogComponent(this.dialog);
          return;
        }

        if (user.email && user.token) {
          Promise.all(this.getAllConfName(user)).then(allConfName => {
            console.log('Retrieving all conference names the test user : ', user.email);
            this.conferencesService.confirmUser(user.email, user.token).subscribe(verifResult => {
              if (!verifResult.success) {
                this.handleErrorDialog(verifResult, user);
              } else {
                console.log('successfully registred');
                this.emailService.sendEmail(
                  {
                    templateName: 'successfullSignUpMail',
                    data: {
                      from: 'msia',
                      to: user.email,
                      templateOptions: {
                        lName: user.lName,
                        fName: user.fName,
                        company: user.company,
                        conferences: allConfName
                      }
                    }
                  }).subscribe(mailRes => {
                    CustomeDialogUtils.openSuccessfullSignUpDialogComponent(this.dialog, user);
                  });
              }
            });
          }).catch(err => {
            console.log('Error when calling getAllConfName : ', err);
          });
        }
      }
    });
  }

  getAllConfName(user: UserInformations): any[] {
    return user.conferences.map((confId) => {
      return new Promise((resolve, reject) => {
        this.conferencesService.getThematicData(confId).subscribe(conference => {
          resolve(conference.confName);
        });
      });
    });
  }

  handleErrorDialog(verifResult, user) {
    switch (verifResult.type) {
      case 'alreadyRegistered':
        CustomeDialogUtils.openAlreadyExistDialog(this.dialog, user.email);
        break;

      case 'userNotFoundAfterTokenValidation':
        CustomeDialogUtils.openUserNotFoundDialogComponent(this.dialog);
        break;
      case 'tokenNotMatch':
        CustomeDialogUtils.openTokenNotMatchDialogComponent(this.dialog);
        break;

      case 'updateError':
        CustomeDialogUtils.openUpdateErrorDialogComponent(this.dialog);
        break;

      case 'emailNotFound':
        CustomeDialogUtils.openEmailNotFoundDialogComponent(this.dialog);
        break;

      default:
        break;
    }
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
    const user = new UserInformations(u.lName, u.fName, u.company, u.email, u.position, u.vehicle, false, token, this.utilsConfForm.ids);

    this.conferencesService.createUser(user).subscribe(data => {
      if (data.err) {
        CustomeDialogUtils.openAlreadyExistDialog(this.dialog, user.email);
      } else {
        console.log('Sending email confirmation');
        this.emailService.sendEmail(
          {
            templateName: 'tokenMail',
            data: {
              from: 'msia',
              to: user.email,
              templateOptions: {
                fName: user.fName,
                url: 'https://msia17conferences.com/dev/inscription-willem?' + this.encodeData({
                  userdata: btoa(JSON.stringify({
                    lName: user.lName,
                    fName: user.fName,
                    company: user.company,
                    email: user.email,
                    token: user.token,
                    conferences: user.conferences
                  }))
                })
              }
            }
          }).subscribe(mailRes => {
            console.log('attempt token mail ? ', mailRes);
            CustomeDialogUtils.openTokenSentDialog(this.dialog, user);
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
    console.log('https://msia17conferences.com/dev/inscription-willem?userdata=' + this.encodeData({
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

  fillUserInfoFormRemy() {
    this.userForm.setValue({
      email: 'remousses@gmail.com',
      fName: 'Remousses',
      lName: 'Argentin',
      company: 'CACF',
      position: 'Ingénieur Logiciel',
      vehicle: true,
    });
  }

  deleteRemousses() {
    const user = {
      email: 'remousses@gmail.com',
      fName: 'Remousses',
      lName: 'Argentin',
      company: 'CACF',
      position: 'Ingénieur Logiciel',
      vehicle: true,
      token: '',
      conferences: [],
      hasValidate: false
    };
    this.conferencesService.deleteUser(user).subscribe(data => {
      if (data.err) {
        CustomeDialogUtils.openAlreadyExistDialog(this.dialog, user.email);
      } else {

      }
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
