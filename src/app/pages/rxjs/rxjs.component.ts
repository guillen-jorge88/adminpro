import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy{

  subscription: Subscription;
  constructor() {
    this.subscription = this.returnObservable()
        .pipe(
          retry(2)
        )
        .subscribe(
          value => console.log(`Subs: ${value}`),
          err => console.log(`Observable error: ${err}`),
          () => console.log('End observable!'));
  }

  ngOnInit() {}

  ngOnDestroy() {
    console.log('chao !!!');    
    this.subscription.unsubscribe();
  }

  returnObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let counter = 0
      let interval = setInterval(() => {
        counter += 1;

        let output = {
          number: counter
        }

        observer.next(output);

        /* if(counter === 3){
          clearInterval(interval);
          observer.complete();
        } */

      },1000)
    }).pipe(
      map(resp => resp.number),
      filter((value,index) =>{
        if((value % 2) === 1 ) {
          //impar
          return true;
        }else {
          //par
          return false
        }
        
      })
    );
  }

}
