import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { EditProfilComponent } from '../edit-profil/edit-profil.component';
import { CvService } from 'src/app/service/cv.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  me : any
  logo : any
  myCv:any
  myCvs:any
  constructor(private userService : UserService , private dialog : MatDialog , private cvService : CvService) { 
   
  }

  ngOnInit(): void {
    this.getCurrentUser()
   
  }

  getCvByIdUser(){

    
    this.cvService.getCvByIDUser(this.me._id).subscribe(res=>{
      this.myCvs = res
      this.myCvs.reverse()
      this.myCv = this.myCvs[0]
      console.log(res);
      
    })
  }

  getCurrentUser(){
    this.userService.currentUser().subscribe(res=>{
      this.me = res.user
      console.log("user",this.me)
      this.getCvByIdUser()
    })
  }

  uploadFile(event: Event): void {
    event.stopPropagation();
    if (event.target['files'] && event.target['files'].length > 0) {
      [this.logo] = event.target['files'];

      this.sendLogo();
    }
  }
  sendLogo(): void {
    const data: FormData = new FormData();
    data.append(`picture`, this.logo , this.logo.name);
    this.userService.updateAvatar(this.me._id , data).subscribe(res=>{
      
      console.log(this.me)
 

    })


  }
  onFileSelected(data){
  }

  openDialogEditUser(data:any) {
    console.log(data)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data
    this.dialog.open(EditProfilComponent, dialogConfig);
  }


  /*** Animation Task Number ***/
  taskcount:number=0; 
  taskcountstop:any = setInterval(()=>{
    this.taskcount++;
    if(this.taskcount == 145)
    {
      clearInterval(this.taskcountstop);
    }
  },10)
  /******/
  processed:number=0; 
  processedstop:any = setInterval(()=>{
    this.processed++;
    if(this.processed == 75)
    {
      clearInterval(this.processedstop);
    }
  },10)
  /******/
  completed:number=0; 
  completedstop:any = setInterval(()=>{
    this.completed++;
    if(this.completed == 70)
    {
      clearInterval(this.completedstop);
    }
  },10)

}
