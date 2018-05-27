import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { SchemeService } from './../../shared/services/scheme.service';
import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import  { Chart } from 'chart.js';
import * as moment from 'moment';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { TransService } from '../../shared/services/trans.service';
import { forEach } from '@angular/router/src/utils/collection';
import { AlltransComponent } from './alltrans/alltrans.component';


export interface TransactionInterface {
  schemeName: string;
  type: string;
  date: Date;
  amt: Number
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @Input() show: boolean;

  chart: AmChart;
  upcomingTransactions: any;
  transactions: any;
  limitedtransactions: any;
  todaysDate: Date;
  public UID: any;
  anoDate: Date;  

  public totalValuation: any = 0;
  public distinctSchemes: string[];

  schemeNameMap  =  new Map();
  distinctSchemetoUnitMap = new Map();
  //todaysCostMap = new Map();
  todaysTotalVal : any = 0;
  chartData? : any;

  public loading = false;

  constructor(
    private schemeServive: SchemeService,
    private amchartsService: AmChartsService,
    private transacService: TransService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {   
    this.GetUid();    
    this.todaysDate = new Date();
  }

  ngAfterViewInit() {
    this.loading = true;
    this.findLimitedAllTransactions();
    this.findUpcomingTransactions();    
    this.findAllTransactions();
    this.loading = false;
  }

  GetUid() {
    let User = JSON.parse(localStorage.getItem('UserDetails'));
    if ( User ) {
      console.log(User);
      console.log(User['uid']);
      this.UID = User['uid'];
    }
  }

  PopulateDistinctSchemeNAV() {
    this.loading = true;
    this.transacService.GetDistinctSchemesFromAllTransactions(this.UID)
    .subscribe(res => {
      
      let result:string = res.json();
              
      this.distinctSchemes = result.toString().split(',');
      
      this.distinctSchemes.forEach(ele => {
        //console.log("ele: "+ele);
        this.schemeServive.GetSchemeNAV(ele)
          .subscribe(res => {
            
            let items = res.json();
            let NAV = items[0]["schemeNAV"];
            
            if(NAV) {
              this.add(this.schemeNameMap, ele, NAV);
            }
            //console.log("ele: "+element+" , NAV: "+NAV);              
          },
          err => {
            console.log("Err : "+err);
          },
          () => {//when complete
            //this.PopulateTodaysTotalValue(ele);
            this.todaysTotalVal += parseFloat((this.schemeNameMap.get(ele) * this.distinctSchemetoUnitMap.get(ele)).toFixed(2));
            //this.add(this.todaysCostMap, ele, this.todaysTotalVal);
          }
        )
      })
      
    })
   this.loading = false;
  }

  // PopulateTodaysTotalValue(ele) {    
  //   this.todaysTotalVal += parseFloat((this.schemeNameMap.get(ele) * this.distinctSchemetoUnitMap.get(ele)).toFixed(2));
    
  // }
 
  findUpcomingTransactions() {
    this.transacService.GetUpcomingTransaction(this.UID)
      .subscribe(res => {
        this.upcomingTransactions = res.json();
        //console.log("upcoming transactions: "+JSON.stringify(this.upcomingTransactions));
      });
  }

  PopulateTodaysTotalUnit() {
    this.transactions
    .forEach(element => {
        this.add(this.distinctSchemetoUnitMap, element.schemeName, element.units_bought);
    })
    this.PopulateDistinctSchemeNAV(); 
  }

  findAllTransactions() {
    this.transacService.GetAllTransactions(this.UID)
      .subscribe(res => {
        this.transactions = res.json();
        //console.log("transactions: "+JSON.stringify(this.transactions));
        this.PopulateTodaysTotalUnit();
      });
  }

  findLimitedAllTransactions() {
    this.transacService.GetLimitedAllTransactions(this.UID)
      .subscribe(res => {
        this.limitedtransactions = res.json();
        //console.log("transactions: "+JSON.stringify(this.transactions));        
      });
  }

  // generateChart() {
  //   console.log("calling chart");
  //   this.chart = this.amchartsService.makeChart( "chartdiv", {
  //     "type": "pie",
  //     "theme": "light",
  //     "dataProvider": [ {
  //       "title": "HDFC Top 200",
  //       "value": 4852
  //     }, {
  //       "title": "DSP Blackrok Tax Saver",
  //       "value": 3200
  //     },
  //     {
  //       "title": "HDFC Mid Cap Opportunities",
  //       "value": 4423
  //     },
  //     {
  //       "title": "HDFC small Cap",
  //       "value": 2879
  //     }
  //     ],
  //     "titleField": "title",
  //     "valueField": "value",
  //     "labelRadius": 5,
    
  //     "radius": "22%",
  //     "innerRadius": "60%",
  //     "labelText": "",
  //     "export": {
  //       "enabled": true
  //     }
  //   } );
  // }

  ngOnDestroy() {
    if (this.chart) {
      this.amchartsService.destroyChart(this.chart);
    }
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

  ShowAllTransaction() {
    let alltrans = this.transactions;
    const dialogRef = this.dialog.open(AlltransComponent, {
      // data: { id: id, categoryName: categoryName, categoryDescription: categoryDescription }
      data: { alltrans }
    });
  }
  
}

