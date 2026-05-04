import { Component, input } from '@angular/core';
import { WeatherData } from '../../models/weather.model';
import { TemperaturePipe } from '../../pipes/temperature-pipe';
import { WindSpeedPipe } from '../../pipes/wind-speed-pipe';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-weather-card',
  imports: [TemperaturePipe, WindSpeedPipe, MatCardModule, MatDividerModule, MatIconModule],
  templateUrl: './weather-card.html',
  styleUrl: './weather-card.css',
})
export class WeatherCard {
  weather = input.required<WeatherData>();
  unit = input.required<'metric' | 'imperial'>();
}
