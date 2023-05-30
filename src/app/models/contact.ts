import { Model_cv } from "./model_cv";

export class Contact{
    constructor(
    public tel?: String,
    public mail?: String,
    public adresse?: String,
    public cv?: Model_cv
    ){}
}