import { Component, input } from '@angular/core';
import { WeatherData } from '../../models/weather.model';
import { TemperaturePipe } from '../../pipes/temperature-pipe';
import { WindSpeedPipe } from '../../pipes/wind-speed-pipe';

@Component({
  selector: 'app-weather-card',
  imports: [TemperaturePipe, WindSpeedPipe],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})
export class WeatherCard {
  weather = input.required<WeatherData>();
  unit = input.required<'metric' | 'imperial'>();
}
