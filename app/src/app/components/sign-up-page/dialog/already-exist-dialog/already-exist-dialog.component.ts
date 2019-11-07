import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-already-exist-dialog',
  templateUrl: './already-exist-dialog.component.html',
  styleUrls: ['./already-exist-dialog.component.scss']
})
export class AlreadyExistDialogComponent {

  constructor(public dialogRef: MatDialogRef<AlreadyExistDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public email: string) { }

}
