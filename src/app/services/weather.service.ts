import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CityNotFoundError, WeatherData } from '../models/weather.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  getWeather(city: string): Observable<WeatherData> {
    const url = `${this.BASE_URL}?q=${city}&appid=${environment.weatherApiKey}&units=metric`;

    return this.http.get<OWMResponse>(url).pipe(
      map((res) => ({
        temperature: res.main.temp,
        condition: res.weather[0].description,
        windSpeed: res.wind.speed,
        humidity: res.main.humidity,
      })),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) return throwError(() => new CityNotFoundError(city));
        return throwError(() => new Error('Something went wrong'));
      }),
    );
  }
}

interface OWMResponse {
  main: { temp: number; humidity: number };
  weather: [{ description: string }];
  wind: { speed: number };
}
