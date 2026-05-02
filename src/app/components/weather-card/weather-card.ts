import { Component, Input } from '@angular/core';
import { WeatherData } from '../../models/weather.model';

@Component({
  selector: 'app-weather-card',
  imports: [],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})
export class WeatherCard {
  @Input({ required: true }) weather!: WeatherData;
}
