
import { AuthService } from './../shared/services/auth.service';
import { RouterModule } from '@angular/router';
import { Component, OnInit, Injectable, ViewChild, Input, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig, MatDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ForgotPasswordComponent } from './dialog/forgot-password/forgot-password.component';





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
    private dialog: MatDialog
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

                // let storeItem = {'user': 'souvik', 'isAdmin': 'Yes'}
                // localStorage.setItem('UserDetails', JSON.stringify(storeItem));
                // var retrievedObject = localStorage.getItem('UserDetails');
                // console.log('retrievedObject: ', JSON.parse(retrievedObject));

                //got the response. Now navigate
                this.router.navigate(['dashboard']);              
              },
              (err) => {
                console.log('Service failed' + JSON.stringify(err));
                let errmsg = err.info.message;                
                this.toaster.error(errmsg, ' OOPS !! ')                
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
          this.toaster.success(msg, ' WELL DONE !! ', {enableHTML: true} );
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
      width: '500px'
      //data: {data: data }
    });

    dialogRef.afterClosed().subscribe(result => {
      // let msg = ` An email has been sent to `+'<b>' + form.value.email + '</b>' +`with further instructions.<br>Please check your Inbox`; 
      let msg = ` An email has been sent `+`with further instructions.<br>Please check your Inbox`; 
      this.toaster.info(msg, ' INFO !! ', {enableHTML: true} );     
    });
  }
  // AuthenticateUsingtwitter() {
  //   console.log("calling twitter");
  //   // this.router.navigateByUrl('http:127.0.0.1:4200/auth/twitter')
  //   this.router.navigate
  //   this.http.get('/auth/twitter')
  //     .subscribe(response => {
  //       this.user = response.json();
  //       console.log("user details: "+ this.user);
  //     });
     
  // }

}
