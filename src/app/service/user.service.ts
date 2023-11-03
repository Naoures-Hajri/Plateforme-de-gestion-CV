import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    protected basePath = environment.apiUrl;
    REST_API: string = this.basePath + '/user';

    constructor(private http: HttpClient) { }

    currentUser(): Observable<any> {
        let API_URL = `${this.REST_API}/`;
        return this.http.get(API_URL)
    }

    updateAvatar(id:any , data:any)
    : Observable<any> {
        let API_URL = `${this.REST_API}/avatar/${id}`;
        return this.http.post(API_URL , data)
    }

    updateUser(data:any , id:any)
    : Observable<any> {
        let API_URL = `${this.REST_API}/${id}`;
        console.log(API_URL);
        
        return this.http.put(API_URL , data)
    }

    getUser(): Observable<any> {
        let API_URL = `${this.REST_API}/`;
        return this.http.get(API_URL)
    }

    getUsers(condition : any): Observable<any> {
        let API_URL = `${this.REST_API}s/${condition}`;
        return this.http.get(API_URL)
    }

    changePassword(data:any): Observable<any> {
        let API_URL = `${this.REST_API}/change-password`;
        return this.http.post(API_URL , data)
    }

    acceptUser(data:any): Observable<any> {
        let API_URL = `${this.REST_API}/accept`;
        return this.http.post(API_URL , data)
    }

    deleteUser(data:any): Observable<any> {
        let API_URL = `${this.REST_API}/delete`;
        return this.http.post(API_URL , data)
    }
}
