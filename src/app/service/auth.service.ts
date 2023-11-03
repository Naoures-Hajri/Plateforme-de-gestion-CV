import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected basePath = environment.apiUrl;
  REST_API: string = this.basePath+'/auth';


  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    let API_URL = `${this.REST_API}/signup`;
    return this.http.post(API_URL, data)
  }

  login(data: any): Observable<any> {
    let API_URL = `${this.REST_API}/signin`;
    return this.http.post(API_URL, data)
  }

  validationCode(id : any , code : any): Observable<any>{
    let API_URL = `${this.REST_API}/code/${id}`;
    return this.http.post(API_URL, code)
  }

  forgetPassword(email : any): Observable<any>{
    let API_URL = `${this.REST_API}/forget`;
    return this.http.post(API_URL, email)
  }
   
}
