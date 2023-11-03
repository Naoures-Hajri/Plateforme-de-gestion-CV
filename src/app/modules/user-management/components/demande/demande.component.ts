import { Component, OnInit } from '@angular/core';
import { DialogViewUserComponent } from '../dialog-view-user/dialog-view-user.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.scss']
})
export class DemandeComponent implements OnInit {
  recruteur : any[]=[]
  lastName : string
  constructor(private dialog : MatDialog , private userService : UserService) { }

  ngOnInit(): void {
    this.getRecruteur()
  }

  openDialogViewUser(user : any) {
    const myDialg = this.dialog.open(DialogViewUserComponent, {
      data:user 
    });
    myDialg.afterClosed().subscribe(result => {
      this.getRecruteur()
    });
  }

  getRecruteur(){
    this.userService.getUsers('?role=recruteur').subscribe(res=>{
      this.recruteur = res
      console.log(this.recruteur)
    })
  } 
  rechercherRec(){
    if(this.lastName!=""){
    this.recruteur=this.recruteur.filter(res => {
      
      return res.lastName.toLowerCase().match(this.lastName.toLowerCase())
    })
  }else if (this.lastName==""){
    this.ngOnInit()
  }
}
}
