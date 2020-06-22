import { Component, OnInit } from '@angular/core';
import {NgbDateStruct, NgbTimeStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { VehicleDataService } from '../vehicle-data.service';
import { ConfService } from '../conf.service';

@Component({
  selector: 'app-vehicle-schedule',
  templateUrl: './vehicle-schedule.component.html',
  styleUrls: ['./vehicle-schedule.component.css']
})
export class VehicleScheduleComponent implements OnInit {

  date: NgbDateStruct;
  time: NgbTimeStruct;
  seconds: boolean = true;
  vehicleData;
  
  constructor(private calendar: NgbCalendar, private datepipe: DatePipe, private dataService: VehicleDataService) {
    this.date = this.getToday();
    this.time = this.getCurrentTime();
    this.refreshSchedule();
  }

  ngOnInit(): void {
  }

  refreshSchedule(): void {
    let selectedTime : Date = this.getDateTime();
    this.vehicleData = this.dataService.getVehicles(selectedTime);
    console.log(this.vehicleData);
  }

  getToday(): NgbDateStruct{
    return this.calendar.getToday();
  }

  getCurrentTime(): NgbTimeStruct {
    let currentDate = new Date();
    return {
      hour: currentDate.getHours(), 
      minute: currentDate.getMinutes(), 
      second: currentDate.getSeconds()
    };
  }

  getDateTimeString() : string {
    return this.datepipe.transform(this.getDateTime(), 'dd.MM.yyyy hh:mm:ss');
  }

  getDateTime() : Date {
    return new Date(this.date.year, this.date.month-1, this.date.day, this.time.hour, this.time.minute, this.time.second);
  }



}
