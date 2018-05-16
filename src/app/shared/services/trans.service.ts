import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { category } from '../../admin/category/models/category';
import { Http } from '@angular/http';
import { environment } from './../../../environments/environment';

@Injectable()
export class TransService {
  private url = environment.URL+"/Transact";

  constructor(private http: Http) { }

  AddSIP(NewSIP) {
    console.log("Add Scheme Service");

    return this.http.post(this.url+'/AddSIP', NewSIP)
    .map(res => {      
      console.log(res.json());      
    })
    .catch ((err: Response) => {
      console.log("Error: "+ JSON.stringify(err.json()));   
      return Observable.throw(err.json());
    })
  }

  AddLumpsum(NewLumpsum) {
    console.log("Add Scheme Service");

    return this.http.post(this.url+'/AddLumpsum', NewLumpsum)
    .map(res => {      
      console.log(res.json());      
    })
    .catch ((err: Response) => {
      console.log("Error: "+ JSON.stringify(err.json()));   
      return Observable.throw(err.json());
    })
  }

  AddTransaction(NewTransaction) {
    console.log("Add Transaction Service");

    return this.http.post(this.url+'/AddTransaction', NewTransaction)
    .map(res => {      
      console.log(res.json());      
    })
    .catch ((err: Response) => {
      console.log("Error: "+ JSON.stringify(err.json()));   
      return Observable.throw(err.json());
    })
  }

  AddUpcomingTransaction(NewUpcomingTransaction) {
    console.log("Add Transaction Service");

    return this.http.post(this.url+'/AddUpcomingTransaction', NewUpcomingTransaction)
    .map(res => {      
      console.log(res.json());      
    })
    .catch ((err: Response) => {
      console.log("Error: "+ JSON.stringify(err.json()));   
      return Observable.throw(err.json());
    })
  }

  GetUpcomingTransaction(UID) {
    console.log("Get Upcoming Transaction Service : "+UID);

    return this.http.get(this.url+'/listUpcomingTransactions/'+UID);
    
  }

  GetAllTransactions(UID) {
    console.log("Get All Transaction Service : "+UID);

    return this.http.get(this.url+'/listAllTransactions/'+UID);
    
  }

  GetLimitedAllTransactions(UID) {
    console.log("Get Limited All Transaction Service : "+UID);

    return this.http.get(this.url+'/listLimitedAllTransactions/'+UID);
    
  }

  GetDistinctSchemesFromAllTransactions(UID) {
    console.log("Get DistinctSchemes from All Transaction Service : "+UID);

    return this.http.get(this.url+'/listDistinctSchemesFromAllTransactions/'+UID);
    
  }
}
