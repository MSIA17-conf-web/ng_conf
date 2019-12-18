import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MobileService } from 'src/app/services/mobile/mobile.service';
import { ConferencesService } from 'src/app/services/conferences/conferences.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { CdTheme } from 'src/app/interfaces/ConfDisplayData.model';
import { MatDialog } from '@angular/material';
import { GenericDialogComponent } from '../dialogs/generic-dialog/generic-dialog.component';
import DialogTemplate from 'src/app/interfaces/DialogTemplate.model';
import * as _ from 'lodash';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  homeTheme: Array<CdTheme>;
  lat = 48.903202;
  lng = 2.192958;

  constructor(public mobSvc: MobileService,
    private conferencesService: ConferencesService,
    private loaderService: LoaderService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.loaderService.setSpinnerState(true);

    this.conferencesService.getConfDisplayData().subscribe(res => {
      res.map(theme => { theme.conferences = _.sortBy(theme.conferences, conf => conf.confCrenId); });
      this.homeTheme = res;
      this.loaderService.setSpinnerState(false);
    }, err => {
      this.loaderService.setSpinnerState(false);
      console.log('Error from APIs', err);
      this.dialog.open(GenericDialogComponent, {
        width: 'auto',
        data: DialogTemplate.modalTempates.internalServerError()
      });
    });
  }

  ngAfterViewInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom.
    const map = L.map('map').setView([this.lat, this.lng], 20);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      noWrap: true,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    L.marker([this.lat, this.lng], { icon: myIcon }).bindPopup('CESI, 93 Boulevard de la Seine, 92000, Nanterre').addTo(map).openPopup();
  }

  public buildThemeImageUrl(id: number): string {
    let imgId = '';

    switch (id) {
      case 1:
        imgId = '1lYUdubON5lMgYXR0AAMV6iaLBFCvkhZR';
        break;
      case 2:
        imgId = '1UmY2Vk8tW_dB08fNmU_Fn43N-6afband';
        break;
      case 3:
        imgId = '1Dah_wK45B0770q7CLbXAzlMszSlMn5yW';
        break;

    }

    return 'https://drive.google.com/uc?export=view&id=' + imgId;
  }
}
