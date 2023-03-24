import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-file-up',
  templateUrl: './file-up.component.html',
  styleUrls: ['./file-up.component.css']
})
export class FileUpComponent implements OnInit{
 
  imgURL: any
 
  images: any
  constructor(private toastr: ToastrService,private http : HttpClient, private dialog: MatDialog){}
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
      this.http.post<any>("http://localhost:3000/file", formdata)
      .subscribe((response)=>{
      console.log('response receved is ', response);
       
     },err =>{
      console.log(err)
     })

     
    }

    close(){
      this.dialog.closeAll();

    }
  }

  
