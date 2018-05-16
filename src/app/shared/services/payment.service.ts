import { Injectable, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from './../../../environments/environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
// import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class PaymentService {
  private url = environment.URL+"/Transact";

  constructor(
    private http: Http,
    // public toaster: ToastsManager,
    // public vcr: ViewContainerRef
  ) {
    //this.toaster.setRootViewContainerRef(vcr);
  }

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
      //this.toaster.success("Payment SuccessFul !!", ' WELL DONE !! ', {enableHTML: true} );  
      console.log(res.json());      
      return res.json();
    })
    .catch ((err: Response) => {
      console.log("Error: "+ JSON.stringify(err.json()));   
      return Observable.throw(err.json());
    })
  }
}
