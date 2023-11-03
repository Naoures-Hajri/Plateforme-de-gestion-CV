import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog-view-user',
  templateUrl: './dialog-view-user.component.html',
  styleUrls: ['./dialog-view-user.component.scss']
})
export class DialogViewUserComponent implements OnInit {
  user : any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private userService : UserService , private dialogRef: MatDialogRef<DialogViewUserComponent>) {
    console.log("data",data); 
   }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  getCurrentUser(){
    this.userService.currentUser().subscribe(res=>{
      this.user = res.user
      console.log(this.user)
    })
  }

  acceptUser(){
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, accepte-le !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.acceptUser(this.data).subscribe(res=>{
          console.log(res)
          Swal.fire(
            'Accepté !',
            'Le recruteur a été accpeté.',
            'success'
          ).then(()=>{
            this.dialogRef.close();
          })
        },err=>{
          Swal.fire(
            'Erreur !',
            'Problème de serveur.',
            'error'
          ).then(()=>{
            this.dialogRef.close();
          })
        })
      }
    })
  }

  deleteUser(){
    Swal.fire({
      title: 'Êtes-vous sûr(e) ?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimez-le !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(this.data).subscribe(res=>{
          console.log(res)
          Swal.fire(
            'Supprimé !',
            'Le recruteur a été supprimé.',
            'success'
          ).then(()=>{
            this.dialogRef.close();
          })
        },err=>{
          Swal.fire(
            'Erreur !',
            'Problème de serveur.',
            'error'
          ).then(()=>{
            this.dialogRef.close();
          })
        })
      }
    })
    
  }

 

}
