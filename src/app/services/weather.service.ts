import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CityNotFoundError, WeatherData, WeatherResult } from '../models/weather.model';
import { ConfigService } from './config.service';

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

    return this._fetch(params).pipe(map((result) => result.weatherData));
  }

  getWeatherByCoords(lat: number, lon: number): Observable<WeatherResult> {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('appid', this.configService.get('weatherApiKey'))
      .set('units', 'metric');

    return this._fetch(params);
  }

  private _fetch(params: HttpParams): Observable<WeatherResult> {
    return this.http.get<OWMResponse>(this.BASE_URL, { params }).pipe(
      map((res) => ({
        weatherData: {
          temperature: res.main.temp,
          condition: res.weather[0].description,
          windSpeed: res.wind.speed * 3.6,
          humidity: res.main.humidity,
          illustrationKey: getIllustrationKey(res.weather[0].id),
        },
        cityName: res.name,
      })),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          const lat = params.get('lat');
          const lon = params.get('lon');
          const identifier = params.get('q') ?? params.get('lat') ?? 'unknown';
          return throwError(() => new CityNotFoundError(identifier));
        }
        return throwError(() => new Error('Something went wrong'));
      }),
    );
  }
}

interface OWMResponse {
  name: string;
  main: { temp: number; humidity: number };
  weather: [{ id: number; description: string }];
  wind: { speed: number };
}

function getIllustrationKey(id: number): string {
  if (id < 300) return 'stormy';
  if (id < 600) return 'rainy';
  if (id < 700) return 'snowy';
  if (id < 800) return 'foggy';
  if (id === 800) return 'sunny';
  return 'cloudy';
}
