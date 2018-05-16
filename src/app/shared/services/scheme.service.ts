import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Rx';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { category } from '../../admin/category/models/category';
import { Http } from '@angular/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class SchemeService {

  private url = environment.URL+"/Scheme";

  //dataChange: BehaviorSubject<category[]> = new BehaviorSubject<category[]>([]);

  constructor( private http: Http ) { }

  AddScheme(NewScheme) {
    console.log("Add Scheme Service");

    return this.http.post(this.url+'/AddScheme', NewScheme)
    .map(res => {      
      console.log(res.json());      
    })
    .catch ((err: Response) => {
      console.log("Error: "+ JSON.stringify(err.json()));   
      return Observable.throw(err.json());
    })
  }

  UpdateScheme(schemeToUpdate) {
    console.log("Update Scheme Service");
    
        return this.http.post(this.url+'/UpdateScheme', schemeToUpdate)
        .map(res => {      
          console.log(res.json());      
        })
        .catch ((err: Response) => {
          console.log("Error: "+ JSON.stringify(err.json()));   
          return Observable.throw(err.json());
        })
  }
  
  EditScheme(id, schemeToEdit) {
    console.log("Edit Scheme Service: id "+id);

    return this.http.put(this.url+'/editScheme/'+id, schemeToEdit)
    .map(res => {      
      console.log(res.json());      
    })
    .catch ((err: Response) => {
      console.log("Error: "+ JSON.stringify(err.json()));   
      return Observable.throw(err.json());
    })
  }

  DeleteScheme(schemeName) {
    console.log("Delete Scheme Service: name "+schemeName);

    return this.http.delete(this.url+'/deleteScheme/'+schemeName)
    .map(res => {      
      console.log(res.json());      
    })
    .catch ((err: Response) => {
      console.log("Error: "+ JSON.stringify(err.json()));   
      return Observable.throw(err.json());
    })
  }

  GetAllSchemes() {
    console.log("Get All Scheme Service");

    return this.http.get(this.url+'/listScheme');    
  }

  GetScheme(id) {
    console.log("Get Scheme Service: id = "+id);

    return this.http.get(this.url+'/listScheme/'+id);
  }

  GetSchemeDetails(schemeName) {
    console.log("Get SchemeDetails Service: name = "+schemeName);

    return this.http.get(this.url+'/getSchemeDetails/'+schemeName);

  }
  
  GetSchemeNAV(schemeName) {
    console.log("Get SchemeNAV Service: name = "+schemeName);

    return this.http.get(this.url+'/getSchemeNAV/'+schemeName);

  }

}
