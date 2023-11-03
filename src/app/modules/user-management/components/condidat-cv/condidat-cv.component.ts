import { Component, OnInit } from '@angular/core';
import { CvService } from 'src/app/service/cv.service';
import { UserService } from 'src/app/service/user.service';
import { jsPDF } from "jspdf"
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEntretienComponent } from '../add-entretien/add-entretien.component';
@Component({
  selector: 'app-condidat-cv',
  templateUrl: './condidat-cv.component.html',
  styleUrls: ['./condidat-cv.component.scss']
})
export class CondidatCvComponent implements OnInit {
  token = sessionStorage.getItem('auth')
  id :any
  cvDatas : any
  cvData:any
  colorPickerText : any = '#f9f9f9'
  colorPicker : any = '#4472C4'
  colorPickerTextTwo : any = '#f9f9f9'
  colorPickerTwo : any = '#767d87'
  disableLangues :any = true
  disableContact :any = true
  disableFormations :any = true
  disableExperience :any = true
  disableCompetences :any = true
  disableInterets :any = true
  disableIcons : any = true
  fontFamily : any = [
    "Gill Sans Extrabold",
    "Goudy Bookletter 1911",
    "Georgia, serif",
    "'Gill Sans', sans-serif",
    "sans-serif",
    "serif",
    "cursive",
    "system-ui"
  ]
  fontFamilyValue :any="Georgia, serif"
  heightImage: any = 70
  widthImage : any = 70
  sizeTitle : any = 16
  topImage :any = 0
  leftImage :any = 0
  rightImage :any = 0
  bottomImage :any = 0

  imgAm = 'Hide'
  constructor(private userService : UserService , private cvService : CvService , private route : ActivatedRoute,private dialog: MatDialog) { 
    this.id = this.route.snapshot.params['id']
    this.cvService.getCvByIDUser(this.id).subscribe(res=>{
      console.log(res);
      this.cvDatas = res;
      this.cvDatas.reverse()
      this.cvData = this.cvDatas[0]
      
    })
  }

  ngOnInit(): void {
  }
  hideImage(){
    if(this.imgAm == 'Hide'){
      this.imgAm = 'Show'
    }else{
      this.imgAm = 'Hide'
    }
  }

  delete(){
    this.cvService.delete(this.cvDatas._id).subscribe(res=>{
      alert('ok')
    })
  }
  generatePdfmodelTwo(){
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

  addEntretien(data:any){
    console.log(data)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data
    this.dialog.open(AddEntretienComponent, dialogConfig);
  }

}
