import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvImportComponent } from './cv-import/cv-import.component';
import { FilePreviewComponent } from './file-preview/file-preview.component';
import { FileUpComponent } from './file-up/file-up.component';

const routes: Routes = [
  {path: 'cvImport', component: CvImportComponent},
  {path: 'fileUp', component: FileUpComponent},
  {path: 'filePreview', component: FilePreviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
