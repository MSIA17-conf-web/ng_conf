import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-open-contact-response-dialog',
  templateUrl: './open-contact-response-dialog.component.html',
  styleUrls: ['./open-contact-response-dialog.component.scss']
})
export class OpenContactResponseDialogComponent implements OnInit {
  isEmailSend: boolean;
  emailData: string;

  constructor(public dialogRef: MatDialogRef<OpenContactResponseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.isEmailSend = this.data.isEmailSend;
    this.emailData = this.customizeEmailError(this.data.emailData);
  }

  private customizeEmailError(data) {
    if (!this.isEmailSend) {
      return 'mailto:msia17conferences@gmail.com?subject=' + data.lastName + ' ' + data.firstName + ' cherche à vous contacter'
         + '&body=' + data.messageEmail;
    }

    return null;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
