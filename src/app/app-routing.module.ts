import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvImportComponent } from './components/cv-import/cv-import.component';
import { FilePreviewComponent } from './components/file-preview/file-preview.component';
import { FileUpComponent } from './components/file-up/file-up.component';
import { ModeleCvComponent } from './components/modele-cv/modele-cv.component';
import { CreateCVComponent } from './components/create-cv/create-cv.component';

const routes: Routes = [
  {path: 'cvImport', component: CvImportComponent},
  {path: 'fileUp', component: FileUpComponent},
  {path: 'filePreview', component: FilePreviewComponent},
  {path: 'modele_cv', component: ModeleCvComponent},
  {path: 'cv', component: CreateCVComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
