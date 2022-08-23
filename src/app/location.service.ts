import { Injectable } from '@angular/core';
import {WeatherService} from "./weather.service";
import {Observable, pipe, Subscriber, Subscription, timer} from 'rxjs';

export const LOCATIONS : string = "locations";

@Injectable()
export class LocationService {

  locations : string[] = [];
  private refreshTimer: Subscription;

  constructor(private weatherService : WeatherService) {}

  // Start auto refresh of locations current conditions
  startAutoRefreshLocationsCurrentConditions(delay: number) {
    this.refreshTimer = timer(1, delay).subscribe(
        pipe(() => {
          this.loadLocationsCurrentConditions();
        })
    )
  }

  // Load current conditions
  loadLocationsCurrentConditions() {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations = JSON.parse(locString);
    for (let loc of this.locations)
      this.weatherService.addCurrentConditions(loc);
  }

  addLocation(zipcode : string){
    this.locations.push(zipcode);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.addCurrentConditions(zipcode);
  }

  removeLocation(zipcode : string){
    let index = this.locations.indexOf(zipcode);
    if (index !== -1){
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(zipcode);
    }
  }

  // Stop auto refresh system
  stopAutoRefreshLocationsCurrentConditions() {
    this.refreshTimer.unsubscribe();
  }
}
