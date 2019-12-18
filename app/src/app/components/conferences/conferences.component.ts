import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CdTheme } from 'src/app/interfaces/ConfDisplayData.model';

import DialogTemplate from 'src/app/interfaces/DialogTemplate.model';

import { ConferencesService } from 'src/app/services/conferences/conferences.service';
import { GenericDialogComponent } from '../dialogs/generic-dialog/generic-dialog.component';
import { MobileService } from 'src/app/services/mobile/mobile.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
  cdThemeList: Array<CdTheme>;

  constructor(private conferencesService: ConferencesService,
    public mobSvc: MobileService,
    public dialog: MatDialog,
    private loaderService: LoaderService) { }

  ngOnInit() {
    console.log('Récupération des données des conférences');
    this.loaderService.setSpinnerState(true);

    this.conferencesService.getConfDisplayData().subscribe(res => {
      this.loaderService.setSpinnerState(false);
      res.map(theme => { theme.conferences = _.sortBy(theme.conferences, conf => conf.confCrenId); });

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

  markdownChanged(mdLink: string) {
    return decodeURIComponent(atob(mdLink).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
