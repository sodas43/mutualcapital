import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Component, OnInit, Inject } from '@angular/core';
import { CategoryService } from '../../../../shared/services/category.service';
import { SchemeService } from './../../../../shared/services/scheme.service';
import { FormControl } from '@angular/forms';
import { Scheme } from '../../model/scheme';

import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public categoryNames=[];
  public subCategoryNames? : any[];
  public schemeTypes = [
    {value: 'Growth'},
    {value: 'Dividend'}
  ];
  public schemes=[];
  public NAV ? : any;
  public code ? : any;
  public oneyrRet ? : any;
  public threeyrRet ? : any;
  public fiveyrRet ? : any;

  selected='this.data.Scheme.categoryName' ;

  isSubCategoryEmpty:boolean = false;

  schemeControl: FormControl;
  filteredSchemes: Observable<any[]>;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Scheme,
    private categoryService: CategoryService, 
    private schemeService: SchemeService
  ) { }

  ngOnInit() {
    this.GetAllCategoryNames();
    this.GetAllSchemes();
    this.schemeControl = new FormControl();
    // this.data.Scheme.schemeName
    // data.Scheme.schemeCode: schemeCode,
    // data.Scheme.categoryName: categoryName,
    // data.Scheme.subCategoryName: subCategoryName,
    // data.Scheme.schemeType: schemeType,
    // data.Scheme.schemeNAV: schemeNAV,
    // data.Scheme.oneYrRet: oneYrRet,
    // data.Scheme.threeYrRet: threeYrRet,
    // data.Scheme.fiveYrRet
  }
  GetAllSchemes() {
    this.schemeService.GetAllSchemes()
    .subscribe(res => {      
      let items = JSON.parse(JSON.stringify(res.json()));
      
      let n: number = items.length;
      console.log("length : "+items.length);
      while(n--) {
          this.schemes.push(items[n]['schemeName']);   
      }
      //console.log("schemes : "+this.schemes);
    })
  }

  GetAllCategoryNames() {
    this.categoryService.GetAllCategoryNames()
    .subscribe(res => {      
      let items = JSON.parse(JSON.stringify(res.json()));
      
      let n: number = items.length;
      console.log("length : "+items.length);
      while(n--) {
          this.categoryNames.push(items[n]['categoryName']);   
      }
      console.log("categoryNames : "+this.categoryNames);
    })
  }

  onSubmit(form) {
    console.log("In Scheme Submit");
     console.log(JSON.stringify(form.value));
    
     let newScheme = {
       schemeName: form.value.schemeName,
       schemeCode: form.value.schemeCode,
       categoryName: form.value.categoryName,
       subCategoryName: form.value.subCategoryName,
       schemeType: form.value.schemeType,
       schemeNAV: form.value.schemeNAV,
       oneYrRet: form.value.oneYrRet,
       threeYrRet: form.value.threeYrRet,
       fiveYrRet: form.value.fiveYrRet      
     };
    
     console.log("scheme : "+JSON.stringify(newScheme));
     this.schemeService.UpdateScheme(newScheme)
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

  onChange(event) {
    this.subCategoryNames=[];
         
    if(event.value !== '--') {
      this.categoryService.GetAllSubCategoryNames(event.value)
      .subscribe(res => {      
        let items = JSON.parse(JSON.stringify(res.json()));
        let data = items[0]['subCategories'];
        if(data) {
          this.isSubCategoryEmpty = false;
          let arr  =  (JSON.stringify(data).slice(1, -1)).split(',');
          this.subCategoryNames = arr;
          console.log("subCategoryNames : "+this.subCategoryNames);
        }
        else {
          this.isSubCategoryEmpty = true;
        }      
      })
    }
  }

  fillSchemeDetails(event) {
    if (event.target.value != "") {
      console.log("fillSchemeDetails fired !! value : "+event.target.value);

      this.schemeService.GetSchemeDetails(event.target.value)
        .subscribe(res => {
          let data = JSON.parse(JSON.stringify(res.json()));
          console.log(data);
          console.log(data[0]['schemeCode']);
          console.log(data[0]['schemeNAV']);

          this.NAV = data[0]['schemeNAV'];
          this.code = data[0]['schemeCode'];
          this.oneyrRet = data[0]['oneYrRet'];
          this.threeyrRet = data[0]['threeYrRet'];
          this.fiveyrRet = data[0]['fiveYrRet'];
          
          //console.log(res.json());
        })
    }
  }

}
