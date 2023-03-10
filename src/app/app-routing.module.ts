import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CvImportComponent } from './cv-import/cv-import.component';

const routes: Routes = [
  {path: 'cvImport', component: CvImportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
