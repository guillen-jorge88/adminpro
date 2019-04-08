import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: []
})
export class PromisesComponent implements OnInit {

  constructor() {
    
    

    this.counterThree()
          .then(message => console.log(`End: ${message}`))
          .catch(err => console.log(`ERROR: ${err}`));
   }

  ngOnInit() {
  }

  counterThree(): Promise<boolean> {
    return new Promise ((resolve, reject) => {
      let counter = 0
      let interval = setInterval(() => {
        counter += 1;
        console.log(counter);
        if (counter ===3) {
          resolve();
          clearInterval(interval);
        }
      },1000);
    });
  }

}
