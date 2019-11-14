import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';

import { ConferencesService } from 'src/app/services/conferences/conferences.service';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {

  constructor(private conferencesService: ConferencesService, public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserInformations) { }

  ngOnInit() {
  }

  deleteUser() {
    this.conferencesService.deleteUser(this.user.email).subscribe(verifResult => {
      if (!verifResult.success) {
        console.log("Erreur lors de la désincription");
        // modal error
      } else {
        console.log("Désincription réussie");
        // modal success
      }

      this.dialogRef.close();
    });
  }
}
