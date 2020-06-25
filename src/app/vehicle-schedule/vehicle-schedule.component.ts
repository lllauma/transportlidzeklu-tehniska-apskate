import { Component } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { VehicleDataService } from '../vehicle-data.service';
import { ConfService } from '../conf.service';
import { Conf } from '../conf';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-vehicle-schedule',
  templateUrl: './vehicle-schedule.component.html',
  styleUrls: ['./vehicle-schedule.component.css']
})
export class VehicleScheduleComponent {

  private date: NgbDateStruct;
  private time: NgbTimeStruct;
  private seconds: boolean = true;
  private conf: Conf;
  private vehicleData: Vehicle[];
  private vehicleSchedule: object[][] = [];
  
  constructor(private calendar: NgbCalendar, private datepipe: DatePipe, private dataService: VehicleDataService, private confService: ConfService) {
    this.date = this.getToday();
    this.time = this.getCurrentTime();
    this.conf = this.confService.getConf();
    this.refreshSchedule();
  }

  refreshSchedule(): void {
    this.vehicleData = this.dataService.getVehicles(this.getSelectedDateTime());
    this.vehicleSchedule = [];
    this.initializeInspectionLineArray();
    for (let vehicle of this.vehicleData) {
      this.vehicleSchedule[vehicle.numurs-1].push(vehicle);
    }
    // transpose array to simplify html table creation
    this.vehicleSchedule = this.transposeArray(this.vehicleSchedule);
  }

  removeVehicle(vehicle: Vehicle): void {
    if (vehicle != null){
      if (vehicle.s_datums == null) {
        if (window.confirm('Vai izņemt TL ' + vehicle.rn + ' no līnijas?')) {
          this.dataService.removeVehicle(vehicle.id);
          this.refreshSchedule();
        }
      } else {
        window.alert('Transportlīdzekli nevar izņemt - tehniskā apskate ir pabeigta!');
      }
    }
  }

  getDateTimeString() : string {
    return this.datepipe.transform(this.getSelectedDateTime(), 'dd.MM.yyyy hh:mm:ss');
  }

  private getToday(): NgbDateStruct{
    return this.calendar.getToday();
  }

  private getCurrentTime(): NgbTimeStruct {
    let currentDate = new Date();
    return {
      hour: currentDate.getHours(), 
      minute: currentDate.getMinutes(), 
      second: currentDate.getSeconds()
    };
  }

  private getSelectedDateTime() : Date {
    return new Date(this.date.year, this.date.month-1, this.date.day, this.time.hour, this.time.minute, this.time.second);
  }

  private initializeInspectionLineArray() : void {
    for (let i = 0; i < this.conf.InspectionLineCount; i++) {
      this.vehicleSchedule[i] = [];
    }
  }

  private transposeArray(array: object[][]): object[][] {
    // Calculate the width and height of the Array
    let w = array.length || 0;
    var h = array[0] instanceof Array ? array[0].length : 0;

    // In case it is a zero matrix, no transpose routine needed.
    if(h === 0 || w === 0) { return []; }

    let i : number, j : number;
    let transposed: object[][] = [];

    for(i=0; i<h; i++) {
      transposed[i] = [];
      for(j=0; j<w; j++) {
        transposed[i][j] = array[j][i];
      }
    }
    return transposed;
  }

  private inspectionLines(): number[] {
    return [...Array(this.conf.InspectionLineCount).keys()];
  }

  private inspectionLinePlaces(): number[] {
    return [...Array(this.conf.MaxInspectienLineLength).keys()];    
  }

}
