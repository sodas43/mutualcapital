import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from './../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class PaymentService {
  private url = environment.URL+"/Transact";

  constructor(private http: Http) { }

  submitPayment(cardToken, amount) {

  	//let searchUrl = "http://localhost:5000/user/donate";
  	// let headers = new Headers({
  	// 	'Content-Type': 'application/json'
  	// });

  	//let options = new RequestOptions({ headers: headers });
  	let data = {
  		cardToken: cardToken,
      amount: amount
  	}
    console.log("payment service data: "+JSON.stringify(data));
  	return this.http.post(this.url+'/payment', data)
    .map(res => {   
      console.log(res.json());      
      return res.json();
    })
    .catch ((err: Response) => {
      console.log("Error: "+ JSON.stringify(err.json()));   
      return Observable.throw(err.json());
    })
  }
}
