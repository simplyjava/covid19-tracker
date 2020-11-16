import { Component, OnInit } from "@angular/core";
import { DataService } from "src/app/services/data.service";
import { observable } from "rxjs";
import { GlobalData } from "src/app/global-data";
import { GoogleChartInterface } from "ng2-google-charts";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  globalDataLst: GlobalData[] = [];

  totalDeath: number = 0;

  totalActiveCases: number = 0;

  totalConfirmedCases: number = 0;

  totalRecoveredCases: number = 0;

  public pieChart: GoogleChartInterface = { chartType: "PieChart" };
  constructor(private dataService: DataService) {
    
  }

  initCharts() {
    let pieChartData = [];
    pieChartData.push(["Country", "Cases"]);
    this.sortGlobalDataLst();
    let sortedArray = this.globalDataLst.slice(0, 10);
    sortedArray.forEach((element) => {
      pieChartData.push([element.country, element.confirmedCases])
    });
   
    this.pieChart = {
      chartType: "PieChart",
      dataTable: pieChartData,
      options:{height :400,width :500}
    };

    console.log(this.pieChart.dataTable);
  }

  private sortGlobalDataLst() {
    this.globalDataLst.sort((a, b) => {
      if (a.confirmedCases > b.confirmedCases) {
        return -1;
      } else if (a.confirmedCases == b.confirmedCases) {
        return 0;
      } else {
        return 1;
      }
    });
  }

  ngOnInit(): void {
    this.dataService.getGlobalData().subscribe({
      next: (data) => {
        this.globalDataLst = data;
        data.forEach((globalDataResp) => {
          if (!Number.isNaN(globalDataResp.confirmedCases)) {
            this.totalDeath += globalDataResp.deaths;
            this.totalActiveCases += globalDataResp.activeCases;
            this.totalConfirmedCases += globalDataResp.confirmedCases;
            this.totalRecoveredCases += globalDataResp.recovered;
          }
        });
       
      
        this.initCharts();
      },
      error: (errorResp) => {
        console.log(errorResp);
      },
    });
    
  }
}
