import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http : HttpClient) { }

  postComment(data : any){
    return this.http.post('http://localhost:8081/comment/creat' , data)
  }

  getComment(){
    return this.http.get('http://localhost:8081/comment/all')
  }
}
