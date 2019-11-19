import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailService } from 'src/app/services/email/email.service';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GenericDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public emailService: EmailService) { }
  ngOnInit() {
  }

}
