import { Interet } from "./Interet";
import { Competence } from "./Competence";
import { Contact } from "./Contact";
import { Schema, Document } from 'mongoose';

import { Langue } from "./Langue"
import { Experience } from "./Experience";
import { Formation } from "./Formation";
import { Entete } from "./Entete";


export class Model_cv{
    constructor(
    public titre?: String,
    public enteteId?: Entete,
    public contactId?: String,
    public formationId?: Formation,
    public experienceId?: Experience,
    public competenceId?: Competence,
    public langueId?: Langue,
    public centreInteretId?: Interet ){}
}