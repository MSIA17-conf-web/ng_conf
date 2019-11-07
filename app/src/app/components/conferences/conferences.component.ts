import { Component, OnInit } from '@angular/core';

import { CdTheme } from 'src/app/interfaces/ConfDisplayData.model';

import { ConferencesService } from 'src/app/services/conferences/conferences.service';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
  cdThemeList: Array<CdTheme>;

  constructor(private conferencesService: ConferencesService) { }

  ngOnInit() {
    this.conferencesService.getConfDisplayData().subscribe(res => {
      this.cdThemeList = res;
    });
  }

  markdownChanged(mdLink) {
    return atob(mdLink);
  }
}
