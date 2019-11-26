import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';

import { GuestsService } from 'src/app/services/guests/guests.service';
import { ConferencesService } from 'src/app/services/conferences/conferences.service';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient,
              private guestsService: GuestsService,
              private conferencesService: ConferencesService) { }

  sendEmail(options) {
    // console.log(options.data);

    return this.httpClient.post<any>('https://msia17conferences.com:9010/api', {
      method: 'POST',
      url: 'sendEmail',
      baseURL: 'http://email_api:9010',
      body: options
    });
  }
  sendContactEmail(values): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>('https://msia17conferences.com:9010/api', {
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
          if (res.err) {
            reject(res.err);
          }
          resolve(res);
        }, err => {
          console.log('Error from APIs', err);
          reject(err);
        });
    });
  }

  resendConfirmMail(email: string) {
    this.guestsService.getOneUser(email).subscribe(verifResult => {
      if (!verifResult.success) {
        console.log('error', verifResult.err || verifResult.data.errors);
        return;
      }

      const user = verifResult.data;

      Promise.all(this.getAllConfName(user)).then(allConfName => {
        console.log('Retrieving all conference names for ' + user.email + ' user');

        const userdata = btoa(JSON.stringify({
          lName: user.lName,
          fName: user.fName,
          company: user.company,
          email: user.email,
          position: user.position,
          vehicle: user.vehicle,
          token: user.token,
          conferences: user.conferences
        }));

        this.httpClient.post<any>('https://msia17conferences.com:9010/api', {
          method: 'POST',
          url: 'sendEmail',
          baseURL: 'http://email_api:9010',
          body: {
          templateName: 'successfullSignUpMail',
          data: {
            userdata,
            from: 'msia',
            to: user.email,
            templateOptions: {
              lName: user.lName,
              fName: user.fName,
              company: user.company,
              conferences: allConfName
            }
          }
          }
        }).subscribe();

      }).catch(err => {
        console.log('Error when calling getAllConfName in email service : ', err);
      });
    });
  }

  getAllConfName(user: UserInformations) {
    return user.conferences.map((confId) => {
      return new Promise((resolve, reject) => {
        this.conferencesService.getConfName(confId).subscribe(conference => {
          resolve(conference.confName);
        }, err => {
          console.log('Error from APIs', err);
        });
      });
    });
  }
}
