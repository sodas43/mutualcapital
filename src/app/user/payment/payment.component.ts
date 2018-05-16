import { TransService } from './../../shared/services/trans.service';
import { PaymentService } from './../../shared/services/payment.service';
import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from './../../../environments/environment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var Stripe;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  amount: number;
	cardNumber: number;
	expMonth: number;
	expYear: number;
	cvcNumber: number;
	postCode: number;
	cardToken: string;
	userId: number;
	
  constructor(
    private paymentService: PaymentService,
    private transService: TransService,
    public dialogRef: MatDialogRef<PaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public toaster: ToastsManager,
    public vcr: ViewContainerRef
  ) {
    this.toaster.setRootViewContainerRef(vcr);
   }

  ngOnInit() {
    Stripe.setPublishableKey(environment.STRIPE_KEY);
    console.log("amt : "+JSON.stringify(this.data.amt));
    this.amount = this.data.amt;
  }
 

  // validateAmount() {
  // 	let validNumber = Number(this.amount);

  // 	if(!isNaN(validNumber)) {
  // 		this.amount = validNumber;
  // 		return true;
  // 	} else {
  // 		return false;
  // 	}
  // }
  
  submit() {
    //if(this.cardNumber && this.expMonth && this.expYear && this.cvcNumber && this.amount) {
    if(this.cardNumber && this.expMonth && this.expYear && this.cvcNumber) {
  		let isGoodCard: boolean = Stripe.card.validateCardNumber(this.cardNumber);
  		let isGoodExpiry: boolean = Stripe.card.validateExpiry(this.expMonth, this.expYear);
  		let isGoodCVC: boolean = Stripe.card.validateCVC(this.cvcNumber);
  		//let validAmount: boolean = this.validateAmount();

	  	//if(isGoodCard && isGoodExpiry && isGoodCVC && validAmount) {
      if(isGoodCard && isGoodExpiry && isGoodCVC) {

        let cardDetail = {
          number: this.cardNumber,
          exp_month: this.expMonth,
          exp_year: this.expYear,
          cvc: this.cvcNumber
        }

        Stripe.card.createToken(cardDetail, (status, response) => {
          if(response.error) {
            console.log(response.error.message);
          } else {
            // console.log("token creation success : "+response.id);
            this.cardToken = response.id;
            console.log("token creation : "+this.cardToken);

            this.paymentService.submitPayment(this.cardToken, this.amount).subscribe(res => {
              console.log("result : "+JSON.stringify(res));
              if (res.message === "Payment successful") {
                console.log("hiiiiiii");
                this.userId = res.userId;
                this.cardNumber = null;
                this.amount = null;
                this.cvcNumber = null;
                this.expMonth = null;
                this.expYear = null;

                this.toaster.success("Your Payment is successfull !", "CONGRATULATIONS !!");
                //this.dialogRef.close();
                
              }
              // if(res.success) {
              //   alert("success");
              //   //this.adminDisplay = true;
              //   this.userId = res.userId;
              //   this.cardNumber = null;
              //   this.amount = null;
              //   this.cvcNumber = null;
              //   this.expMonth = null;
              //   this.expYear = null;
              // }
            });
          }
        });       
	  	} else {
	  		alert("Invalid detail");
	  	}
  	} else {
  		alert("Please enter all required input fields.")
  	}
  }
}
