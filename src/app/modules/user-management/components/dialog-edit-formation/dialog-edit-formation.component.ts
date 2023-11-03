import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CvService } from 'src/app/service/cv.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dialog-edit-formation',
  templateUrl: './dialog-edit-formation.component.html',
  styleUrls: ['./dialog-edit-formation.component.scss']
})
export class DialogEditFormationComponent implements OnInit {
  formationForm = {
    diplome: null,
    etablissement: null,
    dateDeb: null,
    dateFin: null
  }
  formataion: any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private cvService: CvService, private userService: UserService, private dialogRef: MatDialogRef<DialogEditFormationComponent>) {
    console.log(this.data)
    this.formataion = this.data.formationId
    this.formataion.formation = this.formataion.formation.filter((i:any)=>{
      return i._id !== this.data._id
    })
    this.formationForm.dateDeb = new Date(this.data.dateDeb).toISOString().slice(0, 10);
    this.formationForm.dateFin = new Date(this.data.dateFin).toISOString().slice(0, 10);
    this.formationForm.diplome = this.data.diplome
    this.formationForm.etablissement = this.data.etablissement
    console.log(this.formataion);

  }

  ngOnInit(): void {
  }

  edit(){
    this.formataion.formation.push(this.formationForm)
    console.log(this.formataion);
    console.log(this.formataion)
    const obj = {
      formation : this.formataion.formation
    }
    this.cvService.editFormationById(this.formataion._id , obj).subscribe(res=>{
      console.log(res)
      this.dialogRef.close()
    })
  }
  closeDialog(){
    this.dialogRef.close()
  }
}
