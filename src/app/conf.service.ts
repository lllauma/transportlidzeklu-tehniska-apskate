import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Conf } from './conf';

@Injectable({
  providedIn: 'root'
})
export class ConfService {
  confURL : string = 'assets/conf.json';
  conf : Conf = {
    dbURL: 'null',
    InspectionLineCount: null,
    MaxInspectienLineLength: null
  };

  constructor(private HttpClient: HttpClient) { 
    this.HttpClient
      .get(this.confURL)
      .subscribe(data => {
        this.conf.dbURL = data['dbURL'];
        this.conf.InspectionLineCount = data['InspectionLineCount'];
        this.conf.MaxInspectienLineLength = data['MaxInspectienLineLength'];
      })

    console.log(this.conf);
  }

  getConf() : Conf{
    return this.conf;
  }


}
