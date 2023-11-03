import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CvService } from 'src/app/service/cv.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dialog-edit-experience',
  templateUrl: './dialog-edit-experience.component.html',
  styleUrls: ['./dialog-edit-experience.component.scss']
})
export class DialogEditExperienceComponent implements OnInit {
  expForm = {
  
    entreprise : null ,
    poste :null , 
    dateDeb : null,
    dateFin : null,
    description : null 
  }
  experience: any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private cvService: CvService, private userService: UserService, private dialogRef: MatDialogRef<DialogEditExperienceComponent>) {
    console.log(this.data)
    this.experience = this.data.exp
    this.experience.experience = this.experience.experience.filter((i:any)=>{
      return i._id !== this.data._id
    })
    this.expForm.dateDeb = new Date(this.data.dateDeb).toISOString().slice(0, 10);
    this.expForm.dateFin = new Date(this.data.dateFin).toISOString().slice(0, 10);
    this.expForm.entreprise = this.data.entreprise
    this.expForm.poste = this.data.poste
    this.expForm.description = this.data.description
    console.log(this.experience);

  }

  ngOnInit(): void {
  }
  edit(){
    this.experience.experience.push(this.expForm)
    console.log(this.experience);
    console.log(this.experience)
    const obj = {
      experience : this.experience.experience
    }
    this.cvService.editExperienceById(this.experience._id , obj).subscribe(res=>{
      console.log(res)
      this.dialogRef.close()
    })
  }
  closeDialog(){
    this.dialogRef.close()
  }
}
