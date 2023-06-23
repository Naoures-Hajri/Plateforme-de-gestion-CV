import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css']
})
export class FilePreviewComponent implements OnInit {
  imgURL: any='assets/telechargement/model1.pdf';
  constructor(private router: Router, private http: HttpClient) { }

  async getFileFromURL(url: string): Promise<File> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], 'model1.pdf', { type: 'application/pdf' });
  }
  
  async sendToNodeJS(): Promise<void> {
    const file = await this.getFileFromURL(this.imgURL);
    
    const formData = new FormData();
    formData.append('file', file);
    
    this.http.post('http://localhost:8081/receiveFile', formData)
      .subscribe(
        (response) => {
          console.log('File sent successfully:', response);
          // Gérer la réponse du serveur selon vos besoins
        },
        (error) => {
          console.error('Error sending file:', error);
          // Gérer les erreurs qui se sont produites lors de l'envoi du fichier
        }
      );
    
    this.router.navigate(['/cvImport']);
  }
  
  ngOnInit(): void {
    console.log("pdf", this.imgURL);
  
  
  
  }
  



}
 
