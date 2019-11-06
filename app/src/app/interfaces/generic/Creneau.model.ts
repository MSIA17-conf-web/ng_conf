import { Deserializable } from './deserializable.model';

export class Creneau implements Deserializable {
  crenId: number;
  crenName: string;
  crenDesc: string;
  crenStartTime: string;
  crenEndTime: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
