import { Component, OnInit, Input } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-graphic',
  templateUrl: './doughnut-graphic.component.html',
  styles: []
})
export class DoughnutGraphicComponent implements OnInit {
  @Input('chartLabels') doughnutChartLabels: Label[] = [];
  @Input('chartData') doughnutChartData: number[] = [];
  @Input('chartType') doughnutChartType: ChartType;
  constructor() { }

  ngOnInit() {
  }

}
