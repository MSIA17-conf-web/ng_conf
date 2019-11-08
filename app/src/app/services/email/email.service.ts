import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) { }

  sendEmail(options) {
    return this.httpClient.post<any>('https://msia17conferences.com:9010/api', {
      method: 'POST',
      url: 'sendEmail',
      baseURL: 'http://email_api:9010',
      body: options
    });
  }
  sendContactEmail(values): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('sendContactEmail', values);

      this.httpClient
        .post('https://msia17conferences.com:9010/api', {
          method: 'POST',
          url: 'sendContactEmail',
          baseURL: 'http://email_api:9010',
          // headers: {
          //   'Access-Control-Allow-Origin': '*',
          //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
          // },
          body: {
            lastName: values.lastName,
            firstName: values.firstName,
            enterpriseName: values.enterpriseName,
            userEmail: values.userEmail,
            messageEmail: values.messageEmail
          }
        }).subscribe(res => {
          console.log('Response from APIs', res);
          resolve(res);
        }, err => {
          console.log('Error from APIs', err);
          reject(err);
        });
    });
  }
}
