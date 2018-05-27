import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from '../../../../../shared/services/category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  category? : any;
  id? :  any;
  constructor( 
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public categoryService: CategoryService
  ) { }

  ngOnInit() { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm) {
    console.log("On Edit dialog Submit");

    let categoryToEdit = {
      categoryName: form.value.categoryName,
      categoryDescription: form.value.categoryDescription
    };

    this.categoryService.EditCategory(this.data.category.id, categoryToEdit)
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
