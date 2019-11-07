import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CfCreneau } from 'src/app/interfaces/ConfFormData.model';
import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';

@Injectable({
  providedIn: 'root'
})
export class ConferencesService {

  confFormDataSubject = new Subject<CfCreneau[]>();

  constructor(private httpClient: HttpClient) { }


  public getConfFormData(): Observable<CfCreneau[]> {
    return this.httpClient.post<CfCreneau[]>('https://msia17conferences.com:9010/api', {
      method: 'get',
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

  public createUser(user: UserInformations) {
    return  this.httpClient.post<any>('https://msia17conferences.com:9010/api', {
      method: 'post',
      url: 'guests/create',
      baseURL: 'http://postgre_api:9010',
      body: user
    }).pipe(data => {
      return data;
    });
  }
}
