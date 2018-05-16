import { PaymentComponent } from './../payment/payment.component';
import { Router } from '@angular/router';
import { TransService } from './../../shared/services/trans.service';
import { SchemeService } from './../../shared/services/scheme.service';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public schemes=[];
  public NAV ? : any;
  public UID: any;
  minDate = new Date();
  maxDate = new Date(2018, 12, 31);

  constructor(
    private _formBuilder: FormBuilder,
    private schemeService: SchemeService,
    private transService: TransService,
    private router: Router,
    private dialog: MatDialog,
    public toaster: ToastsManager,
    public vcr: ViewContainerRef
  ) { 
    this.toaster.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.GetAllSchemes();
    this.GetUid();

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    //console.log("day : "+day);
    
    let today = new Date();
    const t = today.getDay();
    //console.log("today : "+t);
    // Prevent Saturday, Sunday and today from being selected.
    //return day !== 0 && day !== t && day !== 6;
    return day !== 6; // TESTING PURPOSE
  }

  GetUid() {
    let User = JSON.parse(localStorage.getItem('UserDetails'));
    if ( User ) {
      console.log(User);
      console.log(User['uid']);
      this.UID = User['uid'];
    }
  }
  onLumpsumSubmit(form: NgForm) {
    console.log("LUMP : "+JSON.stringify(form.value));

    let newLumpsum = {
      schemeName : form.value.schemeName,                
      amt        : form.value.amount,
      date_bought: new Date(),
      user_id    : this.UID
    };

    let newTransact = {
      schemeName : form.value.schemeName,                
      amt        : form.value.amount,
      date_bought: new Date(),
      trans_type : "Lumpsum",
      NAV        : this.NAV,
      units_bought: Math.floor(form.value.amount / this.NAV),
      user_id    : this.UID
    };

    //First Do Payment
    const dialogRef = this.dialog.open(PaymentComponent, {
      width: '500px',
      data: newLumpsum      
    });
      

    dialogRef.afterClosed().subscribe(result => {
      //console.log("my result: "+JSON.stringify(result));

      //if(result.msg === "Payment successful") {
        //Payment success. Now add
        this.transService.AddLumpsum(newLumpsum)
          .subscribe(
            (res) => {
              console.log('Lumpsum Service success');
              
              this.transService.AddTransaction(newTransact)
              .subscribe(
                (res) => {
                  console.log('Transaction Service success');
                  this.toaster.success("Your transaction is successful !", "SUCCESS");
                },
                (err) => {
                  console.log('Transaction Service failed' + JSON.stringify(err));
                }
              );
            },
            (err) => {
              console.log('Lumpsum Service failed' + JSON.stringify(err));
            }
          );
        
        
          
      //}
      //console.log("result: "+result);
    })
  }
  onSIPSubmit(form: NgForm) {
    console.log("SIP : "+JSON.stringify(form.value));

    let newSIP = {
      schemeName : form.value.schemeName,                
      amt        : form.value.amount,
      duration   : form.value.duration,
      startdate  : form.value.startDate,
      date_bought: new Date(),
      user_id    : this.UID      
    };

    let newTransact = {
      schemeName : form.value.schemeName,                
      amt        : form.value.amount,
      startdate  : form.value.startDate,
      trans_type : "SIP",      
      user_id    : this.UID
    };

    this.transService.AddSIP(newSIP)
      .subscribe(
        (res) => {
          console.log('SIP Service success');
          
          this.transService.AddUpcomingTransaction(newSIP)
          .subscribe(
            (res) => {
              console.log('SIP Service success');
              this.toaster.success("Your SIP has been activated !", "CONGRATULATIONS !!");
              this.toaster.info("SIP amount will be debited directly from your bank A/C", "ATTENTION");
              
              
            },
            (err) => {
              console.log('Service failed' + JSON.stringify(err));
            }
          );
        },
        (err) => {
          console.log('Service failed' + JSON.stringify(err));
        }
      );


  }
  GetAllSchemes() {
    this.schemeService.GetAllSchemes()
    .subscribe(res => {      
      let items = JSON.parse(JSON.stringify(res.json()));
      
      let n: number = items.length;
      console.log("length : "+items.length);
      while(n--) {
          this.schemes.push(items[n]['schemeName']);   
      }
      //console.log("schemes : "+this.schemes);
    })
  }

  fillSchemeDetails(event) {
    if (event.target.value != "") {
      console.log("fillSchemeDetails fired !! value : "+event.target.value);

      this.schemeService.GetSchemeDetails(event.target.value)
        .subscribe(res => {
          let data = JSON.parse(JSON.stringify(res.json()));
          console.log(data);
          console.log(data[0]['schemeCode']);
          console.log(data[0]['schemeNAV']);

          this.NAV = data[0]['schemeNAV'];
                    
          //console.log(res.json());
        })
    }
  }

}
