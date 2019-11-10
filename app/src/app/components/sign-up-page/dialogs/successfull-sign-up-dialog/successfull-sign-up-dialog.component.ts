import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';


@Component({
  selector: 'app-successfull-sign-up-dialog',
  templateUrl: './successfull-sign-up-dialog.component.html',
  styleUrls: ['./successfull-sign-up-dialog.component.scss']
})
export class SuccessfullSignUpDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SuccessfullSignUpDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public user: UserInformations) { }

  ngOnInit() {
  }
}
