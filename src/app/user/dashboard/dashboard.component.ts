import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { SchemeService } from './../../shared/services/scheme.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import  { Chart } from 'chart.js';
import * as moment from 'moment';
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { TransService } from '../../shared/services/trans.service';
import { forEach } from '@angular/router/src/utils/collection';


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

  constructor(
    private schemeServive: SchemeService,
    private amchartsService: AmChartsService,
    private transacService: TransService
  ) { }

  ngOnInit() {   
    this.GetUid();
    //this.transactions. = moment(this.transactions.date, 'dd-mmm');
    this.todaysDate = new Date();
    this.PopulateDistinctSchemeNAV();
    
    //this.todaysDate.setDate( this.todaysDate.getDate() + 3 );
    //this.todaysDate.setMonth(this.todaysDate.getMonth()+1);
    //console.log("date : "+this.todaysDate);

  }

  ngAfterViewInit() {
    this.findLimitedAllTransactions();
    
    this.findUpcomingTransactions();
    this.generateChart();
    this.findAllTransactions();
    
  }
  
  GetUid() {
    let User = JSON.parse(localStorage.getItem('UserDetails'));
    if ( User ) {
      console.log(User);
      console.log(User['uid']);
      this.UID = User['uid'];
    }
  }

    onClick() {
      this.CalculateTotalValuation();
    }
  PopulateDistinctSchemeNAV() {
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
            
            console.log("ele: "+ele+" , NAV: "+NAV);
            this.schemeNameMap.set(ele, NAV);
            console.log("da : "+this.schemeNameMap.get(ele));
        })
      })
      
    })
   
  }
  CalculateTotalValuation() {
    //console.log("here:"+JSON.stringify(this.transactions));
    
    // this.transacService.GetDistinctSchemesFromAllTransactions(this.UID)
    //   .subscribe(res => {
        
    //     let result:string = res.json();
                
    //     this.distinctSchemes = result.toString().split(',');
        
    //     this.distinctSchemes.forEach(ele => {
    //       //console.log("ele: "+ele);
    //       this.schemeServive.GetSchemeNAV(ele)
    //         .subscribe(res => {
              
    //           let items = res.json();
    //           let NAV = items[0]["schemeNAV"];
              
    //           //console.log("ele: "+ele+" , NAV: "+NAV);
    //           this.schemeNameMap.set(ele, NAV);
    //           console.log("da : "+this.schemeNameMap.get(ele));
    //       })
    //     })

    
        this.schemeNameMap.forEach((val: Number, key: string) => {
          console.log(key+" --- "+val);
        })
        
        if(this.schemeNameMap.size != 0) {
          this.transactions
          .forEach(element => {
            let scheme_NAV = this.schemeNameMap.get(element.schemeName);
            console.log("trans : "+scheme_NAV);
            //console.log("scheme : "+element.schemeName+" NAV : "+element.NAV+" Units : "+element.units_bought);
            this.totalValuation += (element.units_bought * scheme_NAV);
          });
          this.totalValuation = (this.totalValuation).toFixed(2);
        
          console.log("VALUATION: "+this.totalValuation);        
        }
        
      //});
  }

  
  
  findUpcomingTransactions() {
    this.transacService.GetUpcomingTransaction(this.UID)
      .subscribe(res => {
        this.upcomingTransactions = res.json();
        //console.log("upcoming transactions: "+JSON.stringify(this.upcomingTransactions));
      });
  }

  findAllTransactions() {
    this.transacService.GetAllTransactions(this.UID)
      .subscribe(res => {
        this.transactions = res.json();
        //console.log("transactions: "+JSON.stringify(this.transactions));
        //this.CalculateTotalValuation();
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
  //   let weatherDates = [];
  //   let temp_max = '100';
  //   let temp_min = '0';
  //   this.chart = new Chart('canvas', {
  //     type: 'doughnut',
  //     data: {
  //       labels: weatherDates,
  //       datasets: [
  //         { 
  //           data: temp_max,
  //           backgroundColor: "#3cba9f",
  //           fill: true
  //         },
  //         { 
  //           data: temp_min,
  //           backgroundColor: "#ffcc00",
  //           fill: true
  //         },
  //       ]
  //     },
  //     options: {
  //       legend: {
  //         display: true
  //       },
  //       scales: {
  //         xAxes: [{
  //           display: false
  //         }],
  //         yAxes: [{
  //           display: false
  //         }],
  //       }
  //     }
  //   });
  // }
  generateChart() {
    console.log("calling chart");
    this.chart = this.amchartsService.makeChart( "chartdiv", {
      "type": "pie",
      "theme": "light",
      "dataProvider": [ {
        "title": "HDFC Top 200",
        "value": 4852
      }, {
        "title": "DSP Blackrok Tax Saver",
        "value": 3200
      },
      {
        "title": "HDFC Mid Cap Opportunities",
        "value": 4423
      },
      {
        "title": "HDFC small Cap",
        "value": 2879
      }
      ],
      "titleField": "title",
      "valueField": "value",
      "labelRadius": 5,
    
      "radius": "22%",
      "innerRadius": "60%",
      "labelText": "",
      "export": {
        "enabled": true
      }
    } );
  }

  ngOnDestroy() {
    if (this.chart) {
      this.amchartsService.destroyChart(this.chart);
    }
  }
  
}

