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
  public currentConditionsList = this.weatherService.getCurrentConditions();

  constructor(private weatherService : WeatherService, private locationService : LocationService, private router : Router) {}

  ngOnInit() {
    this.locationService.startAutoRefreshLocationsCurrentConditions();
    // this.currentConditionsList.subscribe(
    //     value => console.log("currentConditionsList = ", value)
    // )
  }

  showForecast(zipcode : string){
    this.router.navigate(['/forecast', zipcode])
  }

  ngOnDestroy() {
    this.locationService.stopAutoRefreshLocationsCurrentConditions();
  }
}
