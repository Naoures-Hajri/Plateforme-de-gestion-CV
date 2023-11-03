import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CvService {
  contactUrl = "http://localhost:8081/contact"
  competenceUrl = "http://localhost:8081/competence"
  interetUrl = "http://localhost:8081/interet"
  langueUrl = "http://localhost:8081/langue"
  experienceUrl = "http://localhost:8081/experience"
  formationUrl = "http://localhost:8081/formation"
  enteteUrl = "http://localhost:8081/entete"
  cvUrl = "http://localhost:8081/cv"
  newCVUrl = "http://localhost:8081/update-pdf-cv"
  constructor(private http: HttpClient) { }
  saveCV(cvData: any): Observable<any> {
    return this.http.post<any>("http://localhost:8081/cv/createCV", cvData);
  }
  saveContact(contact1: any): Observable<any> {

    return this.http.post<any>(this.contactUrl + "/createCont", contact1);

  }

  getContactByID(contactId: string): Observable<any> {
    return this.http.get<any>(`${this.contactUrl}/getContact/${contactId}`);
  }

  getCvByIDUser(id: any): Observable<any> {
    return this.http.get<any>(`${this.cvUrl}/getCVUser/${id}`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete<any>(`${this.cvUrl}/delete/${id}`);
  }

  getEntiteById(id: any): Observable<any> {
    return this.http.get<any>(`${this.cvUrl}/entete/${id}`);
  }

  editEntiteById(id: any , data:any): Observable<any> {
    return this.http.put<any>(`${this.cvUrl}/entete/${id}` , data);
  }
  editContactById(id: any , data:any): Observable<any> {
    return this.http.put<any>(`${this.cvUrl}/contact/${id}` , data);
  }

  editCompetenceById(id: any , data:any): Observable<any> {
    return this.http.put<any>(`${this.cvUrl}/competence/${id}` , data);
  }

  updateImages(id:any , data:any)
  : Observable<any> {
      let API_URL = `${this.cvUrl}/image/${id}`;
      return this.http.post(API_URL , data)
  }

  editFormationById(id: any , data:any): Observable<any> {
    return this.http.put<any>(`${this.cvUrl}/formation/${id}` , data);
  }

  editExperienceById(id: any , data:any): Observable<any> {
    return this.http.put<any>(`${this.cvUrl}/experience/${id}` , data);
  }
  editLangueById(id: any , data:any): Observable<any> {
    return this.http.put<any>(`${this.cvUrl}/langue/${id}` , data);
  }
  
  editCvById(id: any , data:any): Observable<any> {
    return this.http.put<any>(`${this.cvUrl}/cv/${id}` , data);
  }

  //*******************************Competence */
  saveCompetence(competence: any): Observable<any> {

    return this.http.post<any>(this.competenceUrl + "/createComp", competence);

  }

  getCompetencetByID(competenceId: String): Observable<String[]> {
    return this.http.get<String[]>(`${this.competenceUrl}/getCompetence/${competenceId}`);
  }





  //********************************Interet */
  saveInteret(interet: any): Observable<any> {
    return this.http.post<any>(this.interetUrl + "/createCentre", interet)
  }








  //**********************************Langue */
  saveLangue(langues: any): Observable<any> {
    console.log('langues', langues)
    return this.http.post<any>(this.langueUrl + "/createLangue", langues)
  }



  //**********************************Experience */
  saveExperience(experiences: any[]): Observable<any[]> {
    return this.http.post<any[]>(this.experienceUrl + "/createExperience", experiences)
  }







  //**********************************Formation */
  saveFormation(formations: any[]): Observable<any[]> {
    return this.http.post<any[]>(this.formationUrl + "/createFormation", formations)
  }





  //**********************************Entete */
  saveEntete(entete: any): Observable<any> {
    return this.http.post<any>(this.enteteUrl + "/createEntete", entete)
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:8081/receiveFile', formData);
  }



  //**********************************CV */

  getCVByID(cvId: String): Observable<any> {
    return this.http.get<any>(`${this.cvUrl}/getCV/${cvId}`);
  }





}
