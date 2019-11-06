import { Conference } from './Conference.model';

export interface UserInformations {
  lName: string;
  fName: string;
  company: string;
  email: string;
  position: string;
  vehicle: boolean;
  idGuest: number;
  hasValidate: boolean;
  token: string;
  conferences: Array<Conference>;
}
