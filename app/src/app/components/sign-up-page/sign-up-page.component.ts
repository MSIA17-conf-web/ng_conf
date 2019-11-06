import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ConferencesService } from 'src/app/services/conferences/conferences.service';
import { CfCreneau } from 'src/app/interfaces/ConfFormData.model';
@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  userForm: FormGroup;
  confForm: FormGroup = new FormGroup({});
  validatedUserFormValue: object = {};
  validatedConfFormValue: object = {};
  // mockCreneau: any;
  cfCreneau: Array<CfCreneau>;

  constructor(private formBuilder: FormBuilder, private conferencesService: ConferencesService) { }

  ngOnInit() {
    // this.mockCreneau = this.conferencesService.mockCreneau;
    this.initUserInfoForm();
    this.conferencesService.getConfFormData().subscribe(res => {
      this.cfCreneau = res;
      this.initConfForm();
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
    console.log(userFormValue);

  }

  onSubmitConf() {
    const confFormValue = this.confForm.value;
    this.validatedConfFormValue = this.confForm.value;
    console.log(confFormValue);
  }

  validateSignUp() {
    console.log(this.validatedUserFormValue, this.validatedConfFormValue);
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
}
