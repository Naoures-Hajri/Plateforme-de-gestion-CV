import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-file-up',
  templateUrl: './file-up.component.html',
  styleUrls: ['./file-up.component.css']
})
export class FileUpComponent implements OnInit{
  userFile: any
  imagePath: any
  imgURL: any
  url:any
  constructor(private toastr: ToastrService){}
  ngOnInit(): void {
  
  }
  onSelectFile(event: any){
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.userFile = file;
  
  
      var mimeType = event.target.files[0].type;
      
  
      var reader = new FileReader();
  
      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
        localStorage.setItem("my_Image",this.imgURL);
        this.toastr.success('File successfully uploaded!')
      };
    }
    
}

}
