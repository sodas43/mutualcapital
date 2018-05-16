import { SchemeService } from './../../shared/services/scheme.service';
import { TransService } from './../../shared/services/trans.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, AfterViewInit {

  transactions: any;
  distinctSchemes: string[];
  schemeNameMap  =  new Map();
  buyCostMap  =  new Map();
  todaysCostMap  =  new Map();
  todaysDate: Date;
  public UID: any;
  totalPurchaseVal : any = 0;
  todaysTotalVal : any = 0;
  todaysTotalDiff : any = 0;

  constructor(
    private transacService: TransService,
    private schemeServive: SchemeService
  ) { }

  ngOnInit() {
    this.GetUid();
    this.todaysDate = new Date();
    
  }
  
  ngAfterViewInit() {     
    this.findAllTransactions();    
  }

  GetUid() {
    let User = JSON.parse(localStorage.getItem('UserDetails'));
    if ( User ) {
      //console.log(User);
      //console.log(User['uid']);
      this.UID = User['uid'];
    }
  }

  PopulateDistinctSchemeNAV() {
    
      this.transacService.GetDistinctSchemesFromAllTransactions(this.UID)
      .subscribe(res => {
        
        let result:string = res.json();
                
        this.distinctSchemes = result.toString().split(',');
        
        this.distinctSchemes.forEach(element => {
          //console.log("element: "+element);
          this.schemeServive.GetSchemeNAV(element)
            .subscribe(res => {
              
              let items = res.json();
              let NAV = items[0]["schemeNAV"];
              
              if(NAV) {
                this.add(this.schemeNameMap, element, NAV);
              }
              //console.log("ele: "+element+" , NAV: "+NAV);              
            },
            err => {
              console.log("Err : "+err);
            },
            () => {//when complete
              this.PopulateTodaysTotalValue(element);
            }
          )
        })           
      })       
  }

  PopulateTodaysTotalValue(ele) {
      console.log(ele);
      console.log("===============================");
      console.log(this.schemeNameMap.get(ele)+" -- "+ this.todaysCostMap.get(ele));
      console.log("Multi : "+(this.schemeNameMap.get(ele) * this.todaysCostMap.get(ele)).toFixed(2));
      this.todaysTotalVal += parseFloat((this.schemeNameMap.get(ele) * this.todaysCostMap.get(ele)).toFixed(2));
      console.log(ele+"=> "+this.todaysTotalVal);
      console.log("===============================");
    //})
    
    //this.todaysTotalDiff = (this.todaysTotalVal - this.totalPurchaseVal).toFixed(2);
  }

  PopulateBuyCost() {
    this.transactions
    .forEach(element => {
        this.add(this.buyCostMap, element.schemeName, element.amt);
    })

    this.buyCostMap.forEach((val: Number, key: string) => {
      this.totalPurchaseVal += val;
      //console.log(key+" --- "+val);
    })
    //this.convertToArray(this.buyCostMap);

  }

  PopulateTodaysTotalUnit() {
    this.transactions
    .forEach(element => {
        this.add(this.todaysCostMap, element.schemeName, element.units_bought);
    })
    this.PopulateDistinctSchemeNAV(); 
  }
  
  findAllTransactions() {
    this.transacService.GetAllTransactions(this.UID)
      .subscribe(res => {
        this.transactions = res.json();
        //console.log("transactions: "+JSON.stringify(this.transactions));
        //this.CalculateTotalValuation();
        this.PopulateBuyCost();
        this.PopulateTodaysTotalUnit();
        
      });
  }
  
  private add(map, key, value) {
    if(map.has(key)) {
		  let amt = map.get(key);
		  amt += value;
      map.set(key, amt);
      //console.log(key+" |---| "+amt);
    }
	  else {
        map.set(key,value);
        //console.log(key+" --- "+value);
    }
    //console.log(key+" --- "+value);
  }
}
