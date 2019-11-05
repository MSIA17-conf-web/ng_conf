import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-open-contact-response-dialog',
  templateUrl: './open-contact-response-dialog.component.html',
  styleUrls: ['./open-contact-response-dialog.component.scss']
})
export class OpenContactResponseDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OpenContactResponseDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

