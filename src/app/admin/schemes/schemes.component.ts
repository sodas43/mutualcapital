import { Component, OnInit, ViewChild } from '@angular/core';
import { SchemeService } from '../../shared/services/scheme.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AddSchemeComponent } from './dialog/add/add.component';
import { EditComponent } from './dialog/edit/edit.component';
import { DeleteComponent } from './dialog/delete/delete.component';


export interface SchemeInterface {
  schemeName: string;
  schemeNAV: number;
  subCategory: string;
  categoryName: string;
  oneYrRet: Number;
  threeYrRet: Number;
  fiveYrRet: Number;
}

@Component({
  selector: 'app-schemes',
  templateUrl: './schemes.component.html',
  styleUrls: ['./schemes.component.css']
})
export class SchemesComponent implements OnInit {

  displayedColumns = ['schemeName', 'schemeNAV',
                      'subCategory', 'categoryName',
                      'oneYrRet', 'threeYrRet',
                      'fiveYrRet', 'actions'];
  
                      schemeDatabase: SchemeService | null;
  dataSource = new MatTableDataSource<SchemeInterface>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  Schemes: any[];
  public loading = false;

  constructor(
    private schemeService: SchemeService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllSchemes();
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllSchemes() {
    this.loading = true;

    this.schemeService.GetAllSchemes()
      .subscribe(res => {
        this.loading = false;
          this.Schemes = res.json();
          this.dataSource.data = this.Schemes;
          
          //console.log(JSON.stringify(this.Schemes));
      },
    (err) => {
      this.loading = false;
      console.log("Err :"+err);
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
      width: '1000px'
      //data: {data: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result: "+result);      
        this.getAllSchemes();        
    });
  }

  OnEditClick(schemeName, schemeCode, categoryName, subCategoryName,
    schemeType, schemeNAV, oneYrRet, threeYrRet, fiveYrRet
  ) {    
    let Scheme = {
      schemeName: schemeName,
      schemeCode: schemeCode,
      categoryName: categoryName,
      subCategoryName: subCategoryName,
      schemeType: schemeType,
      schemeNAV: schemeNAV,
      oneYrRet: oneYrRet,
      threeYrRet: threeYrRet,
      fiveYrRet: fiveYrRet      
    };
    //this.categoryToEdit = category;
    const dialogRef = this.dialog.open(EditComponent, {
      // data: { id: id, categoryName: categoryName, categoryDescription: categoryDescription }
      data: { Scheme }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result: "+result);
        this.getAllSchemes();      
    });

  }
  OnDeleteClick(schemeName) {
    console.log("Delete clicked");

    const dialogRef = this.dialog.open(DeleteComponent, {      
      data: { schemeName }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result: "+result);      
        this.getAllSchemes();        
    });


  }
}
