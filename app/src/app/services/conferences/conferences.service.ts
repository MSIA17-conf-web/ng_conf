import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CfConf, CfCreneau, CfTheme } from '../../interfaces/ConfFormData.model';
import { HttpClient } from '@angular/common/http';
import { Creneau } from 'src/app/interfaces/Creneau.model';
import { Conference } from 'src/app/interfaces/Conferences.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConferencesService {

  confFormDataSubject = new Subject<CfCreneau[]>();

  constructor(private httpClient: HttpClient) { }


  public getConfFormData(): Observable<CfCreneau[]> {
    return this.httpClient.post<CfCreneau[]>('https://msia17conferences.com:9010/api', {
      method: 'post',
      url: 'from-file',
      baseURL: 'http://postgre_api:9010',
      body: {
        fileName: 'confFormData',
        options: {}
      }
    }).pipe(
      map(data => {
        console.log(data);
        return data.map(cren => new CfCreneau().deserialize(cren));
      })
    );
  }
}
