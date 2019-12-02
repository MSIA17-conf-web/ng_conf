import { Component, OnInit } from '@angular/core';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottom-sheet-overview',
  templateUrl: './bottom-sheet-overview.component.html',
  styleUrls: ['./bottom-sheet-overview.component.scss']
})
export class BottomSheetOverviewComponent implements OnInit {
  icons: [
    {
      img: 'CESI_logo.png',
      link: 'https://paris.cesi.fr/',
      size: '30px'
    },
    {
      img: 'Facebook.png',
      link: 'https://www.facebook.com/campuscesiidf/',
      size: '24px'
    },
    {
      img: 'Linkedin.png',
      link: 'https://www.linkedin.com/company/groupe-cesi/',
      size: '30px'
    }
  ];

  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit() {
  }
}
