import { Injectable } from '@angular/core';
import { Conf } from './conf';
import * as ConfFile from '../assets/conf.json';

@Injectable({
  providedIn: 'root'
})
export class ConfService {
  private confURL : string = 'assets/conf.json';
  private conf : Conf = {
    dbURL: null,
    InspectionLineCount: null,
    MaxInspectienLineLength: null
  };

  constructor() {
    this.conf.dbURL = ConfFile["dbURL"];
    this.conf.InspectionLineCount = ConfFile["InspectionLineCount"];
    this.conf.MaxInspectienLineLength = ConfFile["MaxInspectienLineLength"];
  }

  getConf() : Conf{
    return this.conf;
  }
}
