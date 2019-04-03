import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graphics1',
  templateUrl: './graphics1.component.html',
  styles: []
})
export class Graphics1Component implements OnInit {

  graphics: any = {
    graphic1: {
      labels: ['Con Frijoles', 'Con Natilla', 'Con tocino'],
      data:  [24, 30, 46],
      type: 'doughnut',
      caption: 'El pan se come con'
    },
    graphic2: {
      labels: ['Hombres', 'Mujeres'],
      data:  [4500, 6000],
      type: 'doughnut',
      caption: 'Entrevistados'
    },
    graphic3: {
      labels: ['Si', 'No'],
      data:  [95, 5],
      type: 'doughnut',
      caption: '¿Le dan gases los frijoles?'
    },
    graphic4: {
      labels: ['No', 'Si'],
      data:  [85, 15],
      type: 'doughnut',
      caption: '¿Le importa que le den gases?'
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
