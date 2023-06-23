import { Component, EventEmitter, Output } from '@angular/core';
import { CrudCVService } from 'src/app/service/crud-cv.service';
import { NgToastService } from 'ng-angular-popup';
import { Formation } from 'src/app/models/Formation';
@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent {
  @Output() formationData: EventEmitter<String> = new EventEmitter<String>();  
  storedFormation: string[] = [];
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
      diplome: '',
      etablissement: ''
    };
  
    this.blocks.push(newBlock);
  }
  
  ngOnInit() {
    this.storedFormation = JSON.parse(localStorage.getItem('formation') || '[]');
    console.log('Stored Formation:', this.storedFormation);
  
    let linesProcessed = 0;
    let block: any = {};
    let blocks: any[] = [];
    
    for (let index = 0; index < this.storedFormation.length; index++) {
      const line = this.storedFormation[index].trim();
    
      if (/^\d+\s*-/.test(line)) {
        if (Object.keys(block).length > 0) {
          blocks.push(block);
        }
    
        const dateMatch = line.match(/^(\d+)\s*-\s*(.*)$/);
        if (dateMatch) {
          const dateDeb = new Date(dateMatch[1].trim());
          const dateFin = new Date(dateMatch[2].trim());
          block = {
            dateDeb: dateDeb,
            dateFin: dateFin,
            diplome: '',
            etablissement: '',
          };
          linesProcessed = 0; // Réinitialiser le compteur pour chaque nouveau bloc
        }
      } else {
        if (Object.keys(block).length === 0) {
          continue; // Ignorer les lignes avant le premier bloc
        }
    
        switch (linesProcessed) {
          case 0:
            block.diplome = line;
            break;
          case 1:
            block.etablissement = line;
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
  saveFormation() {
         // Vérifier si tous les champs sont remplis
         const areFieldsFilled = this.blocks.every(block =>
          block.dateDeb !== null &&
          block.dateFin !== null &&
          block.diplome !== null &&
          block.diplome.trim() !== '' && // Vérifier si le champ entreprise est vide ou composé uniquement d'espaces
          block.etablissement !== null &&
          block.etablissement.trim() !== ''  // Vérifier si le champ poste est vide ou composé uniquement d'espaces
         
        );
    if (!areFieldsFilled) {
      // Afficher un message d'erreur ou prendre une autre action appropriée
      console.log('Tous les champs doivent être remplis');
      this.toast.info({
        detail: 'Veuillez remplir les champs manquants',
        summary: 'Erreur'
      });
      return;
    }
    // Prepare the experience data to be saved
    const formations: Formation[] = this.blocks.map(block => ({
      dateDeb: block.dateDeb,
      dateFin: block.dateFin,
      diplome: block.diplome,
      etablissement: block.etablissement
    }));  
    this.service.saveFormation(formations).subscribe ((res: any) => {
      if (res && res._id) {
        console.log('Emitting _id:', res._id);
        this.formationData.emit(res._id);}
      setTimeout(() => {
        this.toast.success({
          detail: 'Formation ajoutée avec succès.',
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
