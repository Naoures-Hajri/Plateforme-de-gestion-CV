import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  email:any
  constructor(private authService : AuthService , private router : Router) { }

  ngOnInit(): void {
  }

  forgetPassword(){
    this.authService.forgetPassword({email : this.email}).subscribe(res=>{
      console.log(res)
      var textMessage = res
      Swal.fire(
        `${textMessage.message}`,
        'aller à la boite email pour récupirer votre mot de passe',
        'success'
      ).then(()=>{
        
        this.router.navigateByUrl('auth/login')
      })
    },err=>{
      console.log(err)
    })
  }

}
