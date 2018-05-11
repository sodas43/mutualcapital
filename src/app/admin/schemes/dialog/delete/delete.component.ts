import { SchemeService } from './../../../../shared/services/scheme.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public schemeService: SchemeService
  ) { }

  ngOnInit() {
  }
  confirmDelete() {
    this.schemeService.DeleteScheme(this.data.schemeName)
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
