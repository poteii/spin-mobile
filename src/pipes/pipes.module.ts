import { NgModule } from '@angular/core';
import { ThaiDatePipe } from './thai-date/thai-date';
import { TimePipe } from './time/time';
@NgModule({
	declarations: [ThaiDatePipe,
    ThaiDatePipe,
    TimePipe],
	imports: [],
	exports: [ThaiDatePipe,
    ThaiDatePipe,
    TimePipe]
})
export class PipesModule {}
