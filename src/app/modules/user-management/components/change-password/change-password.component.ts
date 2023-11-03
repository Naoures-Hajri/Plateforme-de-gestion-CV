import { Component,Inject, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
class Password {
  oldPassword : any ; 
  newPassword : any ;
  repeatPassword : any ; 
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  password =new Password()
  constructor(@Inject(MAT_DIALOG_DATA)private data: any,private userService : UserService ,  private router : Router) { }

  ngOnInit(): void {
  }

  changePassword(){
    console.log(this.password)
    this.userService.changePassword(this.password).subscribe(res=>{
      var textMessage = res
      Swal.fire(
        `${textMessage.message}`,
        'aller à la page de acceuil',
        'success'
      ).then(()=>{
        
        this.router.navigateByUrl('')
      })
    })
  }

}
