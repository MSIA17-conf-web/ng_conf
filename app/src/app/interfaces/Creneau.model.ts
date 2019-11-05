import { Conference } from "./Conferences.model";

export interface Creneau {
    crenName: string,
    description: string,
    startTime: string,
    endTime: string,
    activities: Array<Conference>
}