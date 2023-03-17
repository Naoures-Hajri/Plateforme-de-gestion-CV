import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css']
})
export class FilePreviewComponent implements OnInit {
  imgURL: any=localStorage.getItem('my_Image')?.toString();
  ngOnInit(): void {
    console.log(this.imgURL);
  }
  



}
 
