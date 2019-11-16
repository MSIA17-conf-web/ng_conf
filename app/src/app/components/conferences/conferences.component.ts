import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CdTheme } from 'src/app/interfaces/ConfDisplayData.model';

import DialogTemplate from 'src/app/interfaces/DialogTemplate.model';

import { ConferencesService } from 'src/app/services/conferences/conferences.service';
import { GenericDialogComponent } from '../dialogs/generic-dialog/generic-dialog.component';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
  cdThemeList: Array<CdTheme>;

  constructor(private conferencesService: ConferencesService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.conferencesService.getConfDisplayData().subscribe(res => {
      this.cdThemeList = res;
    }, err => {
      console.log('Error from APIs', err);
      this.dialog.open(GenericDialogComponent, {
        width: 'auto',
        data: DialogTemplate.modalTempates.internalServerError()
      });
    });
  }

  markdownChanged(mdLink) {
    return atob(mdLink);
  }
}
