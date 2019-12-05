import { Component, OnInit } from '@angular/core';

import { MobileService } from 'src/app/services/mobile/mobile.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public mobSvc: MobileService) { }

  ngOnInit() {
  }

}
