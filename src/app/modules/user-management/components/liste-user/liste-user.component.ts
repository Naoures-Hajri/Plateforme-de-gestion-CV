import { Component, OnInit , ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogViewUserComponent } from '../dialog-view-user/dialog-view-user.component';
import { SelectionModel } from '@angular/cdk/collections';

  export interface PeriodicElement {
    name: string;
    position: number;
    email: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Sami', email: 'email@tanitlab.com'},
    {position: 2, name: 'Helium', email: 'email@tanitlab.com'},
    {position: 3, name: 'Lithium', email: 'email@tanitlab.com'},
    {position: 4, name: 'Beryllium', email: 'email@tanitlab.com'},
    {position: 5, name: 'Boron', email: 'email@tanitlab.com'},
    {position: 6, name: 'Carbon', email: 'email@tanitlab.com'},
    {position: 7, name: 'Nitrogen', email: 'email@tanitlab.com'},
    {position: 8, name: 'Oxygen', email: 'email@tanitlab.com'},
    {position: 9, name: 'Fluorine', email: 'email@tanitlab.com'},
    {position: 10, name: 'Neon', email: 'email@tanitlab.com'},
    
  ];

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.scss']
})
export class ListeUserComponent implements OnInit  {

  constructor(private dialog : MatDialog  ) {}

  ngOnInit(): void {
    this.getDataTable(); 
  }

  listeData:PeriodicElement[]=[];
  getDataTable(){ 
    // your code here
    // get Data from -Data Base- and push in table "listeData"
    for(let i=0; i< ELEMENT_DATA.length; i++){
      this.listeData.push(ELEMENT_DATA[i]);
    }
     console.log(this.listeData);
  }
   
  displayedColumns = ['select','position', 'name', 'email', 'action' ];
  dataSource = new MatTableDataSource(this.listeData); 

  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  selection = new SelectionModel<PeriodicElement>(true, []);
 
 
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
     const numSelected = this.selection.selected.length;
     const numRows = this.dataSource.data.length;
     return numSelected === numRows;
   }
 
   /** Selects all rows if they are not all selected; otherwise clear selection. */
   toggleAllRows() {
     if (this.isAllSelected()) {
       this.selection.clear();
       return;
     }
 
     this.selection.select(...this.dataSource.data);
   }
 
   /** The label for the checkbox on the passed row */
   checkboxLabel(row?: PeriodicElement): string {
     if (!row) {
       return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
     }
     return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
   }
 
 
   

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogAddUser() {
    this.dialog.open(DialogAddUserComponent, {
    });
  }

  openDialogEditUser() {
    this.dialog.open(DialogEditUserComponent, {
    });
  }

  openDialogViewUser() {
    this.dialog.open(DialogViewUserComponent, {
       maxHeight:'80vh'    
    });
  }

  
}
