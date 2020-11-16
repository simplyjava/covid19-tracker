import { Component, OnInit } from '@angular/core';
import { GlobalData } from 'src/app/global-data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  countryData : GlobalData;
  globalDataLst : GlobalData[] =[];
  countries : String[]=[];
constructor(private dataService:DataService) { }

ngOnInit(): void {
  this.dataService.getGlobalData().subscribe(
{
  next : (data)=>{   
          this.globalDataLst=data;
          this.countryData = data[0];
          data.forEach(globalDataResp=>{
             this.countries.push(globalDataResp.country);
          })

      },
  error : (errorResp)=>{ console.log(errorResp);}

}
    

  );}

  onChangeCountry(countryName : string){
    this.globalDataLst.forEach(element => {
         if(element.country==countryName){
           this.countryData  = element;
           console.log(this.countryData );  
         }

    });
     
  }

}
