import { Conference } from './Conferences.model';

export interface Creneau {
    crenId?: string;
    crenName: string;
    description: string;
    startTime: string;
    endTime: string;
    conferences: Array<Conference>;
}
