import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {
  id : any
  code : any
  constructor(private route : ActivatedRoute , private router : Router , private authService : AuthService) {
    this.id = this.route.snapshot.params['id']
   }

  ngOnInit(): void {
  }

  validationCode(){
    this.authService.validationCode(this.id , {code : this.code}).subscribe(res=>{
      console.log('validationCode response 200' , res)
      var textMessage = res
      Swal.fire(
        `${textMessage.message}`,
        'aller à la page de connexion',
        'success'
      ).then(()=>{
        var url = 'auth/login'
        this.router.navigateByUrl(url)
      })
    })
  }

}
