import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommentsComponent } from '../comments/comments.component';
import { CvService } from 'src/app/service/cv.service';

@Component({
  selector: 'app-list-condidat',
  templateUrl: './list-condidat.component.html',
  styleUrls: ['./list-condidat.component.scss']
})
export class ListCondidatComponent implements OnInit {
  condidats: any
  recherche: any
  comp: any
  me: any
  constructor(private userService: UserService, private router: Router, private dialog: MatDialog, private cvService: CvService) {
    this.userService.currentUser().subscribe(res => {
      this.me = res
      this.me = this.me.user
      console.log(this.me);

    })
  }

  ngOnInit(): void {

    this.getAllUsers()

  }

  filterCondidat() {
    if (this.comp) {
      this.condidats = this.condidats.filter((item: any) => {
        console.log(this.comp , item.competence);
        for (var i = 0 ; i< item.competence.length ; i++){
          if(item.competence[i]==this.comp){
            console.log(item.competence[i]);
            
          }
        }
      })
    }
    if(this.recherche){
      this.condidats = this.condidats.filter((i: any) => {
        console.log(this.recherche, i.firstName, this.recherche.toLowerCase().includes(i.firstName.toLowerCase()))
        return i.firstName.toLowerCase().includes(this.recherche.toLowerCase()) || i.lastName.toLowerCase().includes(this.recherche.toLowerCase())
      })
    }
  }
  reset() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.userService.getUsers('?role=condidat').subscribe(res => {
      console.log(res)
      this.condidats = res
      if (this.me?.role == "condidat") {
        this.condidats = this.condidats.filter((item: any) => {
          item._id == this.me._id
        })
      }

      this.condidats.map(item => {
        this.cvService.getCvByIDUser(item._id).subscribe(resCv => {
          console.log("--------------------", resCv)
          item.competence = resCv[resCv.length - 1].competence.competence
          item.profession = resCv[resCv.length - 1].entete.profession
        })
      })

    })
  }

  voirCv(item: any) {
    var url = "condidat-cv/" + item._id
    this.router.navigateByUrl(url)
  }

  openComments(data: any) {
    console.log(data)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data
    this.dialog.open(CommentsComponent, dialogConfig);
  }

}
