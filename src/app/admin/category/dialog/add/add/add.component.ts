import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { category } from '../../../models/category';
import { CategoryService } from '../../../../../shared/services/category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: category,
    public categoryService: CategoryService) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log("In Category Submit");
    console.log(JSON.stringify(form.value));

    let newCategory = {
      categoryName: form.value.categoryName,
      categoryDescription: form.value.categoryDescription
    };

    this.categoryService.AddCategory(newCategory)
          .subscribe(
              (res) => {
                console.log('Service success');                
                this.dialogRef.close();
                 
              },
              (err) => {
                console.log('Service failed' + JSON.stringify(err));                
              }
          );

    
  }
}
