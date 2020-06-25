import { Injectable } from '@angular/core';
import * as VehicleData from '../assets/db.json';
import { Vehicle } from './vehicle';
import { ConfService } from './conf.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleDataService {
  vehicleData: Vehicle[] = [];

  constructor( private confService: ConfService) {
    this.vehicleData = VehicleData['items'];
  }

  removeVehicle(vehicleID: number) {
    let removeIndex = this.vehicleData.map(function(item){return item.id;}).indexOf(vehicleID);
    this.vehicleData.splice(removeIndex, 1);
  }

  getVehicles(selectedDateTime : Date) : Vehicle[]{
    let vehicles: Vehicle[] = [];
    for (const vehicle of this.vehicleData) {
      if (this.isInInspectionArea(selectedDateTime, this.toDate(vehicle.datums), this.toDate(vehicle.s_datums))){
        vehicles.push(vehicle);
      }
    }
    // sort array by vehicle id ascending
    vehicles.sort((a,b) => (a.id > b.id ? 1 : -1));
    return vehicles;
  }

  private isInInspectionArea(selectedDate : Date, startDate : Date, endDate : Date) : boolean {
    let isInInspectionArea : boolean = false;
    if (startDate <= selectedDate && (selectedDate <= endDate || endDate == null)) {
      isInInspectionArea = true;
    }

    return isInInspectionArea;
  }

  //extracts date from pattern 'YYYY-MM-ddThh:mm:ss' (regex removes leading zeros)
  private toDate(dateString : string) : Date{
    let date : Date = null;
    if (dateString != null){
      date = new Date(
        parseInt(dateString.substring(0, 4)),
        parseInt(dateString.substring(5, 7).replace(/^0+/, '')) - 1,
        parseInt(dateString.substring(8, 10).replace(/^0+/, '')),
        parseInt(dateString.substring(11, 13).replace(/^0+/, '')),
        parseInt(dateString.substring(14, 16).replace(/^0+/, '')),
        parseInt(dateString.substring(17).replace(/^0+/, ''))
      );
    }
    return date;
  }
  
}
