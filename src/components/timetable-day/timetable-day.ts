
import { Component, AfterViewInit } from '@angular/core';
import { WORKINGTIME } from '../../config/properties';


declare var $: any;
@Component({
  selector: 'timetable-day',
  templateUrl: 'timetable-day.html'
})
export class TimetableDayComponent implements AfterViewInit {

  public worktable = WORKINGTIME; // time list
  public enDateStr = '';
  public holidayName = '';

  constructor() {
  }

  ngAfterViewInit(): void {
    this.spinTimestamp();
  }

  spinTimestamp() {
    // this of .ts file
    let self = this;

    // Start jquery func
    $(".timestamp").selectable({
      filter: '.stamp:not(".unavailable")',
      stop: () => {
        let timeList = [];
        let indexList = [];
        const selected = $('.ui-selected')
        let preIndex: number = null;
        for (let element of selected) {
          let index = element.dataset.index;
          let value = element.dataset.value;
          if (preIndex == null) {
            timeList.push(value);
            indexList.push(index);
            preIndex = index;
          } else {
            let prevInd: number = index - 1;
            if (prevInd == preIndex) {
              timeList.push(value);
              indexList.push(index);
              preIndex = index;
            }
          }
        }
        // Get time from slide
        if (timeList.length > 0) {
          let startWorkingTime = '';
          let endWorkingTime = '';

          console.log(timeList[0]);

          if (timeList.length == 1) {
            let starttime = Number(timeList[0])
            let endtime = Number(timeList[0]) + 30
            let min = this.convertTimeString(endtime).substr(2, 1);
            if (min === '6') {
              endtime = endtime + 40;
            }
            startWorkingTime = this.convertTimeString(starttime);
            endWorkingTime = this.convertTimeString(endtime);
          } else {
            let starttime = Number(timeList[0])
            // +70 is => 0630+70=0700
            let endtime = Number(timeList[timeList.length - 1]) + 30
            let min = this.convertTimeString(endtime).substr(2, 1);
            if (min === '6') {
              endtime = endtime + 40;
            }
            startWorkingTime = this.convertTimeString(starttime);
            endWorkingTime = this.convertTimeString(endtime);
          }
          // let modal = new SpinModal();
          // modal.initial('#task-modal', { show: true, backdrop: 'static', keyboard: true })
          // $('#task-modal').on("hidden.bs.modal", function () {
          //   $('.timestamp .ui-selected').removeClass('ui-selected')
          // })
          // Call TS fucntion
          //     self.taskService.updateCurrentTimeTask(this.utilsService.convertEnDateToTh(this.enDateStr), startWorkingTime, endWorkingTime)
        }
      },
    });
  }
  convertTimeString(time) {
    var zero = 4 - time.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + time;
  }
}
