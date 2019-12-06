import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CfCreneau } from 'src/app/interfaces/ConfFormData.model';
import { CdTheme } from 'src/app/interfaces/ConfDisplayData.model';
import { Conference } from 'src/app/interfaces/generic/Conference.model';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ConferencesService {

  constructor(private httpClient: HttpClient) { }

  public getConfFormData(): Observable<CfCreneau[]> {
    return this.httpClient.post<CfCreneau[]>('https://msia17conferences.com:9010/api', {
      method: 'GET',
      url: 'misc/conf-form-data',
      baseURL: environment.postgreAPIUrl,
      body: {}
    }).pipe(
      map(data => {
        console.log(data);
        return data.map(cren => new CfCreneau().deserialize(cren));
      })
    );
  }

  public getConfDisplayData(): Observable<CdTheme[]> {
    return this.httpClient.post<CdTheme[]>('https://msia17conferences.com:9010/api', {
      method: 'GET',
      url: 'misc/conf-display-data',
      baseURL: environment.postgreAPIUrl,
      body: {}
    }).pipe(
      map(data => {
        console.log(data);
        return data.map(cren => new CdTheme().deserialize(cren));
      })
    );
  }

  public getConfName(confId: number): Observable<Conference> {
    return this.httpClient.post<Conference>('https://msia17conferences.com:9010/api', {
      method: 'POST',
      url: 'misc/get-conf-name',
      baseURL: environment.postgreAPIUrl,
      body: {
        confId
      }
    }).pipe(data => data);
  }
}
