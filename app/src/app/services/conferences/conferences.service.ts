import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CfCreneau } from 'src/app/interfaces/ConfFormData.model';
import { CdTheme } from 'src/app/interfaces/ConfDisplayData.model';
import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';
import { Conference } from 'src/app/interfaces/generic/Conference.model';

@Injectable({
  providedIn: 'root'
})
export class ConferencesService {

  confFormDataSubject = new Subject<CfCreneau[]>();

  constructor(private httpClient: HttpClient) { }

  public getConfFormData(): Observable<CfCreneau[]> {
    return this.httpClient.post<CfCreneau[]>('https://msia17conferences.com:9010/api', {
      method: 'GET',
      url: 'misc/conf-form-data',
      baseURL: 'http://postgre_api:9010',
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
      baseURL: 'http://postgre_api:9010',
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
      baseURL: 'http://postgre_api:9010',
      body: {
        confId
      }
    }).pipe(data => data);
  }

  // Pas dans guest.service ?
  public createUser(user: UserInformations) {
    return  this.httpClient.post<any>('https://msia17conferences.com:9010/api', {
      method: 'POST',
      url: 'guests/create',
      baseURL: 'http://postgre_api:9010',
      body: user
    }).pipe(data => data);
  }

  // Pas dans guest.service ?
  public deleteUser(email: string) {
    return  this.httpClient.post<any>('https://msia17conferences.com:9010/api', {
      method: 'delete',
      url: 'guests/delete',
      baseURL: 'http://postgre_api:9010',
      body: {
        email
      }
    }).pipe(data => data);
  }

  public confirmUser(email: string, token: string) {
    return this.httpClient.post<any>('https://msia17conferences.com:9010/api', {
      method: 'POST',
      url: 'guests/verify-token',
      baseURL: 'http://postgre_api:9010',
      body: { email, token }
    }).pipe(data => data);
  }

  public updateUser(email: string, toke) {

  }

  public resendConfirmMail(email: string) {
    console.log(email);
    // TODO : Renvoyer mail de confirmation
  }
}
