import { PaymentService } from './../../shared/services/payment.service';
import { Router } from '@angular/router';
import { TransService } from './../../shared/services/trans.service';
import { SchemeService } from './../../shared/services/scheme.service';
import { Component, OnInit, ViewContainerRef, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { environment } from '../../../environments/environment';
import { MessageService } from '../../shared/services/message.service';
// import { setTimeout } from 'timers';




@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public schemes=[];
  public NAV ? : any;
  public UID: any;
  minDate = new Date();
  maxDate = new Date(2018, 12, 31);

  public loading = false;
  amount: Number = 0;
  payNow:boolean = false;
  //paymentSuccess:boolean = false;
  public newLumpsum:any;
  public newTransact:any;

  constructor(
    private _formBuilder: FormBuilder,
    private schemeService: SchemeService,
    private transService: TransService,
    private router: Router,
    private dialog: MatDialog,
    //public toaster: ToastsManager,
    //public vcr: ViewContainerRef,
    private cd: ChangeDetectorRef,
    private paymentService: PaymentService,
    private messageService:MessageService
  ) { 
    //this.toaster.setRootViewContainerRef(vcr);
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

  ngAfterViewInit() {
    // this.card = elements.create('card');    
    // this.card.mount(this.cardInfo.nativeElement);

    // this.card.addEventListener('change', this.cardHandler);
  }

  // ngOnDestroy() {
    
  //   this.card.removeEventListener('change', this.cardHandler);
  //   this.card.destroy();
  // }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onPaymentSubmit(form: NgForm) {
    this.loading = true;
    const { token, error } = await Stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
      this.loading = false;
    } else {
      console.log('Success!', token);
      // ...send the token to the your backend to process the charge
      this.loading = true;
      this.paymentService.submitPayment(token.id, this.amount).subscribe(res => {
        this.loading = false;
        console.log("result : "+JSON.stringify(res));
        if (res.message === "Payment successful") {
          console.log("hiiiiiii");
          //this.paymentSuccess = true;
          this.messageService.showSuccess("Your Payment is successfull !", "CONGRATULATIONS !!", null);
          this.AddToTransactionandLumpsum(this.newLumpsum, this.newTransact);
        }        
      },
    (err) => {
      this.loading = false;
      this.messageService.showError("Payemt is not Succesfull. Please try again.", "Payment Cancelled", null);
    });
    }
  }


  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    //console.log("day : "+day);
    
    let today = new Date();
    const t = today.getDay();
    //console.log("today : "+t);
    // Prevent Saturday, Sunday and today from being selected.
    return day !== 0 && day !== t && day !== 6;
    //return day !== 6; // TESTING PURPOSE
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
    
    if (form.value.amount >= 1000) {
      setTimeout(() => {
        this.card = elements.create('card');    
        this.card.mount(this.cardInfo.nativeElement);
    
        this.card.addEventListener('change', this.cardHandler);
      }, 2000);
  
      this.newLumpsum = {
        schemeName : form.value.schemeName,                
        amt        : form.value.amount,
        date_bought: new Date(),
        user_id    : this.UID
      };
  
      this.newTransact = {
        schemeName : form.value.schemeName,                
        amt        : form.value.amount,
        date_bought: new Date(),
        trans_type : "Lumpsum",
        NAV        : this.NAV,
        units_bought: Math.floor(form.value.amount / this.NAV),
        user_id    : this.UID
      };
  
      this.amount = this.newTransact.amt;
      this.payNow = true;
    }
    else {
      this.messageService.showWarning("Minimum amount is 1000.", "PLEASE TRY AGAIN", null);      
    }
    
  }
  
  AddToTransactionandLumpsum(newLumpsum, newTransact) {

      //if(this.paymentSuccess === true) {
        //Payment success. Now add

        this.loading = true;
        this.transService.AddLumpsum(newLumpsum)
          .subscribe(
            (res) => {
              console.log('Lumpsum Service success');
              
              this.transService.AddTransaction(newTransact)
              .subscribe(
                (res) => {
                  this.loading = false;
                  console.log('Transaction Service success');
                  this.messageService.showSuccess("Your transaction is successful !", "SUCCESS", null);
                },
                (err) => {
                  this.loading = false;
                  console.log('Transaction Service failed' + JSON.stringify(err));
                }
              );
            },
            (err) => {
              this.loading = false;
              console.log('Lumpsum Service failed' + JSON.stringify(err));
            }
          );
      
  }
  onSIPSubmit(form: NgForm) {
    console.log("SIP : "+JSON.stringify(form.value));
    this.payNow = false;

    if( form.value.amount >= 500 ) {
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
  
      this.loading = true;
      this.transService.AddSIP(newSIP)
        .subscribe(
          (res) => {
            console.log('SIP Service success');
            
            this.transService.AddUpcomingTransaction(newSIP)
            .subscribe(
              (res) => {
                this.loading = false;
                console.log('SIP Service success');
                this.messageService.showSuccess("Your SIP has been activated !", "CONGRATULATIONS !!", null);
                this.messageService.showInfo("SIP amount will be debited directly from your bank A/C", "ATTENTION", null);
                
                
                
              },
              (err) => {
                this.loading = false;
                console.log('Service failed' + JSON.stringify(err));
              }
            );
          },
          (err) => {
            this.loading = false;
            console.log('Service failed' + JSON.stringify(err));
          }
        );
    }
    else {
      this.messageService.showWarning("Minimum amount is 500.", "PLEASE TRY AGAIN", null);      
    }
    


  }
  GetAllSchemes() {
    this.loading = true;
    this.schemeService.GetAllSchemes()
    .subscribe(res => {      
      
      let items = JSON.parse(JSON.stringify(res.json()));
      
      let n: number = items.length;
      console.log("length : "+items.length);
      while(n--) {
          this.schemes.push(items[n]['schemeName']);   
      }
      this.loading = false;
      //console.log("schemes : "+this.schemes);
    },
  (err) => {
    this.loading = false;
    console.log("Err: "+err);
  })
  }

  fillSchemeDetails(event) {
    if (event.target.value != "") {
      console.log("fillSchemeDetails fired !! value : "+event.target.value);

      this.loading = true;
      this.schemeService.GetSchemeDetails(event.target.value)
        .subscribe(res => {
          let data = JSON.parse(JSON.stringify(res.json()));
          console.log(data);
          console.log(data[0]['schemeCode']);
          console.log(data[0]['schemeNAV']);

          this.NAV = data[0]['schemeNAV'];
          this.loading = false;          
          //console.log(res.json());
        },
      (err) => {
        this.loading = false;
        console.log("Err: "+err);
      })
    }
  }

}
