import { Model_cv } from "./model_cv";

export class Entete{
    constructor(
    public image?: String,
    public nom?: String,
    public prenom?: String,
    public profession?: String,
    public cv?: Model_cv
    ){}
}