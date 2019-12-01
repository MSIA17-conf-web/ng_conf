import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';

import { BottomSheetOverviewComponent } from './components/bottom-sheet-overview/bottom-sheet-overview.component';

import { MobileService } from './services/mobile/mobile.service';
import { LoaderService } from './services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  isMobile: boolean;

  constructor(public mobSvc: MobileService,
              public loaderService: LoaderService,
              private bottomSheet: MatBottomSheet,
              public router: Router) {}

  ngOnInit(): void {
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetOverviewComponent);
  }

  ngOnDestroy(): void {
  }
}
