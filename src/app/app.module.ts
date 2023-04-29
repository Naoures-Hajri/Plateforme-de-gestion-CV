import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CvImportComponent } from './components/cv-import/cv-import.component';
import { FileUpComponent } from './components/file-up/file-up.component';
import { FilePreviewComponent } from './components/file-preview/file-preview.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
import { ModeleCvComponent } from './components/modele-cv/modele-cv.component';
import { CreateCVComponent } from './components/create-cv/create-cv.component';
@NgModule({
  declarations: [
    AppComponent,
    CvImportComponent,
    FileUpComponent,
    FilePreviewComponent,
    ModeleCvComponent,
    CreateCVComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PdfViewerModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    ToastrModule.forRoot(),// ToastrModule added
    BrowserAnimationsModule // required animations module
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[FileUpComponent]
})
export class AppModule { }
