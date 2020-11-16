import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalData } from '../global-data';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {


   private globalDataURL  ='https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';
  constructor(private http:HttpClient,private datePipe:DatePipe) { }

  getGlobalData(){
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() -1)
       let formattedDate = this.datePipe.transform(currentDate, 'MM-dd-yyyy');
       console.log(formattedDate);
     return this.http.get(this.globalDataURL+formattedDate+'.csv',{responseType:'text'}).pipe(map(data=>{
      let globalData : GlobalData[] = [];
      let rows = data.split('\n');
      let rawData   ={};
      rows.splice(0,1);
      
      rows.forEach( row=>{
        let cols  = row.split(/,(?=\S)/);
        let  cs= {
          country:cols[3],
          confirmedCases: +cols[7],
          deaths: +cols[8],
          recovered: +cols[9],
          activeCases: +cols[10],
        };
    
        let temp : GlobalData = rawData[cs.country];
        if(temp){
          temp.confirmedCases = cs.confirmedCases + temp.confirmedCases;
          temp.deaths = cs.deaths + temp.deaths;
          temp.recovered = cs.recovered + temp.recovered;
          temp.activeCases = cs.activeCases + temp.activeCases;
          rawData[cs.country] =temp;
        }else{
          rawData[cs.country] =cs;
        }
     
      }
       
      );
      

      return <GlobalData[]>Object.values(rawData);

     }))
  }
}
