import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MyResponse } from 'src/app/my-response';

@Component({
  selector: 'app-modele-cv',
  templateUrl: './modele-cv.component.html',
  styleUrls: ['./modele-cv.component.css']
})
export class ModeleCvComponent {
  contact: string[] = [];
  competences: string[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get<MyResponse>('http://localhost:8000/my-data').subscribe((response) => {
      this.contact = response.contact;
      this.competences = response.competences;
      console.log(this.contact)
    });
  }

}
