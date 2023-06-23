import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CvImportComponent } from './components/cv-import/cv-import.component';
import { FileUpComponent } from './components/file-up/file-up.component';
import { FilePreviewComponent } from './components/file-preview/file-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { NgToastModule } from 'ng-angular-popup';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxSvgModule } from 'ngx-svg';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ModeleCvComponent } from './components/modele-cv/modele-cv.component';
import { CreateCVComponent } from './components/create-cv/create-cv.component';
import { CompetencesComponent } from './components/competences/competences.component';
import { ContactComponent } from './components/contact/contact.component';
import { InteretComponent } from './components/interet/interet.component';
import { LangueComponent } from './components/langue/langue.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FormationComponent } from './components/formation/formation.component';
import { EnteteComponent } from './components/entete/entete.component';

@NgModule({
  declarations: [
    AppComponent,
    CvImportComponent,
    FileUpComponent,
    FilePreviewComponent,
    ModeleCvComponent,
    CreateCVComponent,
    CompetencesComponent,
    ContactComponent,
    InteretComponent,
    LangueComponent,
    ExperienceComponent,
    FormationComponent,
    EnteteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgToastModule,
    NgxSvgModule,
    NgxExtendedPdfViewerModule,
    Ng2TelInputModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
