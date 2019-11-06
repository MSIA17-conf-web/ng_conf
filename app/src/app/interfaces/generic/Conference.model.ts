import { Deserializable } from './deserializable.model';

export class Conference implements Deserializable {
  confId: number;
  confName: string;
  confShortDesc: string;
  confMDlink: string;
  confCrenId: number;
  confThemeId: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
