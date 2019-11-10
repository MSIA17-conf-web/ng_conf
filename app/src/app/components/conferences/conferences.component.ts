import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CdTheme } from 'src/app/interfaces/ConfDisplayData.model';

import CustomeDialogUtils from 'src/app/utils/CustomeDialogUtils';

import { ConferencesService } from 'src/app/services/conferences/conferences.service';

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
      CustomeDialogUtils.openInternalServerErrorDialogComponent(this.dialog);
    });
  }

  markdownChanged(mdLink) {
    return atob(mdLink);
  }
}
