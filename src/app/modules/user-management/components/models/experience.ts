import { Model_cv } from "./model_cv";

export class Experience{
    experienceId?: String;
    dateDeb?: Date;
    dateFin?: Date;
    entreprise?: String;
    poste?: String;
    description?: String;
    cv?: Model_cv
}