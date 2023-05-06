import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {Observable} from 'rxjs'
import { Contact } from 'src/app/models/Contact';

@Injectable({
  providedIn: 'root'
})
export class CrudCVService {

  contactUrl="http://localhost:8081/contact"
  constructor(private http: HttpClient ) { }

  //***************************Contact */

 saveContact(contact:Contact):Observable<Contact>{
    return this.http.post<any>(this.contactUrl+"/createContact",contact)
  
 }
}
