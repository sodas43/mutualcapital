import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CategoryService } from '../../../shared/services/category.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-alltrans',
  templateUrl: './alltrans.component.html',
  styleUrls: ['./alltrans.component.css']
})
export class AlltransComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlltransComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    // console.log("trans: "+JSON.stringify(this.data));
  }

}
