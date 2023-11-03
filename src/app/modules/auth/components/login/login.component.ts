import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: any
  password: any
  message : any
  constructor(private authService : AuthService , private router : Router) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.login({email : this.email , password : this.password}).subscribe(res=>{
      console.log(res)
      window.sessionStorage.setItem('auth' , res.accessToken)

      if(res.role == 'admin'){
        this.router.navigateByUrl('/liste-demande')
      }else{
        this.router.navigateByUrl('/view-user')
      }
     
    },err=>{
      console.log(err)
      this.message = err.error.message
    })
  }

}
