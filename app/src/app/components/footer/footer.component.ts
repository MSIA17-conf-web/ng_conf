import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';

import { BottomSheetOverviewComponent } from 'src/app/components/bottom-sheet-overview/bottom-sheet-overview.component';

import { MobileService } from 'src/app/services/mobile/mobile.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public mobSvc: MobileService,
              private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
  }

  openBottomSheet() {
    this.bottomSheet.open(BottomSheetOverviewComponent);
  }
}
