import { Interet } from "./Interet";
import { Competence } from "./Competence";
import { Contact } from "./Contact";


import { Langue } from "./Langue"
import { Experience } from "./Experience";
import { Formation } from "./Formation";
import { Entete } from "./Entete";


export class Model_cv{
    constructor(
    public titre: String,
    public entete: Entete,
    public contact: Contact,
    public formation: Formation,
    public experience: Experience,
    public competence: Competence,
    public langue: Langue,
    public centreInteret: Interet ){}
}