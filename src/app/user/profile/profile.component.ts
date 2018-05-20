import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MessageService } from '../../shared/services/message.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterViewInit {
  showPwdForm:boolean = false;  
  showPhoneForm:boolean = false;
  showBankForm:boolean = false;
  showPANForm:boolean = false;

  UID: any;
  UName: any;
  mob? : any;
  email? : any;
  isLocal:boolean = false;
  public data? : any;

  bankName? : any;
  acno? : any;
  branch? : any;
  city? : any;
  IFSC? : any;
  payout? : any;

  pan? : any;
  panVerified? : any;
  kycVerified? : any;


  constructor(
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.GetUid();
    this.GetProfile(this.UID);
  }

  ngAfterViewInit() {
    
  }
  GetProfile(uid) {
    this.authService.GetProfile(uid)
      .subscribe((res) => {
        console.log(JSON.stringify(res.json(), null, 2));
        this.data = res.json();
        if (this.data) {
          if(this.data.local != null) { // local
            this.isLocal = true;
            console.log(this.data.local.email);
            console.log(this.data.mobile);
            this.email = this.data.local.email;
            this.mob = this.data.mobile;
          }          
          else if(this.data.twitter != null) {
            console.log(this.data.twitter.email);
            console.log(this.data.mobile);
            this.email = this.data.twitter.email;
            this.mob = this.data.mobile;
          }
          else {
            console.log(this.data.google.email);
            console.log(this.data.mobile);
            this.email = this.data.google.email;
            this.mob = this.data.mobile;
          }
          if(this.data.bank) {
            console.log(JSON.stringify(this.data.bank, null, 2));
            this.bankName = this.data.bank.name;
            this.acno = this.data.bank.acno;
            this.branch = this.data.bank.branch;
            this.city = this.data.bank.city;
            this.IFSC = this.data.bank.IFSC;
            this.payout = this.data.bank.payout;
          }
          if(this.data.PAN) {
            this.pan = this.data.PAN.no;
            this.panVerified = this.data.PAN.verified;
            this.kycVerified = this.data.PAN.KYCVerified;
          }          
        }        
      })
  }
  GetUid() {
    let User = JSON.parse(localStorage.getItem('UserDetails'));
    if ( User ) {
      //console.log(User);
      //console.log(User['uid']);
      this.UID = User['uid'];
      this.UName = User['user'];
    }
  }
  UpdatePassword(form: NgForm) {
    if(form.value.password1 != form.value.confirmPassword1) {
      this.messageService.showError("Password and Confirm Password did not match", "OOPS!!", null);
    }
    else {
      let pwd = {
        password: form.value.password1
      };

      this.authService.UpdatePwd(this.UID, pwd)
        .subscribe((res) => {
        //console.log('Service success: '+JSON.stringify(res));
        this.showPwdForm = !this.showPwdForm;
        if(res.message) {
          this.messageService.showError("Password Policy Did not match", "ERROR !!", null);
        }
        else {
          this.messageService.showSuccess("Password Updated Successfully", "DONE !!", null);
        }
      },
      (err) => {
        console.log('Service failed' + JSON.stringify(err));
        this.messageService.showError("An Error Occurred", "ERROR !!", null);
      })
    }
  }
  UpdateMobile(form: NgForm) {
    let newMob = {
      mobile: form.value.mob
    };

    this.authService.UpdateMobile(this.UID, newMob)
      .subscribe((res) => {
        console.log('Service success');
        this.showPhoneForm = !this.showPhoneForm;
        this.GetProfile(this.UID);
        this.messageService.showSuccess("Mobile Updated Successfully", "DONE !!", null);
      },
      (err) => {
        console.log('Service failed' + JSON.stringify(err));
        this.messageService.showError("An error occurred", "ERROR !!", null);
      })
  }

  UpdateBank(form: NgForm) {
    let newBank = {
      bankName: form.value.bankName,
      acno    : form.value.acno,
      branch  : form.value.branch,
      city    : form.value.city,
      IFSC    : form.value.IFSC,
      payout  : form.value.payout
    };

    this.authService.UpdateBank(this.UID, newBank)
    .subscribe((res) => {
      console.log('Service success');
      this.showBankForm = !this.showBankForm;
      this.GetProfile(this.UID);
      this.messageService.showSuccess("Bank Details Updated Successfully", "DONE !!", null);
    },
    (err) => {
      console.log('Service failed' + JSON.stringify(err));
      this.messageService.showError("An error occurred", "ERROR !!", null);
    })
  }

  UpdatePAN(form: NgForm) {
    let newPAN = {
      PAN: form.value.pan
    };

    this.authService.UpdatePAN(this.UID, newPAN)
      .subscribe((res) => {
        console.log('Service success');
        this.showPANForm = !this.showPANForm;
        this.GetProfile(this.UID);
        this.messageService.showSuccess("PAN Updated Successfully", "DONE !!", null);
      },
      (err) => {
        console.log('Service failed' + JSON.stringify(err));
        this.messageService.showError("An error occurred", "ERROR !!", null);
      })
  }
}
