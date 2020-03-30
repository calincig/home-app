import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  public title = 'home-app';
  public waterLevel = 0;
  public pumpStarted = false;
  
  constructor(private http: HttpClient) { }
   
  public getArduinoPompa() {
	  this.http.get('http://192.168.0.108:3000/arduino_pompa')
		  .subscribe((data: any) => {
			this.waterLevel = data['waterLevel'];
			this.pumpStarted =  data['pumpStatus'] !== 1;
		  });
  }
}
