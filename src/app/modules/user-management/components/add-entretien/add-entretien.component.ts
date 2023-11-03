import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-entretien',
  templateUrl: './add-entretien.component.html',
  styleUrls: ['./add-entretien.component.scss']
})
export class AddEntretienComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ,  private dialogRef: MatDialogRef<AddEntretienComponent>) {
    console.log(this.data)
   }

  ngOnInit(): void {
  }

}
