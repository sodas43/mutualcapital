
import { AuthService } from './../shared/services/auth.service';
import { RouterModule } from '@angular/router';
import { Component, OnInit, Injectable, ViewChild, Input, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ForgotPasswordComponent } from './dialog/forgot-password/forgot-password.component';
import { MessageService } from '../shared/services/message.service';





// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',  
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  public showLogin:boolean = true;
  public hide:boolean = true;

  public title = "LOG IN WITH";
  public isErr:boolean = false;
  public isUseradded:boolean = false;
  public newUserName ? : any;
  
  
  
  // user$:any[];
  isAdmin$ ? : boolean = false;

  // private url = "http://127.0.0.1:4200"; 

  constructor(
    private http: Http, 
    private router: Router,
    private snackBar: MatSnackBar,
    public toaster: ToastsManager,
    public vcr: ViewContainerRef,
    private authService: AuthService,
    private dialog: MatDialog,
    private messageService: MessageService
  ) { 
    console.log("auth component constructor");
    this.toaster.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    console.log("in login page");
    let User = JSON.parse(localStorage.getItem('UserDetails'));
    if ( User ) {
      console.log(User);
      console.log(User['user']);
      console.log(User['isAdmin']);

      //this.user$ = User['user'];
      this.isAdmin$ = User['isAdmin'];

    }    
  }

  onLoginSubmit(form: NgForm) {
    console.log("Login: "+JSON.stringify(form.value));
    
        let UserToVerify = {
          email: form.value.email,
          password: form.value.password          
        };
        
        this.authService.Login(UserToVerify)
          .subscribe(
              (res) => {
                console.log('Service success');

                //got the response. Now navigate
                this.router.navigate(['dashboard']);              
              },
              (err) => {
                console.log('Service failed' + JSON.stringify(err));
                let errmsg = err.info.message;
                this.messageService.showError(errmsg, ' OOPS !! ', null );
                //this.toaster.error(errmsg, ' OOPS !! ')                
              }
          );
          
  }
  onSignupSubmit(form: NgForm) {
    console.log("Signup: "+JSON.stringify(form.value));

    let NewUser = {
      email: form.value.email,
      password: form.value.password,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      mobile: form.value.mobile,
      isAdmin: form.value.isAdmin ? form.value.isAdmin : false
    };
    
    this.authService.Signup(NewUser)
      .subscribe(
        (res) => {
          let Name = JSON.parse(JSON.stringify(res));
          this.newUserName = Name['user'];
          console.log(this.newUserName);      
          console.log('Signup success'); 
          //this.isUseradded = true;
          console.log("Is User Added :"+ this.isUseradded);
          let msg = ` You have successfuly added `+'<b>' + this.newUserName + '</b>' + `.<br>Please Login to continue`;
          console.log("MSG: "+msg);
          this.messageService.showSuccess(msg, ' WELL DONE !! ', null );
          //got the response. Now navigate
          //this.router.navigate(['dashboard']);              
        },
        (err) => {
          let errmsg = err.info.message;
          //console.log("errmsg = "+ errmsg);
          this.toaster.error(errmsg, ' OOPS !! ');
          console.log('Signup Service failed' + JSON.stringify(err));

        }
      );
  }
  toggle() {
    this.showLogin = !this.showLogin;
    if (this.showLogin) this.title = "LOG IN WITH";
    else                this.title = "REGISTER WITH";

    this.isErr = false;
    this.isUseradded = false;

  }

  OnForgotPasswordClick() {
    console.log("Forgot Password clicked");
    const dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '500px',
      disableClose: true    
    });

    
  }
  

}
