import { Centre_interet } from "./centre_interet";
import { Competences } from "./competences";
import { contact } from "./contact";
import { Experience } from "./experience";
import { Formation } from "./formation";
import { Langue } from "./langue";

export class medel_cv{
    id?: Number;
    contact?: contact;
    formation?: Formation;
    experience?: Experience;
    competences?: Competences;
    langue?: Langue;
    centre_interet?: Centre_interet;  
}