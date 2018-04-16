import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { category } from '../../admin/category/models/category';
import { environment } from './../../../environments/environment';

@Injectable()
export class CategoryService {

  private url = environment.URL+'/Category';
  

  dataChange: BehaviorSubject<category[]> = new BehaviorSubject<category[]>([]);

  constructor( private http: Http ) { }

  AddCategory(NewCategory) {
    console.log("Add Category Service");

    return this.http.post(this.url+'/AddCategory', NewCategory)
    .map(res => {      
      console.log(res.json());      
    })
    .catch ((err: Response) => {
      console.log("Error: "+ JSON.stringify(err.json()));   
      return Observable.throw(err.json());
    })
  }

  EditCategory(id, categoryToEdit) {
    console.log("Edit Category Service: id "+id);

    return this.http.put(this.url+'/editCategory/'+id, categoryToEdit)
    .map(res => {      
      console.log(res.json());      
    })
    .catch ((err: Response) => {
      console.log("Error: "+ JSON.stringify(err.json()));   
      return Observable.throw(err.json());
    })
  }

  DeleteCategory(id) {
    console.log("Delete Category Service: id "+id);

    return this.http.delete(this.url+'/deleteCategory/'+id)
    .map(res => {      
      console.log(res.json());      
    })
    .catch ((err: Response) => {
      console.log("Error: "+ JSON.stringify(err.json()));   
      return Observable.throw(err.json());
    })
  }

  GetAllCategories() {
    console.log("Get All Category Service");

    return this.http.get(this.url+'/listCategory');    
  }

  GetCategory(id) {
    console.log("Get Category Service: id = "+id);

    return this.http.get(this.url+'/listCategory/'+id);
  }

  GetAllCategoryNames() {
    console.log("Get All Category Names");
    
    return this.http.get(this.url+'/listCategoryNames');
  }
}
