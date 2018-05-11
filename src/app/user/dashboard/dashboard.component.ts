import { SchemeService } from './../../shared/services/scheme.service';
import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import  { Chart } from 'chart.js';
import * as moment from 'moment';

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
export class DashboardComponent implements OnInit {
  chart = [];
  transactions: any[];
  todaysDate: Date;

  anoDate: Date;

  constructor(private schemeServive: SchemeService) { }

  ngOnInit() {
    this.generateChart();
    this.findUpcomingTransactions();
    //this.transactions. = moment(this.transactions.date, 'dd-mmm');
    this.todaysDate = new Date();
    //this.todaysDate.setDate( this.todaysDate.getDate() + 3 );
    this.todaysDate.setMonth(this.todaysDate.getMonth()+1);
    console.log("date : "+this.todaysDate);

  }
  
  findUpcomingTransactions() {
    this.schemeServive.GetAllSchemes()
      .subscribe(res => {
        this.transactions = res.json();
        console.log("transactions: "+this.transactions);
      });
  }

  generateChart() {
    let weatherDates = [];
    let temp_max = '100';
    let temp_min = '0';
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: weatherDates,
        datasets: [
          { 
            data: temp_max,
            backgroundColor: "#3cba9f",
            fill: true
          },
          { 
            data: temp_min,
            backgroundColor: "#ffcc00",
            fill: true
          },
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });
  }
}

