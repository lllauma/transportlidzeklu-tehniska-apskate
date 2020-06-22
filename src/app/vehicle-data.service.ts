import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Vehicle } from './vehicle';
import { ConfService } from './conf.service';
import { Conf } from './conf';

@Injectable({
  providedIn: 'root'
})
export class VehicleDataService {
  conf : Conf;

  constructor(private HttpClient: HttpClient, private confService: ConfService) {
  }

  getVehicles(selectedDateTime : Date) : Vehicle[]{
    let vehicles: Vehicle[] = [];
    this.HttpClient
      .get(this.confService.getConf().dbURL)
      .subscribe(data => {
        for (const vehicle of (data['items'] as any)) {
          if (this.isInInspectionArea(selectedDateTime, this.toDate(vehicle.datums), this.toDate(vehicle.s_datums))){
            vehicles.push(vehicle);
          }
        }
      })

    return vehicles;
  }

  isInInspectionArea(selectedDate : Date, startDate : Date, endDate : Date) : boolean {
    let isInInspectionArea : boolean = false;
    if (startDate <= selectedDate && (selectedDate <= endDate || endDate == null)) {
      isInInspectionArea = true;
    }

    return isInInspectionArea;
  }

  //extracts date from pattern 'YYYY-MM-ddThh:mm:ss' (regex removes leading zeros)
  toDate(dateString : string) : Date{
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
