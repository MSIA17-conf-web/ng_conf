import { Conference } from './Conference.model';

export class UserInformations {
  idGuest?: number;
  lName: string;
  fName: string;
  company: string;
  email: string;
  position: string;
  vehicle: boolean;
  hasValidate: boolean;
  token: string;
  conferences: Array<number>;

  // public constructor(data?: Partial<UserInformations>) {
  //   Object.assign(this, data);
  // }

  constructor(lName: string,
              fName: string,
              company: string,
              email: string,
              position: string,
              vehicle: boolean,
              hasValidate: boolean,
              token: string,
              conferences: Array<number>) {
    this.lName = lName;
    this.fName = fName;
    this.company = company;
    this.email = email;
    this.position = position;
    this.vehicle = vehicle;
    this.hasValidate = hasValidate;
    this.token = token;
    this.conferences = conferences;
  }
}
