import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { SignUpPageComponent } from 'src/app/components/sign-up-page/sign-up-page.component';
import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss']
})
export class UpdateUserDialogComponent implements OnInit {

  constructor(private signUpPage: SignUpPageComponent,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: UserInformations) { }

  ngOnInit() {
  }

  initFormValues() {
    this.signUpPage.setIsUpdating(true);
    this.signUpPage.initFormValues(this.user);
  }
}
