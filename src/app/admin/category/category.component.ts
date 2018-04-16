import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { CategoryService } from '../../shared/services/category.service';
import { category } from './models/category';

import { AddComponent } from './dialog/add/add/add.component';
import { EditDialogComponent } from './dialog/edit/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './dialog/delete/delete-dialog/delete-dialog.component';

export interface CategoryInterface {
  categoryName: string;
  categoryDescription: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {
  displayedColumns = ['categoryName', 'categoryDescription', 'actions'];
  categoryDatabase: CategoryService | null;
  dataSource = new MatTableDataSource<CategoryInterface>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  categories: any[];
  //categoryToEdit? : any;

  constructor( 
    private categoryService: CategoryService,
    private dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getAllCategories();
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllCategories() {
    this.categoryService.GetAllCategories()
      .subscribe(res => {
          this.categories = res.json();
          this.dataSource.data = this.categories;
          
          console.log(JSON.stringify(this.categoryService));
      })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  OnAddClick() {
    console.log("Add clicked");
    const dialogRef = this.dialog.open(AddComponent, {
      width: '500px'
      //data: {data: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result: "+result);
      //if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        //this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        //this.refreshTable();
        this.getAllCategories();
        //this.categoryDatabase.dataChange.value.push(this.categoryService.get());
        //this.refreshTable();
      //}
    });
  }

  OnEditClick(id, categoryName, categoryDescription) {    
    let category = {
      id: id,
      categoryName: categoryName,
      categoryDescription: categoryDescription
    };
    //this.categoryToEdit = category;
    const dialogRef = this.dialog.open(EditDialogComponent, {
      // data: { id: id, categoryName: categoryName, categoryDescription: categoryDescription }
      data: { category }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result: "+result);
      //if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        //this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        //this.refreshTable();
        this.getAllCategories();
        //this.categoryDatabase.dataChange.value.push(this.categoryService.get());
        //this.refreshTable();
      //}
    });

  }
  OnDeleteClick(id) {
    console.log("Delete clicked");

    const dialogRef = this.dialog.open(DeleteDialogComponent, {      
      data: { id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("result: "+result);      
        this.getAllCategories();        
    });


  }
}
