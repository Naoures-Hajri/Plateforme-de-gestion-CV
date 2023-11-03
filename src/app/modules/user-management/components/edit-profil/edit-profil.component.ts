import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/modules/models/user';
import { UserService } from 'src/app/service/user.service';


@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit {
myCv: any
  constructor(@Inject(MAT_DIALOG_DATA)
  private data: any , private userService : UserService) { }
  user = new User()
  ngOnInit(): void {
    this.user = this.data
  }

  edit(){
    console.log(this.user)
    var obj = {
      email : this.user.email,
      firstName : this.user.firstName,
      lastName : this.user.lastName,
      phone : this.user.phone,
    }
    this.userService.updateUser(obj , this.user._id).subscribe(res=>{
      console.log(res);
      
    })
  }

}
