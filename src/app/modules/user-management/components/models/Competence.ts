import { Model_cv } from "./model_cv";

export class Competence{
   constructor(
   public  competenceId?: String, 
   public competence?: String[],
   public cv?: Model_cv
   ){}
}