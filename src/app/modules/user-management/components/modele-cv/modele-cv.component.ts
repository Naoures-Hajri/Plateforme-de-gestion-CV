import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CvService } from 'src/app/service/cv.service';
// import { CrudCVService } from 'src/app/service/crud-cv.service';
import { jsPDF } from "jspdf"
import html2canvas from 'html2canvas';
// import { Contact } from 'src/app/models/Contact';
// import { CVData } from 'src/app/models/cvData';
class Contact {
  constructor(
    public contactId?: string,
    public tel?: String,
    public mail?: String,
    public adresse?: String,
    public cv?: any
  ) {}
}
@Component({
  selector: 'app-modele-cv',
  templateUrl: './modele-cv.component.html',
  styleUrls: ['./modele-cv.component.scss']
})
export class ModeleCvComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id');
  cvData?: any | undefined;
  contactData?: Contact;

  constructor(private route: ActivatedRoute, private cvService: CvService) { }

  ngOnInit(): void {
    // Get the cvId from the route parameters
    const cvId = this.route.snapshot.paramMap.get('id');
    if (cvId) {
      // Call the CVService to fetch the complete CV data by its ID
      this.cvService.getCVByID(cvId).subscribe(
        (cvData: any) => {
          // Assign the fetched CV data to the cvData property
          this.cvData = cvData;
          console.log('CV Data:', this.cvData);
        },
        (error) => {
          console.error('Error retrieving CV data:', error);
        }
      );
    }
  }
  generatePdfmodelone() {


    const op = {
      background: 'white',
      scale: 3
    }
    var div = document.getElementById("modelone")
    console.log(div)
    setTimeout(() => {

      html2canvas(div, op).then(async canvas => {
        const contentDataURL = await canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4');
        var width = await pdf.internal.pageSize.getWidth();
        var height = await canvas.height * width / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
        pdf.save('output.pdf');
        localStorage.removeItem('commande')
      });



    }, 0);
  }
  generatePdfmodeltwo() {

    this.cvService.editCvById(this.id , {model : 2 }).subscribe(res=>{
      console.log(res)
    })
    const op = {
      background: 'white',
      scale: 3
    }
    var div = document.getElementById("modeltwo")
    console.log(div)
    setTimeout(() => {

      html2canvas(div, op).then(async canvas => {
        const contentDataURL = await canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4');
        var width = await pdf.internal.pageSize.getWidth();
        var height = await canvas.height * width / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
        pdf.save('output.pdf');
        localStorage.removeItem('commande')
      });



    }, 0);
  }
}
