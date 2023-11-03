import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { FileUpComponent } from '../file-up/file-up.component';
@Component({
  selector: 'app-cv-import',
  templateUrl: './cv-import.component.html',
  styleUrls: ['./cv-import.component.scss']
})
export class CvImportComponent implements OnInit {

  constructor(private dialog:MatDialog){}

  ngOnInit(): void {
  }

  open(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width= "30%";
    dialogConfig.height= "55%";
    this.dialog.open(FileUpComponent,dialogConfig);
  } 

}
