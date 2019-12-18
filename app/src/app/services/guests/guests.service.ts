import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {

  constructor(private httpClient: HttpClient) { }

  // Pas dans guest.service ?
  createUser(user: UserInformations) {
    return  this.httpClient.post<any>('https://msia17conferences.com/api', {
      method: 'POST',
      url: 'guests/create',
      baseURL: environment.postgreAPIUrl,
      body: user
    }).pipe(data => data);
  }

  // Pas dans guest.service ?
  deleteUser(email: string) {
    return  this.httpClient.post<any>('https://msia17conferences.com/api', {
      method: 'delete',
      url: 'guests/delete',
      baseURL: environment.postgreAPIUrl,
      body: {
        email
      }
    }).pipe(data => data);
  }

  confirmUser(email: string, token: string) {
    return this.httpClient.post<any>('https://msia17conferences.com/api', {
      method: 'POST',
      url: 'guests/verify-token',
      baseURL: environment.postgreAPIUrl,
      body: { email, token }
    }).pipe(data => data);
  }

  updateUser(user: UserInformations) {
    return this.httpClient.post<any>('https://msia17conferences.com/api', {
      method: 'PUT',
      url: 'guests/update',
      baseURL: environment.postgreAPIUrl,
      body: user
    }).pipe(data => data);
  }

  getOneUser(email: string) {
    return this.httpClient.post<any>('https://msia17conferences.com/api', {
      method: 'POST',
      url: 'guests/get-one',
      baseURL: environment.postgreAPIUrl,
      body: {
        email
      }
    }).pipe(data => data);
  }
}
