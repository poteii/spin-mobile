import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TimestampComponent } from './timestamp/timestamp';

import { CommonModule } from '@angular/common';
import { TimetableDayComponent } from './timetable-day/timetable-day';
@NgModule({
	declarations: [
		TimestampComponent, TimetableDayComponent
	],
	imports: [CommonModule],
	exports: [
		TimestampComponent,
		TimetableDayComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
