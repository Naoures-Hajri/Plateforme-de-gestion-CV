import { Model_cv } from "./model_cv";

export class Langue{
    constructor(
        public langue?: String,
        public niveau?: String,
        public cv?: Model_cv
        ){}
}