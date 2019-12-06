import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { EmailService } from 'src/app/services/email/email.service';

@Component({
  selector: 'app-already-user-exist',
  templateUrl: './already-user-exist.component.html',
  styleUrls: ['./already-user-exist.component.scss']
})
export class AlreadyUserExistComponent implements OnInit {

  constructor(public emailService: EmailService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
}
