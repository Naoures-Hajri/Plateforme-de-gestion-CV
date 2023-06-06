import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { Contact } from 'src/app/models/Contact';
import { Competence } from '../models/Competence';
import { Interet } from '../models/Interet';
import { Langue } from '../models/Langue';
import { Experience } from '../models/Experience';
import { Formation } from '../models/Formation';
import { Entete } from '../models/Entete';
import { Model_cv } from '../models/model_cv';

@Injectable({
  providedIn: 'root'
})
export class CrudCVService {

  contactUrl="http://localhost:8081/contact"
  competenceUrl="http://localhost:8081/competence"
  interetUrl="http://localhost:8081/interet"
  langueUrl="http://localhost:8081/langue"
  experienceUrl="http://localhost:8081/experience"
  formationUrl="http://localhost:8081/formation"
  enteteUrl="http://localhost:8081/entete"
  cvUrl="http://localhost:8081/cv"
  constructor(private http: HttpClient ) { }

  //***************************Contact */

 saveContact(contact1:Contact):Observable<Contact>{
  
    return this.http.post<Contact>(this.contactUrl+"/createCont",contact1);
  
 }



 //*******************************Competence */
 saveCompetence(competence:Competence):Observable<Competence>{
  
  return this.http.post<Competence>(this.competenceUrl+"/createComp",competence);

}





//********************************Interet */
saveInteret(interet:Interet):Observable<Interet>{
  return this.http.post<Interet>(this.interetUrl+"/createCentre",interet)
}








//**********************************Langue */
saveLangue(langues:Langue[]):Observable<Langue[]>{
  console.log('langues',langues)
  return this.http.post<Langue[]>(this.langueUrl+"/createLangue",langues)
}



//**********************************Experience */
saveExperience(experiences:Experience[]):Observable<Experience[]>{
  return this.http.post<Experience[]>(this.experienceUrl+"/createExperience",experiences)
}







//**********************************Formation */
saveFormation(formations:Formation[]):Observable<Formation[]>{
  return this.http.post<Formation[]>(this.formationUrl+"/createFormation",formations)
}





//**********************************Entete */
saveEntete(entete:Entete):Observable<Entete>{
  return this.http.post<Entete>(this.enteteUrl+"/createEntete",entete)
}


//**********************************CV */
saveCV(cvData: Model_cv): Observable<Model_cv> {
  return this.http.post<Model_cv>(this.cvUrl+"/createCV", cvData);
}
}
