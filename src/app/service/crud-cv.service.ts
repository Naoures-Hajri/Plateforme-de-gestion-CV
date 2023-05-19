import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { Contact } from 'src/app/models/Contact';
import { Competence } from '../models/Competence';
import { Interet } from '../models/Interet';
import { Langue } from '../models/Langue';

@Injectable({
  providedIn: 'root'
})
export class CrudCVService {

  contactUrl="http://localhost:8081/contact"
  competenceUrl="http://localhost:8081/competence"
  interetUrl="http://localhost:8081/interet"
  langueUrl="http://localhost:8081/langue"
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
  return this.http.post<Langue[]>(this.langueUrl+"/createLangue",langues)
}
}
