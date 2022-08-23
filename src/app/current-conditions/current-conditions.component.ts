import {Component, OnDestroy, OnInit} from '@angular/core';
import {WeatherService} from "../weather.service";
import {LocationService} from "../location.service";
import {Router} from "@angular/router";
import {log} from 'blue-harvest/dist/action_helpers/logger';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent implements OnInit, OnDestroy {
  // Get store (Subject) from weatherService to be use in the template with an async
  public currentConditionsList = this.weatherService.getCurrentConditions();

  constructor(private weatherService : WeatherService, private locationService : LocationService, private router : Router) {}

  ngOnInit() {
    // Auto refresh system. Possibility to specify the delay (here: 30 seconds as requested)
    this.locationService.startAutoRefreshLocationsCurrentConditions(30000);
  }

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }

  ngOnDestroy() {
    this.locationService.stopAutoRefreshLocationsCurrentConditions();
  }
}
