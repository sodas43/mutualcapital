import { Component, OnInit, ViewChild } from '@angular/core';
import { SchemeService } from '../../shared/services/scheme.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AddSchemeComponent } from './dialog/add/add.component';
import { EditComponent } from './dialog/edit/edit.component';
import { DeleteComponent } from './dialog/delete/delete.component';


export interface SchemeInterface {
  schemeName: string;
  schemeDescription: string;
  schemeNAV: number;
  subCategory: string;
  categoryName: string;
}

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.css']
})
export class SchemesComponent implements OnInit {

  displayedColumns = ['schemeName', 'schemeDescription', 'schemeNAV', 'subCategory', 'categoryName', 'actions'];
  categoryDatabase: SchemeService | null;
  dataSource = new MatTableDataSource<SchemeInterface>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Schemes: any[];

  constructor(
    private schemeService: SchemeService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  getAllSchemes() {
    this.schemeService.GetAllSchemes()
      .subscribe(res => {
          this.Schemes = res.json();
          this.dataSource.data = this.Schemes;
          
          console.log(JSON.stringify(this.Schemes));
      })
  }

  applySchemeFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  OnAddClick() {
    console.log("Add clicked");
    const dialogRef = this.dialog.open(AddSchemeComponent, {
      width: '500px'
      //data: {data: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result: "+result);      
        this.getAllSchemes();        
    });
  }

  OnEditClick(id, categoryName, categoryDescription) {    
    let category = {
      id: id,
      categoryName: categoryName,
      categoryDescription: categoryDescription
    };
    //this.categoryToEdit = category;
    const dialogRef = this.dialog.open(EditComponent, {
      // data: { id: id, categoryName: categoryName, categoryDescription: categoryDescription }
      data: { category }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result: "+result);
        this.getAllSchemes();      
    });

  }
  OnDeleteClick(id) {
    console.log("Delete clicked");

    const dialogRef = this.dialog.open(DeleteComponent, {      
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result: "+result);      
        this.getAllSchemes();        
    });


  }
}
