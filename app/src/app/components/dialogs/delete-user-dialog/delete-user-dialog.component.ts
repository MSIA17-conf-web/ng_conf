import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';

import { GuestsService } from 'src/app/services/guests/guests.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

import { GenericDialogComponent } from 'src/app/components/dialogs/generic-dialog/generic-dialog.component';
import DialogTemplate from 'src/app/interfaces/DialogTemplate.model';


@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent implements OnInit {

  constructor(private guestsService: GuestsService,
              public dialog: MatDialog,
              public dialogRef: MatDialogRef<DeleteUserDialogComponent>,
              public loaderService: LoaderService,
              @Inject(MAT_DIALOG_DATA) public user: UserInformations) { }

  ngOnInit() {
  }

  deleteUser() {
    this.loaderService.setSpinnerState(true);

    this.guestsService.deleteUser(this.user.email).subscribe(verifResult => {
      this.loaderService.setSpinnerState(false);
      if (!verifResult.success) {
        console.log('Erreur lors de la désincription');
        this.dialog.open(GenericDialogComponent, {
          width: 'auto',
          data: DialogTemplate.modalTempates.deleteUserError(this.user)
        });
      } else {
        console.log('Désincription réussie');
        this.dialog.open(GenericDialogComponent, {
          width: 'auto',
          data: DialogTemplate.modalTempates.deleteUserSuccess(this.user)
        });
      }

      this.dialogRef.close();
    });
  }
}
