import { Component } from '@angular/core';
import { PumpService } from './services/pump/pump.service';
import { IPumpStatus } from './interfaces/IPumpStatus';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { timer } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  public title = 'home-app';
  public subscribeTimer: any;

  public pump: IPumpStatus = null;

  constructor(private pumpService: PumpService) { }
  
  public ngOnInit() {
    const source = timer(0, 5000);
    const subscribeTimer = source.subscribe(() => this.getArduinoPompa());
  }

  public getArduinoPompa() {
	  this.pumpService.getArduinoPompa().subscribe((data: any) => {
        this.pump = {
          waterLevel: data.waterLevel,
          pumpStarted: data.pumpStarted === 1,
          timeStamp: formatDate(new Date(), 'HH:mm:ss', 'en')
      }
    });
  }
}
