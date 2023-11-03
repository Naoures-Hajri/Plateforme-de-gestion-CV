import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { DemandeComponent } from './components/demande/demande.component';
import { FileUpComponent } from './components/file-up/file-up.component';
import { CvImportComponent } from './components/cv-import/cv-import.component';
import { CreateCvComponent } from './components/create-cv/create-cv.component';
import { StepCreCVComponent } from './components/step-cre-cv/step-cre-cv.component';
import { ModeleCvComponent } from './components/modele-cv/modele-cv.component';
import { Model2Component } from './components/modele-cv/model2/model2.component';
import { Model1Component } from './components/modele-cv/model1/model1.component';
import { MyCvDetailsComponent } from './components/my-cv-details/my-cv-details.component';
import { EditCvComponent } from './components/edit-cv/edit-cv.component';
import { ListCondidatComponent } from './components/list-condidat/list-condidat.component';
import { CondidatCvComponent } from './components/condidat-cv/condidat-cv.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
const routes: Routes = [
  { path: 'liste-user', component: ListeUserComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'view-user', component: ViewUserComponent },
  { path: 'liste-demande', component: DemandeComponent },
  { path: 'fileUp', component: FileUpComponent },
  {path: 'cvImport', component: CvImportComponent},
  {path: 'cv', component: CreateCvComponent},
  {path: 'stepCV', component: StepCreCVComponent},
  {path: 'model2', component: Model2Component},
  {path: 'model1', component: Model1Component},
  {path: 'my-cv', component: MyCvDetailsComponent},
  {path: 'condidat-cv/:id', component: CondidatCvComponent},
  {path: 'list-condidat', component: ListCondidatComponent},
  {path: 'edit-cv', component: EditCvComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'modele_cv/:id', component: ModeleCvComponent},
  { path: '', redirectTo: 'view-user', pathMatch: 'full' },
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class UserManagementRoutingModule { }