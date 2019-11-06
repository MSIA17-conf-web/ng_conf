import { Creneau } from './generic/Creneau.model';
import { Conference } from './generic/Conference.model';
import { Thematique } from './generic/Thematique.model';

export class CdConf extends Conference {

  public creneau: Creneau; // Array ?

  deserialize(input: any): this {
    Object.assign(this, input);

    this.creneau = new Creneau().deserialize(input.creneau);

    return this;
  }
}

export class CdTheme extends Thematique {
  public conferences: Array<CdConf>;

  deserialize(input: any): this {
    Object.assign(this, input);

    this.conferences = input.conferences.map(conf => new CdConf().deserialize(conf));

    return this;
  }
}
