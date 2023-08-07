import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudCVService } from 'src/app/service/crud-cv.service';

import { Contact } from 'src/app/models/Contact';
import { CVData } from 'src/app/models/cvData';

@Component({
  selector: 'app-modele-cv',
  templateUrl: './modele-cv.component.html',
  styleUrls: ['./modele-cv.component.css']
})
export class ModeleCvComponent implements OnInit {

  cvData?: CVData | undefined;
  contactData?: Contact;

  constructor(private route: ActivatedRoute, private cvService: CrudCVService) { }

  ngOnInit(): void {
    // Get the cvId from the route parameters
    const cvId = this.route.snapshot.paramMap.get('id');
    if (cvId) {
      // Call the CVService to fetch the complete CV data by its ID
      this.cvService.getCVByID(cvId).subscribe(
        (cvData: CVData) => {
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
}
