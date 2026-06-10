import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CityNotFoundError, WeatherResult } from '../models/weather.model';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private http = inject(HttpClient);

  getWeather(city: string): Observable<WeatherResult> {
    return this._fetch({ q: city });
  }

  getWeatherByCoords(lat: number, lon: number): Observable<WeatherResult> {
    return this._fetch({ lat: lat.toString(), lon: lon.toString() });
  }

  private _fetch(paramsObj: { [key: string]: string }): Observable<WeatherResult> {
    return this.http.get<OWMResponse>('/api/weather', { params: paramsObj }).pipe(
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
          const identifier = paramsObj['q'] ?? `${paramsObj['lat']},${paramsObj['lon']}`;
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
