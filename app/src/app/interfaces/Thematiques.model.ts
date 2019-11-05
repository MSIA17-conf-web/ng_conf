import { Conference } from "./Conferences.model";

export interface Thematiques {
  themeId?: string;
  name: string;
  shortDesc: string;
  description: string;
  MDlink: string;
  conferences: Array<Conference>;
}
