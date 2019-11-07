import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ConferencesService } from 'src/app/services/conferences/conferences.service';
import { CfCreneau } from 'src/app/interfaces/ConfFormData.model';
import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';
import { MatDialog } from '@angular/material';
import { AlreadyExistDialogComponent } from './dialog/already-exist-dialog/already-exist-dialog.component';

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
              public dialog: MatDialog
    ) { }

  ngOnInit() {
    // this.mockCreneau = this.conferencesService.mockCreneau;
    this.initUserInfoForm();
    this.conferencesService.getConfFormData().subscribe(res => {
      this.cfCreneau = res;
      this.initConfForm();
    });
  }

  openAlreadyExistDialog(email): void {
    const dialogRef = this.dialog.open(AlreadyExistDialogComponent, {
      width: "570px",
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
    console.log(this.userForm);
  }

  initConfForm() {
    this.confForm = this.formBuilder.group({});
    this.cfCreneau.forEach(creneau => {
      this.confForm.addControl(creneau.crenId.toString(), this.formBuilder.control(null, [Validators.required]));
    });
    console.log(this.confForm);
  }

  onSubmitUserInfo() {
    const userFormValue = this.userForm.value;
    this.validatedUserFormValue = this.userForm.value;
    this.utilsUserForm.keys = Object.keys(this.validatedUserFormValue);
    console.log(userFormValue);

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
    console.log(confFormValue, this.utilsConfForm);
  }

  validateSignUp() {
    console.log(this.validatedUserFormValue, this.validatedConfFormValue);
    const u = this.validatedUserFormValue;
    this.conferencesService.createUser(new UserInformations(
      u.lName,
      u.fName,
      u.company,
      u.email,
      u.position,
      u.vehicle,
      false,
      '',
      this.utilsConfForm.ids
    )).subscribe(data => {
      console.log(data);
      if (data.err) {
        this.openAlreadyExistDialog(u.email);
      }
    });
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
}
