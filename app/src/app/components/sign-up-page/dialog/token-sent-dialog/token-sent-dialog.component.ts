import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';

@Component({
  selector: 'app-token-sent-dialog',
  templateUrl: './token-sent-dialog.component.html',
  styleUrls: ['./token-sent-dialog.component.scss']
})
export class TokenSentDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TokenSentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserInformations) { }

  ngOnInit() {
  }
}
