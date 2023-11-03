import { Competence } from "./Competence";
import { Contact } from "./Contact";
import { Entete } from "./Entete";
import { Experience } from "./Experience";
import { Formation } from "./Formation";
import { Interet } from "./Interet";
import { Langue } from "./Langue";

export class CVData {
    constructor(
      public contact?: Contact,
      public entete?: Entete,
      public competence?: Competence,
      public langue?: Langue,
      public centreInteret?: Interet,
      public formation?: Formation[],
      public experience?: Experience[],
    ) {}
}