import { Component } from '@angular/core';
import { FormBuilder,FormArray, FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { Competence } from 'src/app/models/Competence';
import { CrudCVService } from 'src/app/service/crud-cv.service';

@Component({
  selector: 'app-competences',
  templateUrl: './competences.component.html',
  styleUrls: ['./competences.component.css']
})
export class CompetencesComponent {
  comp:[]=JSON.parse(localStorage.getItem('competence')||' ') 
  compForm:FormGroup;
  
  constructor( private fb: FormBuilder, private service: CrudCVService,private toast: NgToastService) { 
    this.compForm = this.fb.group({  
      competence: '',  
      newComp: this.fb.array([]),  
    });  
  }
  newComp() : FormArray {  
    return this.compForm.get("newComp") as FormArray  
  } 
  newCompetence(): FormGroup {  
    return this.fb.group({  
      
      compt: '',  
    })  
  }  
  delete(index:number){
    this.comp.splice(index,1)
  }
  deleteNew(index:number){
    this.newComp().removeAt(index)
  }
  ngOnInit() {
    this.compForm.patchValue({
      competence:[]=this.comp
    })
  }
 addItem(){
  
    this.newComp().push(this.newCompetence());  
  
  }
  saveCompetence(){
    let data = this.compForm.value;
    for (let index = 0; index < data.newComp.length; index++) {
      const element = data.newComp[index];
      data.competence.push(element.compt)
      
    }
   data.newComp=[]
    let competence1 = new Competence(data.competence);
    console.log(competence1)
    this.service.saveCompetence(competence1).subscribe(
      res => {
          
      console.log(res);
    
      setTimeout(() => {
        this.toast.success({ detail: 'Compétence ajouté avec succès.', summary: 'Succès' });
      }, 1000);
    },
    err => {
      console.error(err);
   
      this.toast.error({detail:'err msg !! ',
      summary:'Veuillez vérifier.'});
    }
  );
  }
}

