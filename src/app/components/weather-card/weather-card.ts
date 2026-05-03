import { Component, input, Input } from '@angular/core';
import { WeatherData } from '../../models/weather.model';
import { TemperaturePipe } from '../../pipes/temperature-pipe';

@Component({
  selector: 'app-weather-card',
  imports: [TemperaturePipe],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})
export class WeatherCard {
  weather = input.required<WeatherData>();
  unit = input.required<'metric' | 'imperial'>();
}
