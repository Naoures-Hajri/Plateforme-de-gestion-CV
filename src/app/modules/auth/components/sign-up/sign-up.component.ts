import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modules/models/user';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  user = new User()

  ngOnInit(): void {
  }

  register() {
    console.log("this is user before send request", this.user)
    this.authService.register(this.user).subscribe(res => {
      console.log('register response 200', res)
      var textMessage = res
      if (textMessage.role == 'condidat') {
        Swal.fire(
          `${textMessage.message}`,
          'aller à la page de validation email',
          'success'
        ).then(() => {
          var url = 'auth/code/' + textMessage.user._id
          this.router.navigateByUrl(url)
        }
        )
      } else {
        Swal.fire(
          `${textMessage.message}`,
          'aller à la page de connexion',
          'success'
        ).then(() => {
          var url = 'auth/login'
          this.router.navigateByUrl(url)
        }
        )
      }

    })
  }

}
