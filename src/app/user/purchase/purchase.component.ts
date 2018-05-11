import { TransService } from './../../shared/services/trans.service';
import { SchemeService } from './../../shared/services/scheme.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';

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
  constructor(
    private _formBuilder: FormBuilder,
    private schemeService: SchemeService,
    private transService: TransService
  ) { }

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

    
    this.transService.AddLumpsum(newLumpsum)
      .subscribe(
        (res) => {
          console.log('Service success');     
        },
        (err) => {
          console.log('Service failed' + JSON.stringify(err));
        }
      );

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

    this.transService.AddSIP(newSIP)
      .subscribe(
        (res) => {
          console.log('Service success');     
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
