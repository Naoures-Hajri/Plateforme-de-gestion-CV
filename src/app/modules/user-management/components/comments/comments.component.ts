import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from 'src/app/service/comment.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comment : any
  comments : any
  me : any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,  private dialogRef: MatDialogRef<CommentsComponent> , private userService : UserService , private commentService : CommentService) {
    console.log('data' , this.data)
   }

  ngOnInit(): void {
    this.userService.getUser().subscribe(res=>{
      
      this.me = res.user
      console.log('current user' , this.me);
      this.getComment()
    })
    
  }
  getComment(){
    this.commentService.getComment().subscribe(res=>{
      this.comments = res
      this.comments = this.comments.comment
      this.comments.map((i:any)=>{
        i.ago = this.timeAgo(i.createdAt)
      })
      if(this.me.role == "condidat"){
        this.comments = this.comments.filter((i:any)=>{
          return this.me._id == i.condidatId._id
        })
      }

      if(this.me.role == "recruteur"){
        this.comments = this.comments.filter((i:any)=>{
          return this.data._id == i.condidatId._id
        })
      }
     
      console.log(this.comments);
      
    })
  }

    timeAgo(date) {
    const currentDate = new Date();
    const messageDate = new Date(date);
    const timeDifference = Number(currentDate) - Number(messageDate);
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    if (days > 0) {
      return days + (days === 1 ? ' day ago' : ' days ago');
    } else if (hours > 0) {
      return hours + (hours === 1 ? ' hour ago' : ' hours ago');
    } else if (minutes > 0) {
      return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
    } else {
      return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');
    }
  }

  saveComment(){
    
    var obj = {
      comment : this.comment ,
      condidatId : this.data._id , 
      recId : this.me._id
    }
    console.log(obj);

    this.commentService.postComment(obj).subscribe(res=>{
      console.log(res);
      
    })
  }

}
