import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { DialogAddUserComponent } from './components/dialog-add-user/dialog-add-user.component';
import { DialogEditUserComponent } from './components/dialog-edit-user/dialog-edit-user.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule} from '@angular/material/dialog';
import { DialogViewUserComponent } from './components/dialog-view-user/dialog-view-user.component';
import { MatRadioModule} from '@angular/material/radio';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { MatTooltipModule} from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularSplitModule } from 'angular-split';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { FormsModule } from '@angular/forms';
import { DemandeComponent } from './components/demande/demande.component';
import { FileUpComponent } from './components/file-up/file-up.component';
import { CvImportComponent } from './components/cv-import/cv-import.component';
import { CreateCvComponent } from './components/create-cv/create-cv.component';
import { EnteteComponent } from './components/entete/entete.component';
import { ContactComponent } from './components/contact/contact.component';
import { StepCreCVComponent } from './components/step-cre-cv/step-cre-cv.component';
import { Contact1Component } from './components/contact1/contact1.component';
import { CompetencesComponent } from './components/competences/competences.component';
import { Competence1Component } from './components/competence1/competence1.component';
import { InteretComponent } from './components//interet/interet.component';
import { HobbiesComponent } from './components/hobbies/hobbies.component';
import { FormationComponent } from './components/formation/formation.component';
import { Formation1Component } from './components/formation1/formation1.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { Experience1Component } from './components/experience1/experience1.component';
import { LangueComponent } from './components/langue/langue.component';
import { Langue1Component } from './components/langue1/langue1.component';
import { ModeleCvComponent } from './components/modele-cv/modele-cv.component';
import { Model2Component } from './components/modele-cv/model2/model2.component';
import { Model1Component } from './components/modele-cv/model1/model1.component';
import { EditProfilComponent } from './components/edit-profil/edit-profil.component';
import { MyCvDetailsComponent } from './components/my-cv-details/my-cv-details.component';
import { EditCvComponent } from './components/edit-cv/edit-cv.component';
import { AddEntretienComponent } from './components/add-entretien/add-entretien.component';
import { ListCondidatComponent } from './components/list-condidat/list-condidat.component';
import { CondidatCvComponent } from './components/condidat-cv/condidat-cv.component';
import { DialogEditFormationComponent } from './components/dialog-edit-formation/dialog-edit-formation.component';
import { DialogEditExperienceComponent } from './components/dialog-edit-experience/dialog-edit-experience.component';
import { CommentsComponent } from './components/comments/comments.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
@NgModule({
  declarations: [
    ListeUserComponent,
    LangueComponent,
    Langue1Component,
    DialogAddUserComponent,
    DialogEditUserComponent,
    DialogViewUserComponent,
    ViewUserComponent,
    InteretComponent,
    HobbiesComponent,
    FormationComponent,
    Formation1Component,
    ChangePasswordComponent,
    DemandeComponent,
    FileUpComponent,
    CvImportComponent, 
    StepCreCVComponent, 
    CreateCvComponent, EnteteComponent, ContactComponent,
    Contact1Component,
    CompetencesComponent,
    Competence1Component,
    ExperienceComponent,
    Experience1Component,
    ModeleCvComponent,
    Model2Component,
    Model1Component,
    EditProfilComponent,
    MyCvDetailsComponent,
    EditCvComponent,
    ListCondidatComponent,
    CondidatCvComponent,
    CommentsComponent,
    AddEntretienComponent,
    DashboardComponent,
    DialogEditFormationComponent,
    DialogEditExperienceComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule, 
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatCardModule,
    ReactiveFormsModule,
    AngularSplitModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule
    
  ]
})
export class UserManagementModule { }
