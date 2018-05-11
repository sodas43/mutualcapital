import { Http } from '@angular/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { environment } from './../../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {
  private url = environment.URL;
  Name ? : any;
  public userName ? : any; 
  public isadmin:boolean;
  public uid: any; 

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter(); 
  @Output() getLoggedInNameIsAdmin: EventEmitter<any> = new EventEmitter();

  constructor( private http: Http ) { }

  Login(ExistingUser: any) {
    console.log("Login Auth Service");
    
      return this.http.post(this.url+'/login', ExistingUser)
        .map(res => {          
          this.Name = JSON.parse(JSON.stringify(res.json()));
          this.userName = this.Name['user'];
          console.log(this.userName);
          console.log("Auth service : "+this.Name['isAdmin']);
          this.isadmin = this.Name['isAdmin'];
          console.log("IS ADMIN : "+this.isadmin);
          this.uid = this.Name['uid'];
          console.log("User ID : "+this.uid);
          
          this.getLoggedInName.emit(this.userName);
          this.getLoggedInNameIsAdmin.emit(this.isadmin);
          
          let storeItem = {
            'user'   : this.userName,
            'isAdmin': this.Name['isAdmin'],
            'uid'    : this.uid
          };
          //localStorage.setItem('UserDetails', JSON.stringify(storeItem));         
          this.StoreToLocalStorage('UserDetails', storeItem);

        })
        .catch ((err: Response) => {
          console.log("Error: "+ JSON.stringify(err.json()));   
          return Observable.throw(err.json());
        })
  }
   
  StoreToLocalStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  Signup(NewUser: any) {
    console.log("Signup Auth Service");
    return this.http.post(this.url+'/signup', NewUser)
      .map(res => {          
        console.log(res.json());
        return res.json();
        // this.Name = JSON.parse(JSON.stringify(res.json()));
        // this.newUserName = this.Name['user'];
        // console.log(this.newUserName);      
      })
      .catch ((err: Response) => {
        console.log("Error: "+ JSON.stringify(err.json()));   
        return Observable.throw(err.json());
      })
  }

  Logout() {
    console.log("Logout Auth Service");
    return this.http.get(this.url+'/logout')
      .map(res => {
        this.getLoggedInName.emit(null);
        this.getLoggedInNameIsAdmin.emit(false);

        localStorage.removeItem('UserDetails');
      })
  }

  forgotPassword(email: any) {
    console.log("Forgot Password Auth Service : "+email);
    return this.http.post(this.url+'/forgot', email)
    .map(res => {
      // this.getLoggedInName.emit(null);
      // this.getLoggedInNameIsAdmin.emit(false);

      // localStorage.removeItem('UserDetails');
    })
  }

  currentUser() {
    console.log("current user service");

    return this.http.get(this.url+'/currentUser');
  }

}
