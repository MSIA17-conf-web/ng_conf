import { Deserializable } from './deserializable.model';

export class Thematique implements Deserializable {
  themeName: string;
  themeShortDesc: string;
  themeDescription: string;
  themeMDlink: string;
  themeId: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
