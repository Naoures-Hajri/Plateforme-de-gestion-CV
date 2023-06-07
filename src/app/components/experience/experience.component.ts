import { Component, EventEmitter, Output } from '@angular/core';


import { NgToastService } from 'ng-angular-popup';
import { Experience } from 'src/app/models/Experience';
import { CrudCVService } from 'src/app/service/crud-cv.service';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  @Output() experienceData: EventEmitter<String> = new EventEmitter<String>();  
  storedExperience: string[] = [];
  blocks: any[] = [];
  block: any = {};
constructor(private service: CrudCVService, private toast: NgToastService){}

  delete(index: number) {
    this.blocks.splice(index, 1);
  }
  addNewBloc() {
    const newBlock = {
      dateDeb: '',
      dateFin: '',
      entreprise: '',
      poste: '',
      description: ''
    };
  
    this.blocks.push(newBlock);
  }
  
  ngOnInit() {
    this.storedExperience = JSON.parse(localStorage.getItem('experience') || '[]');
    console.log('Stored Experience:', this.storedExperience);
  
    let linesProcessed = 0;
    let block: any = {};
    let blocks: any[] = [];
    
    for (let index = 0; index < this.storedExperience.length; index++) {
      const line = this.storedExperience[index].trim();
    
      if (line.startsWith('Stage') || line.startsWith('Projet')) {
        if (Object.keys(block).length > 0) {
          blocks.push(block);
        }
    
        block = {
          dateDeb: null,
          dateFin: null,
          entreprise: '',
          poste: line,
          region: '',
          description: []
        };
        linesProcessed = 0; // Réinitialiser le compteur pour chaque nouveau bloc
      } else {
        if (Object.keys(block).length === 0) {
          continue; // Ignorer les lignes avant le premier bloc
        }
    
        switch (linesProcessed) {
          case 0:
            const dateMatch = line.match(/^(\w+\s+\d{4})\s+-\s+(\w+\s+\d{4})$/);
            if (dateMatch) {
              block.dateDeb = new Date(dateMatch[1]);
              block.dateFin = new Date(dateMatch[2]);
            }
            break;
          default:
            block.description.push(line);
            break;
        }
    
        linesProcessed++;
      }
    }
    
    if (Object.keys(block).length > 0) {
      blocks.push(block);
    }
    
    console.log('Blocks:', blocks);
    this.blocks = blocks;
  }
  saveExperience() {
      // Vérifier si tous les champs sont remplis
      const areFieldsFilled = this.blocks.every(block =>
        block.dateDeb !== null &&
        block.dateFin !== null &&
        block.entreprise !== null &&
        block.poste !== null &&
        block.description.length > 0
      );
  if (!areFieldsFilled) {
    // Afficher un message d'erreur ou prendre une autre action appropriée
    console.log('Tous les champs doivent être remplis');
    this.toast.error({
      detail: 'Veuillez remplir les champs manquants',
      summary: 'Erreur'
    });
    return;
  }
    // Prepare the experience data to be saved
    const experiences: Experience[] = this.blocks.map(block => ({
      dateDeb: block.dateDeb,
      dateFin: block.dateFin,
      entreprise: block.entreprise,
      poste: block.poste,
      description: block.description
    }));  
    this.service.saveExperience(experiences).subscribe ( (res: any) => {
      if (res && res._id) {
        console.log('Emitting _id:', res._id);
        this.experienceData.emit(res._id);}
      setTimeout(() => {
        this.toast.success({
          detail: 'Experience ajoutée avec succès.',
          summary: 'Succès'
        });
      }, 1000);
    },
    err => {
      console.error(err);
      this.toast.error({
        detail: 'Veuillez vérifier.',
        summary: 'Erreur'
      });
    }
  );
  }
  updateDate(value: string) {
    this.block.dateDeb = new Date(value);
  }
  
}
