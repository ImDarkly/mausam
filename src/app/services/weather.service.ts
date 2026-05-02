import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CityNotFoundError, WeatherData } from '../models/weather.model';
import { ConfigService } from '../core/services/config.service';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  getWeather(city: string): Observable<WeatherData> {
    const params = new HttpParams()
      .set('q', city)
      .set('appid', this.configService.get('weatherApiKey'))
      .set('units', 'metric');

    return this.http.get<OWMResponse>(this.BASE_URL, { params }).pipe(
      map((res) => ({
        temperature: res.main.temp,
        condition: res.weather[0].description,
        windSpeed: res.wind.speed * 3.6,
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
