import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
              public router: Router) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
