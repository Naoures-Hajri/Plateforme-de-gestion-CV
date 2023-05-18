import { Interet } from "./Interet";
import { Competence } from "./Competence";
import { Contact } from "./Contact";
import { Experience } from "./experience";
import { Formation } from "./formation";
import { Langue } from "./Langue"

export class medel_cv{
    id?: Number;
    contact?: Contact;
    formation?: Formation;
    experience?: Experience;
    competences?: Competence;
    langue?: Langue;
    centre_interet?: Interet;  
}