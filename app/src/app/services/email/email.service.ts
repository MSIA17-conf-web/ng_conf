import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserInformations } from 'src/app/interfaces/generic/UserInformations.model';

import { GuestsService } from 'src/app/services/guests/guests.service';
import { ConferencesService } from 'src/app/services/conferences/conferences.service';
import { environment } from '../../../environments/environment';
import { LoaderService } from 'src/app/services/loader/loader.service';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient,
              private guestsService: GuestsService,
              private conferencesService: ConferencesService,
              private loaderService: LoaderService) { }

  sendEmail(options: any) {
    return this.httpClient.post<any>('https://msia17conferences.com:9010/api', {
      method: 'POST',
      url: 'sendEmail',
      baseURL: 'http://email_api:9010',
      body: options
    });
  }
  sendContactEmail(values: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post<any>('https://msia17conferences.com:9010/api', {
          method: 'POST',
          url: 'sendEmail',
          baseURL: 'http://email_api:9010',
          body: {
            templateName: 'contactMail',
            data: {
              from: values.userEmail,
              to: 'msia',
              templateOptions: {
                lName: values.lastName,
                fName: values.firstName,
                company: values.enterpriseName,
                messageEmail: values.messageEmail
              }
            }
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
    this.loaderService.setSpinnerState(true);

    this.guestsService.getOneUser(email).subscribe(verifResult => {
      if (!verifResult.success) {
        console.log('error', verifResult.err || verifResult.data.errors);
        this.loaderService.setSpinnerState(false);
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
        }).subscribe(res => {
          console.log('Response from APIs', res);
          this.loaderService.setSpinnerState(false);
        }, err => {
          console.log('Error from APIs', err);
          this.loaderService.setSpinnerState(false);
        });

      }).catch(err => {
        console.log('Error when calling getAllConfName in email service : ', err);
      });
    });
  }

  resendTokenMail(email: string, ) {
    console.log('resendTokenMail');
    this.loaderService.setSpinnerState(true);

    this.guestsService.getOneUser(email).subscribe(verifResult => {
      if (!verifResult.success) {
        console.log('error', verifResult.err || verifResult.data.errors);
        return;
      }
      // Suppimer traitement en trop : getAllconf
      const user = verifResult.data;
      const route = environment.production ? '' : '/dev';

      this.httpClient.post<any>('https://msia17conferences.com:9010/api', {
        method: 'POST',
        url: 'sendEmail',
        baseURL: 'http://email_api:9010',
        body: {
          templateName: 'tokenMail',
          data: {
            from: 'msia',
            to: user.email,
            templateOptions: {
              fName: user.fName,
              url: 'https://msia17conferences.com' + route + '/inscription?' + this.encodeData({
                  userdata: btoa(JSON.stringify({
                    lName: user.lName,
                    fName: user.fName,
                    company: user.company,
                    email: user.email,
                    position: user.position,
                    vehicle: user.vehicle,
                    token: user.token,
                    conferences: user.conferences
                  })),
                  checkToken: true
                })
            }
          }
        }
      }).subscribe(res => {
        console.log('Response from APIs', res);
        this.loaderService.setSpinnerState(false);
      }, err => {
        console.log('Error from APIs', err);
        this.loaderService.setSpinnerState(false);
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

  private encodeData(data) {
    return Object.keys(data).map(key => {
      return [key, data[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }
}
