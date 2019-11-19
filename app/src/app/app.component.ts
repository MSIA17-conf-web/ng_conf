import { Component, OnDestroy, OnInit } from '@angular/core';
import { MobileService } from './services/mobile/mobile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {

  isMobile: boolean;

  constructor(public mobSvc: MobileService) {}

  public ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  // shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
