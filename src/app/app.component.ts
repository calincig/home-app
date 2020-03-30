import { Component } from '@angular/core';
import { PumpService } from './services/pump/pump.service';
import { IPumpStatus } from './interfaces/IPumpStatus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  public title = 'home-app';
  public waterLevel = 0;
  public pumpStarted = false;
  public pump: IPumpStatus;
  public pumpMarius: IPumpStatus;

  constructor(private pumpService: PumpService) { }
   
  public getArduinoPompa() {
	  this.pumpService.getArduinoPompa().then((data: IPumpStatus) => {
  			this.pump = data;
		  });
  }
   
  public getArduinoPompaMarius() {
	  this.pumpService.getArduinoPompaMarius().then((data: IPumpStatus) => {
  			this.pumpMarius = data;
		  });
  }
}
