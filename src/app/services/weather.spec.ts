import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { WeatherService } from './weather.service';
import { CityNotFoundError } from '../models/weather.model';

describe('WeatherService', () => {
  let service: WeatherService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(WeatherService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  // ── getWeather ────────────────────────────────────────────────────────────

  describe('getWeather()', () => {
    it('should map OWM response to WeatherData', () => {
      service.getWeather('London').subscribe((data) => {
        expect(data.temperature).toBe(20);
        expect(data.condition).toBe('clear sky');
        expect(data.windSpeed).toBe(18.36);
        expect(data.humidity).toBe(60);
      });

      http
        .expectOne((r) => r.urlWithParams.includes('London'))
        .flush({
          name: 'London',
          main: { temp: 20, humidity: 60 },
          weather: [{ id: 800, description: 'clear sky' }],
          wind: { speed: 5.1 },
        });
    });

    it('should throw CityNotFoundError on 404', () => {
      service.getWeather('zzzzz').subscribe({
        error: (err) => expect(err instanceof CityNotFoundError).toBe(true),
      });

      http
        .expectOne((r) => r.urlWithParams.includes('zzzzz'))
        .flush(null, { status: 404, statusText: 'Not Found' });
    });
  });

  // ── getWeatherByCoords ────────────────────────────────────────────────────

  describe('getWeatherByCoords()', () => {
    it('should map OWM response to WeatherResult with cityName', () => {
      service.getWeatherByCoords(51.5, -0.1).subscribe((result) => {
        expect(result.cityName).toBe('London');
        expect(result.weatherData.temperature).toBe(18);
        expect(result.weatherData.condition).toBe('partly cloudy');
        expect(result.weatherData.windSpeed).toBeCloseTo(7.2, 1);
        expect(result.weatherData.humidity).toBe(72);
      });

      http
        .expectOne(
          (r) => r.urlWithParams.includes('lat=51.5') && r.urlWithParams.includes('lon=-0.1'),
        )
        .flush({
          name: 'London',
          main: { temp: 18, humidity: 72 },
          weather: [{ id: 801, description: 'partly cloudy' }],
          wind: { speed: 2 },
        });
    });

    it('should set correct illustrationKey from OWM weather id', () => {
      service.getWeatherByCoords(48.8, 2.35).subscribe((result) => {
        expect(result.weatherData.illustrationKey).toBe('rainy');
      });

      http
        .expectOne((r) => r.urlWithParams.includes('lat=48.8'))
        .flush({
          name: 'Paris',
          main: { temp: 12, humidity: 80 },
          weather: [{ id: 500, description: 'light rain' }],
          wind: { speed: 3 },
        });
    });

    it('should convert wind speed from m/s to km/h', () => {
      service.getWeatherByCoords(40.7, -74).subscribe((result) => {
        expect(result.weatherData.windSpeed).toBeCloseTo(36, 0);
      });

      http
        .expectOne((r) => r.urlWithParams.includes('lat=40.7'))
        .flush({
          name: 'New York',
          main: { temp: 22, humidity: 55 },
          weather: [{ id: 800, description: 'clear sky' }],
          wind: { speed: 10 },
        });
    });

    it('should throw CityNotFoundError on 404', () => {
      service.getWeatherByCoords(0, 0).subscribe({
        error: (err) => expect(err instanceof CityNotFoundError).toBe(true),
      });

      http
        .expectOne((r) => r.urlWithParams.includes('lat=0'))
        .flush(null, { status: 404, statusText: 'Not Found' });
    });

    it('should throw a generic Error on non-404 failures', () => {
      service.getWeatherByCoords(51.5, -0.1).subscribe({
        error: (err) => {
          expect(err instanceof CityNotFoundError).toBe(false);
          expect(err.message).toBe('Something went wrong');
        },
      });

      http
        .expectOne((r) => r.urlWithParams.includes('lat=51.5'))
        .flush(null, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
