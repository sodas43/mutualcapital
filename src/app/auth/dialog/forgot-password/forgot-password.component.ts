import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastsManager } from 'ng2-toastr/src/toast-manager';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    public toaster: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    this.toaster.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }
  ForgotSubmit(form: NgForm) {
    console.log("In forgotpassword");
    console.log(JSON.stringify(form.value.email));
    let item = {
      email: form.value.email
    }

    this.authService.forgotPassword(item)
          .subscribe(
              (res) => {
                console.log('Service success');
                
                this.dialogRef.close();
                 
              },
              (err) => {
                let errmsg = err.info;                
                this.toaster.error(errmsg, ' SORRY !! ');
                console.log('Service failed' + JSON.stringify(err));                
              }
          );    
  }
}
