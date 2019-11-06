import { Conference } from './Conferences.model';
import { Thematiques } from './Thematiques.model';
import { Deserializable } from './deserializable.model';

export class CfTheme implements Deserializable {
  public themeName: string;
  public themeShortDesc: string;
  public themeDescription: string;
  public themeMDlink: string;
  public themeId: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}

export class CfConf implements Deserializable {
  public confName: string;
  public confShortDesc: string;
  public confMDlink: string;
  public confCrenId: string;
  public confThemeId: string;
  public confId: string;
  public theme: CfTheme;

  deserialize(input: any): this {
    Object.assign(this, input);

    this.theme = new CfTheme().deserialize(input.theme);

    return this;
  }
}

export class CfCreneau implements Deserializable {
  public crenId: string;
  public crenName: string;
  public crenDesc: string;
  public crenStartTime: string;
  public crenEndTime: string;
  public conferences: Array<CfConf>;

  deserialize(input: any): this {
    Object.assign(this, input);

    this.conferences = input.conferences.map(conf => new CfConf().deserialize(conf));

    return this;
  }
}
