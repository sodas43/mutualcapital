import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CategoryService } from '../../../../../shared/services/category.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public categoryService: CategoryService
  ) { }

  ngOnInit() {
  }

  confirmDelete() {
    this.categoryService.DeleteCategory(this.data.category.id)
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
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
