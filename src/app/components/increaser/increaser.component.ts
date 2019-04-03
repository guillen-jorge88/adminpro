import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-increaser',
  templateUrl: './increaser.component.html',
  styles: []
})
export class IncreaserComponent implements OnInit {
  @Input('title-increaser') legend: string;
  @Input() percentage: number;

  @Output('updateValue') changeValueEmiter: EventEmitter<number> = new EventEmitter();

  @ViewChild('inputProgress') inputProgress: ElementRef;

  constructor() {
  }

  ngOnInit() {
  }

  changeValue(value: number) {
    this.percentage += value;
    if (this.percentage > 100) {
      this.percentage = 100;
      return;
    }
    if (this.percentage < 0) {
      this.percentage = 0;
      return;
    }
    this.changeValueEmiter.emit(this.percentage);
    this.inputProgress.nativeElement.focus();
  }

  onChanges(newValue: number) {
    // let elemtHtml: any;
    // elemtHtml = document.getElementsByName('percentage')[0];
    // console.log(this.inputProgress);
    if (newValue > 100) {
      this.percentage = 100;
    } else if (newValue < 0) {
      this.percentage = 100;
    } else {
      this.percentage = newValue;
    }
    // elemtHtml.value = this.percentage;
    this.inputProgress.nativeElement.value = this.percentage;
    this.changeValueEmiter.emit(this.percentage);
  }
}
