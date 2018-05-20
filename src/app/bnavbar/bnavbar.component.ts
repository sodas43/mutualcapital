import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bnavbar',
  templateUrl: './bnavbar.component.html',
  styleUrls: ['./bnavbar.component.css']
})
@Injectable()
export class BnavbarComponent implements OnInit {
  public user$ ?  : string;
  public isUserAdmin$ ?  : boolean;
  public user_id ? : string;
  
  constructor(
    private http: Http, 
    private router: Router,    
    public authService: AuthService) { 

      authService.getLoggedInName.subscribe(name => this.getUserName(name));
      authService.getLoggedInNameIsAdmin.subscribe(isAdmin => this.isUserAdmin(isAdmin));

      this.authService.currentUser()
        .subscribe(res => {
          
          if (res) {
            //console.log(res.json());
            let data = res.json() || [];
            //let data = JSON.parse(JSON.stringify(res.json()));
            console.log(data);
            if(data) {
              if (data.user) {
                if (data.user.twitter) {
                  console.log("Twitter Name: "+data.user.twitter.displayName);
                  console.log("Twitter user id: "+data.user._id);
                  this.user$ = data.user.twitter.displayName;
                  this.user_id = data.user._id;
                }
                else if(data.user.google) {
                  console.log("Google Name: "+data.user.google.name);
                  console.log("Google user id: "+data.user._id);
                  this.user$ = data.user.google.name;
                  this.user_id = data.user._id;
                }
                //this.isUserAdmin$ = false;
                
                let storeItem = {'user': this.user$, 'isAdmin': false, 'uid': this.user_id};
                this.authService.StoreToLocalStorage('UserDetails', storeItem);
      
                this.authService.getLoggedInName.emit(this.user$);
                this.authService.getLoggedInNameIsAdmin.emit(false);
      
                console.log(JSON.stringify("loggedin user: "+this.user$));
              }              
            }
          }
      })
    }

    private getUserName(name: string): void {
      this.user$ = name;
    }
    private isUserAdmin(isAdmin: boolean): void {
      this.isUserAdmin$ = isAdmin;
    }

   async ngOnInit() {
    console.log("in bnavbar");
    let User = JSON.parse(localStorage.getItem('UserDetails'));
    
    if ( User ) {
      console.log(User);
      console.log(User['user']);
      console.log(User['isAdmin']);

      this.user$ = User['user'];
      this.isUserAdmin$ = User['isAdmin'];
      console.log("isAdmin$ = "+this.isUserAdmin$);
    }
    //TODO: Check if we are coming from /reset/:token. If we come we need to show
    //error/success messages.
    
    // if (this.isUserAdmin$ == true)  { console.log('true'); }
    //   else                      { console.log('false');}   
  }
  

  LogOut() {
    console.log("Calling /logout");
    this.authService.Logout()
      .subscribe( response => {
        console.log("resp : "+response);
  
        //got the response. Now navigate
        this.router.navigate(['signup']);
    });
    
  }

}
