import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-up',
  templateUrl: './file-up.component.html',
  styleUrls: ['./file-up.component.css']
})
export class FileUpComponent implements OnInit{
 
  imgURL: any
  Contact: any[] = [];
  Competence: any[] = [];
  Interet: any[] = [];
  images: any
  constructor(private toastr: ToastrService,private http : HttpClient, private dialog: MatDialog, private router: Router){}
  ngOnInit(): void {
  
  }
  onSelectFile(event: any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file)
      this.images= file;
           var mimeType = event.target.files[0].type;
      
  
      var reader = new FileReader();
  
      this.images = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      localStorage.setItem("my_Image",this.imgURL);
    }}}

    onSubmit(){
      //construct formdata
      const formdata=new FormData();
      formdata.append('file',this.images);
      this.toastr.success('File successfully uploaded!');
      
      //post request to express backend
      this.http.post<any>("http://localhost:8000/api/upload/", formdata)
      .subscribe((response)=>{
       
      this.Contact=response.contact
      this.Competence=response.competences||response.compétences
      this.Interet=response.centre||response.hobbies
      let data= JSON.stringify(this.Contact)
      let competence= JSON.stringify(this.Competence)
      let interet=JSON.stringify(this.Interet)
      localStorage.setItem("contact",data);
      localStorage.setItem("competence",competence);
      localStorage.setItem("interet",interet)
      this.router.navigate(['/cv']);
      console.log('response receved is ', this.Contact);
      console.log('skills are ', this.Competence);
      console.log('hobbies are', this.Interet);
     },err =>{
      console.log(err)
     })

     
    }

    close(){
      this.dialog.closeAll();

    }
  }

  
