import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';



@Component({
  selector: 'app-modele-cv',
  templateUrl: './modele-cv.component.html',
  styleUrls: ['./modele-cv.component.css']
})
export class ModeleCvComponent  {
  imgURL: any='assets/telechargement/model1.pdf';
  

  ngOnInit(): void {
    console.log("pdf", this.imgURL);
  
  
  
  }
}
