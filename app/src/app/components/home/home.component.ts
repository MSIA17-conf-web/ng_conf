import { Component, OnInit } from '@angular/core';
import { MobileService } from 'src/app/services/mobile/mobile.service';
import { ConferencesService } from 'src/app/services/conferences/conferences.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { CdTheme } from 'src/app/interfaces/ConfDisplayData.model';
import { MatDialog } from '@angular/material';
import { GenericDialogComponent } from '../dialogs/generic-dialog/generic-dialog.component';
import DialogTemplate from 'src/app/interfaces/DialogTemplate.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homeTheme: Array<CdTheme>;

  constructor(public mobSvc: MobileService,
              private conferencesService: ConferencesService,
              private loaderService: LoaderService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loaderService.setSpinnerState(true);

    this.conferencesService.getConfDisplayData().subscribe(res => {
      console.log('Home data', res);

      this.homeTheme = res;
      this.loaderService.setSpinnerState(false);
    }, err => {
      this.loaderService.setSpinnerState(false);
      console.log('Error from APIs', err);
      this.dialog.open(GenericDialogComponent, {
        width: 'auto',
        data: DialogTemplate.modalTempates.internalServerError()
      });
    });

  }

  public buildThemeImageUrl(id): string {
    let imgId = '';

    switch (id) {
      case 1:
        imgId = '1lYUdubON5lMgYXR0AAMV6iaLBFCvkhZR';
        break;
      case 2:
        imgId = '1UmY2Vk8tW_dB08fNmU_Fn43N-6afband';
        break;
      case 3:
        imgId = '1Dah_wK45B0770q7CLbXAzlMszSlMn5yW';
        break;

    }

    return 'https://drive.google.com/uc?export=view&id=' + imgId;
  }

  public getI(i, y) {
    console.log('iy ', i, y);

    return i + y;
  }
}
