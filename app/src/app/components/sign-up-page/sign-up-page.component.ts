import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Creneau } from "../../interfaces/Creneau.model";
import { Conference } from "../../interfaces/Conferences.model";
import { UserInformations } from "../../interfaces/UserInformations.model";
@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  userForm: FormGroup;
  confForm: FormGroup;
  validatedUserFormValue: object = {};
  validatedConfFormValue: object = {};

  mockConferences: Array<Conference[]> = [
    [
      {
        MDlink: "",
        name: "La surveillance de masse",
        shortDesc: "La surveillance de masse",
        theme:"Le numérique au quotidien"
      },
      {
        MDlink: "",
        name: "Les avantages d'une bonne gestion de projet",
        shortDesc: "Les avantages d'une bonne gestion de projet",
        theme:"Le métier de manager"
      },
      {
        MDlink: "",
        name: "La containerisation et la haute disponibilité",
        shortDesc: "La containerisation et la haute disponibilité",
        theme:"Les innovations techniques"
      }
    ],
    [
      {
        MDlink: "",
        name: "L'influence des réseaux sociaux",
        shortDesc: "L'influence des réseaux sociaux",
        theme:"Le numérique au quotidien"
      },
      {
        MDlink: "",
        name: "L'évolution du management dans le temps",
        shortDesc: "L'évolution du management dans le temps",
        theme:"Le métier de manager"
      },
      {
        MDlink: "",
        name: "L'impact écologique du numérique",
        shortDesc: "L'impact écologique du numérique",
        theme:"Les innovations techniques"
      }
    ],
    [
      {
        MDlink: "",
        name: "L'intelligence artificielle au quotidien",
        shortDesc: "L'intelligence artificielle au quotidien",
        theme:"Le numérique au quotidien"
      },
      {
        MDlink: "",
        name: "La business intelligence",
        shortDesc: "La business intelligence",
        theme:"Le métier de manager"
      },
      {
        MDlink: "",
        name: "L'authentification et ses limites",
        shortDesc: "L'authentification et ses limites",
        theme:"Les innovations techniques"
      }
    ]
  ];

  mockCreneau: Array<Creneau> = [
    {
      crenId: "creneau1",
      crenName: "Creneau 1",
      description: "Creneau Matin",
      startTime: "11:00",
      endTime: "12:00",
      conferences: this.mockConferences[0]
    },
    {
      crenId: "creneau2",
      crenName: "Creneau 2",
      description: "Creneau AM 1",
      startTime: "14:00",
      endTime: "15:00",
      conferences: this.mockConferences[1]
    },
    {
      crenId: "creneau3",
      crenName: "Creneau 3",
      description: "Creneau AM 2",
      startTime: "15:00",
      endTime: "16:00",
      conferences: this.mockConferences[2]
    }
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initUserInfoForm();
    this.initConfForm();
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
      this.mockCreneau.forEach(creneau => {
        this.confForm.addControl(creneau.crenId, this.formBuilder.control(null, [Validators.required]));
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

    Object.keys(confFormValue).forEach(key => {
      console.log(this.mockCreneau.find(cren => cren.crenId === key).conferences[confFormValue[key]].name);
    });
  }

  validateSignUp() {
    console.log(this.validatedUserFormValue, this.validatedConfFormValue);
  }

  fillUserInfoForm() {
    this.userForm.setValue({
      email : 'willineito@gmail.com',
      fName : 'Willem',
      lName : 'Houm',
      company : 'General Electrics',
      position : 'Apprenti Architecte Solution',
      vehicle : true,
    });
  }
}
