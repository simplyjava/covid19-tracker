import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.scss']
})
export class SummaryCardComponent implements OnInit {

    @Input('totalDeath') totalDeath:number;

    @Input('totalActiveCases') totalActiveCases:number;

    @Input('totalConfirmedCases') totalConfirmedCases:number;

    @Input('totalRecoveredCases') totalRecoveredCases: number;
  

  constructor() { }

  ngOnInit(): void {
  }

}
