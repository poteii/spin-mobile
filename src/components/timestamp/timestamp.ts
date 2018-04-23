import { Component } from '@angular/core';

/**
 * Generated class for the TimestampComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'timestamp',
  templateUrl: 'timestamp.html'
})
export class TimestampComponent {

  text: string;

  constructor() {
    console.log('Hello TimestampComponent Component');
    this.text = 'Hello World';
  }

}
