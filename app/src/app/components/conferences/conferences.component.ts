import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CdTheme } from 'src/app/interfaces/ConfDisplayData.model';

import DialogTemplate from 'src/app/interfaces/DialogTemplate.model';

import { ConferencesService } from 'src/app/services/conferences/conferences.service';
import { GenericDialogComponent } from '../dialogs/generic-dialog/generic-dialog.component';
import { MobileService } from 'src/app/services/mobile/mobile.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit, AfterViewInit {
  cdThemeList: Array<CdTheme>;

  constructor(private conferencesService: ConferencesService,
              public mobSvc: MobileService,
              public dialog: MatDialog,
              public loaderService: LoaderService,
              private cdRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.loaderService.setSpinnerState(true);

    this.conferencesService.getConfDisplayData().subscribe(res => {
      this.loaderService.setSpinnerState(false);
      console.log(res);

      this.cdThemeList = res;
    }, err => {
      this.loaderService.setSpinnerState(false);
      console.log('Error from APIs', err);
      this.dialog.open(GenericDialogComponent, {
        width: 'auto',
        data: DialogTemplate.modalTempates.internalServerError()
      });
    });
  }

  ngAfterViewInit() {

}

  markdownChanged(mdLink: string) {
    return atob(mdLink);
  }
}
