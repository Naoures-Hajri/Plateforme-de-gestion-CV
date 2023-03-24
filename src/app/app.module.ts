import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CvImportComponent } from './cv-import/cv-import.component';
import { FileUpComponent } from './file-up/file-up.component';
import { FilePreviewComponent } from './file-preview/file-preview.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [
    AppComponent,
    CvImportComponent,
    FileUpComponent,
    FilePreviewComponent,
    
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
