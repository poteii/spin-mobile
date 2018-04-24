import { NgModule } from '@angular/core';
import { TimestampComponent } from './timestamp/timestamp';
import { TimetableDayComponent } from './timetable-day/timetable-day';

import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [
		TimestampComponent,
		TimetableDayComponent
	],
	imports: [CommonModule],
	exports: [
		TimestampComponent,
		TimetableDayComponent]
})
export class ComponentsModule { }
