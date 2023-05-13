import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { Contact } from 'src/app/models/Contact';
import { Competence } from '../models/Competence';

@Injectable({
  providedIn: 'root'
})
export class CrudCVService {

  contactUrl="http://localhost:8081/contact"
  competenceUrl="http://localhost:8081/competence"
  constructor(private http: HttpClient ) { }

  //***************************Contact */

 saveContact(contact1:Contact):Observable<Contact>{
  
    return this.http.post<Contact>(this.contactUrl+"/createCont",contact1);
  
 }



 //*******************************Competence */
 saveCompetence(competence:Competence):Observable<Competence>{
  
  return this.http.post<Competence>(this.competenceUrl+"/createComp",competence);

}
}
