import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPumpStatus } from '../../interfaces/IPumpStatus';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PumpService {
  constructor(private http: HttpClient) { }
     
  public getArduinoPompa(): Promise<IPumpStatus> {
    return this.http.get<IPumpStatus>('http://192.168.0.108:3000/arduino_pompa').toPromise().then(
      (data:IPumpStatus) => {
        return data;
      },
      (errorReason: any) => {
        console.log(errorReason);
        return null;
      }
    );
  }
   
  public getArduinoPompaMarius() {
    return this.http.get<IPumpStatus>('http://192.168.0.108:3000/arduino_pompa_marius').toPromise().then(
      (data:IPumpStatus) => {
        return data;
      },
      (errorReason: any) => {
        console.log(errorReason);
        return null;
      }
    );
  }
}
