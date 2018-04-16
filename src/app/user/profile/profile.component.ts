import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showPwdForm:boolean = false;
  showphoneForm:boolean = false;
  constructor() { }

  ngOnInit() {
    
  }
  UpdatePassword(form: NgForm) {}
  UpdateMobile(form: NgForm) {}
}
