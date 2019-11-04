import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]],
      userEmail: ['', [Validators.required, Validators.email, Validators.maxLength(100), Validators.minLength(2)]],
      emailMessage: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]]
    })
  }

  onSubmit() {
    const contactFormValue = this.contactForm.value;
    console.log(contactFormValue);
  }
}