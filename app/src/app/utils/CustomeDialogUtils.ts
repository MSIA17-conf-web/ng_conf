import { MatDialog } from '@angular/material';

import { SuccessfullSignUpDialogComponent } from '../components/sign-up-page/dialog/successfull-sign-up-dialog/successfull-sign-up-dialog.component';
import { AlreadyExistDialogComponent } from '../components/sign-up-page/dialog/already-exist-dialog/already-exist-dialog.component';
import { TokenSentDialogComponent } from '../components/sign-up-page/dialog/token-sent-dialog/token-sent-dialog.component';
import { TokenNotMatchDialogComponent } from '../components/sign-up-page/dialog/token-not-match-dialog/token-not-match-dialog.component';
import { UserNotFoundDialogComponent } from '../components/sign-up-page/dialog/user-not-found-dialog/user-not-found-dialog.component';
import { UpdateErrorDialogComponent } from '../components/sign-up-page/dialog/update-error-dialog/update-error-dialog.component';
import { EmailNotFoundDialogComponent } from '../components/sign-up-page/dialog/email-not-found-dialog/email-not-found-dialog.component';
import { InternalServerErrorDialogComponent } from 'src/app/components/dialogs/internal-server-error-dialog/internal-server-error-dialog.component';

import { UserInformations } from '../interfaces/generic/UserInformations.model'

export default class CustomeDialogUtils {
    static openTokenNotMatchDialogComponent(dialog: MatDialog): void {
        dialog.open(TokenNotMatchDialogComponent, {
          width: '500px'
        });
      }

      static openSuccessfullSignUpDialogComponent(dialog: MatDialog, user: UserInformations): void {
        dialog.open(SuccessfullSignUpDialogComponent, {
          width: '500px',
          data: user
        });
      }
    
      static openTokenSentDialog(dialog: MatDialog, user: UserInformations): void {
        dialog.open(TokenSentDialogComponent, {
          width: '500px',
          data: user
        });
      }
    
      static openAlreadyExistDialog(dialog: MatDialog, email: string): void {
        dialog.open(AlreadyExistDialogComponent, {
          width: '570px',
          data: email
        });
      }
    
      static openUserNotFoundDialogComponent(dialog: MatDialog): void {
        dialog.open(UserNotFoundDialogComponent, {
          width: '500px'
        });
      }
    
      static openUpdateErrorDialogComponent(dialog: MatDialog): void {
        dialog.open(UpdateErrorDialogComponent, {
          width: '500px'
        });
      }
    
      static openEmailNotFoundDialogComponent(dialog: MatDialog): void {
        dialog.open(EmailNotFoundDialogComponent, {
          width: '500px'
        });
      }
    
      static openInternalServerErrorDialogComponent(dialog: MatDialog) {
        dialog.open(InternalServerErrorDialogComponent, {
          width: '500px'
        });
      }
}
