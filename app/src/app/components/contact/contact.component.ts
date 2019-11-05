import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { OpenContactResponseDialogComponent } from './manage/open-contact-response-dialog/open-contact-response-dialog.component';

import { EmailService } from 'src/app/services/email/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private emailService: EmailService, public dialog: MatDialog) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.contactForm = this.formBuilder.group({
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      enterpriseName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      userEmail: ['', [Validators.required, Validators.email, Validators.minLength(2), Validators.maxLength(100)]],
      messageEmail: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]]
    });
  }

  onSubmit() {
    const contactFormValue = this.contactForm.value;
    this.emailService.sendContactEmail(contactFormValue)
      .then(res => this.openContactResponseDialog(res.result))
      .catch(err => {
        console.log(err);
        this.openContactResponseDialog(false);
      });
  }

  openContactResponseDialog(value) {
    console.log('openContactResponseDialog', value);
    
    const dialogRef = this.dialog.open(OpenContactResponseDialogComponent, {
      width: '300px',
      data: { send: value }
    });

    dialogRef.afterClosed().subscribe();
  }
}
