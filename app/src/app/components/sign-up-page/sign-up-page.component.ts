import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { ConferencesService } from 'src/app/services/conferences/conferences.service';
import { EmailService } from 'src/app/services/email/email.service';

import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';
import { CfCreneau } from 'src/app/interfaces/ConfFormData.model';
import { GenericDialogComponent } from '../dialogs/generic-dialog/generic-dialog.component';
import DialogTemplate from 'src/app/interfaces/DialogTemplate.model';
import { DeleteUserDialogComponent } from '../dialogs/delete-user-dialog/delete-user-dialog.component';

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
  cfCreneau: Array<CfCreneau>;
  isUpdating = false;

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
    }, err => {
      console.log('Error from APIs', err);
      this.dialog.open(GenericDialogComponent, {
        width: 'auto',
        data: DialogTemplate.modalTempates.internalServerError()
      });
    });
    this.ngRoute.queryParams.subscribe(event => {
      this.checkURI(event);
    });
  }

  private checkURI(event: any) {
    const userdata = event.userdata;

    if (userdata) {
      let user;
      try {
        user = JSON.parse(atob(userdata));
      } catch (e) {
        console.log('La clé utilisée est erronnée', userdata);
        console.log('JSON parse exeption : ', e);
        this.dialog.open(GenericDialogComponent, {
          width: 'auto',
          data: DialogTemplate.modalTempates.tokenNotMatch(user)
        });
        return;
      }

      if (user.email) {
        if (event.checkToken) {
          console.log('checkToken', user);
          this.checkToken(userdata, user);
        } else if (event.update) {
          this.isUpdating = true;
          this.updateUser();
        } else if (event.delete) {
          this.dialog.open(DeleteUserDialogComponent, {
            width: 'auto',
            data: (user)
          });
        }
      }
    }
  }

  private checkToken(userdata: any, user: UserInformations) {
    if (user.token) {
      // Conf name in QRCode with/ getAllConfName
      Promise.all(this.getAllConfName(user)).then(allConfName => {
        console.log('Retrieving all conference names for ' + user.email + ' user');
        this.conferencesService.confirmUser(user.email, user.token).subscribe(verifResult => {
          if (!verifResult.success) {
            this.handleErrorDialog(verifResult.type, user);
          } else {
            console.log('successfully registred');
            this.emailService.sendEmail(
              {
                templateName: 'successfullSignUpMail',
                data: {
                  userdata,
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
                this.dialog.open(GenericDialogComponent, {
                  width: 'auto',
                  data: DialogTemplate.modalTempates.successful(user)
                });
              }, err => {
                console.log('Error from APIs during token checks', err);
                this.dialog.open(GenericDialogComponent, {
                  width: 'auto',
                  data: DialogTemplate.modalTempates.internalServerError(user)
                });
              });
          }
        });
      }).catch(err => {
        console.log('Error when calling getAllConfName : ', err);
      });
    }
  }

  // Eviter pb de email déjà existant si on fait la maj
  // et on pourra pas faire la maj si lee user change d'adresse mail,
  private updateUserData() {

  }

  private getAllConfName(user: UserInformations): any[] {

    console.log('getAllConfName');
    return user.conferences.map((confId) => {
      return new Promise((resolve, reject) => {
        this.conferencesService.getConfName(confId).subscribe(conference => {

          console.log('confName AAAAAAAAAAAAAAAAAAAAAAAAAAAA', conference);
          resolve(conference.confName);
        }, err => {
          console.log('Error from APIs', err);
          this.dialog.open(GenericDialogComponent, {
            width: 'auto',
            data: DialogTemplate.modalTempates.internalServerError(user)
          });
        });
      });
    });
  }

  handleErrorDialog(verifResultType: string, user: UserInformations) {
    switch (verifResultType) {
      case 'alreadyRegistered':
        this.dialog.open(GenericDialogComponent, {
          width: 'auto',
          data: DialogTemplate.modalTempates.userAlreadyExist(user)
        });
        break;

      case 'userNotFoundAfterTokenValidation':
        this.dialog.open(GenericDialogComponent, {
          width: 'auto',
          data: DialogTemplate.modalTempates.userNotFound(user)
        });
        break;
      case 'tokenNotMatch':
        this.dialog.open(GenericDialogComponent, {
          width: 'auto',
          data: DialogTemplate.modalTempates.tokenNotMatch(user)
        });
        break;

      case 'updateError':
        this.dialog.open(GenericDialogComponent, {
          width: 'auto',
          data: DialogTemplate.modalTempates.updateError(user)
        });
        break;

      case 'emailNotFound':
        this.dialog.open(GenericDialogComponent, {
          width: 'auto',
          data: DialogTemplate.modalTempates.userNotFound(user)
        });
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
    // Mettre un message d'erreur si l'utilisateur choisi partout "Aucune" ?
    console.log('Conf form values', confFormValue, this.utilsConfForm);
  }

  validateSignUp() {
    // console.log(this.validatedUserFormValue, this.validatedConfFormValue);
    const u = this.validatedUserFormValue;
    const token = this.generateToken(16);
    const user = new UserInformations(u.lName, u.fName, u.company, u.email, u.position, u.vehicle, false, token, this.utilsConfForm.ids);
    console.log(user);

    this.conferencesService.createUser(user).subscribe(data => {
      if (data.err) {
        this.dialog.open(GenericDialogComponent, {
          width: 'auto',
          data: DialogTemplate.modalTempates.userAlreadyExist(user)
        });
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
                url: 'https://msia17conferences.com/dev/inscription?' + this.encodeData({
                  userdata: btoa(JSON.stringify({
                    lName: user.lName,
                    fName: user.fName,
                    company: user.company,
                    email: user.email,
                    token: user.token,
                    conferences: user.conferences
                  })),
                  checkToken: true
                })
              }
            }
          }).subscribe(mailRes => {
            console.log('attempt token mail ? ', mailRes);
            this.dialog.open(GenericDialogComponent, {
              width: 'auto',
              data: DialogTemplate.modalTempates.tokenSent(user)
            });
          }, err => {
            console.log('Error from APIs', err);
            this.dialog.open(GenericDialogComponent, {
              width: 'auto',
              data: DialogTemplate.modalTempates.internalServerError(user)
            });
          });
      }
    }, err => {
      console.log('Error from APIs', err);
      this.dialog.open(GenericDialogComponent, {
        width: 'auto',
        data: DialogTemplate.modalTempates.internalServerError(user)
      });
    });
  }

  reset(stepper: any) {
    stepper.reset();
    Object.keys(this.userForm.controls).forEach(key => {
      this.userForm.get(key).setErrors(null) ;
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
    console.log('https://msia17conferences.com/dev/inscription?userdata=' + this.encodeData({
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
  testModal() {
    console.log('Testing modal');
    this.dialog.open(GenericDialogComponent, {
      width: 'auto',
      data: DialogTemplate.modalTempates.tokenNotMatch({
        fName: 'ALT236',
        email: 'a@e.f'
      })
    });
  }

  isNone(conf) {
    return conf === '-1';
  }

  private dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2);
  }

  private generateToken(len) {
    const arr = new Uint8Array((len || 40) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join('');
  }

  private encodeData(data) {
    return Object.keys(data).map(key => {
      return [key, data[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }
}
