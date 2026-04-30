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

  it('should map OWM response to WeatherData', () => {
    service.getWeather('London').subscribe((data) => {
      expect(data.temperature).toBe(20);
      expect(data.condition).toBe('clear sky');
      expect(data.windSpeed).toBe(5.1);
      expect(data.humidity).toBe(60);
    });

    http
      .expectOne((r) => r.url.includes('London'))
      .flush({
        main: { temp: 20, humidity: 60 },
        weather: [{ description: 'clear sky' }],
        wind: { speed: 5.1 },
      });
  });

  it('should throw CityNotFoundError on 404', () => {
    service.getWeather('zzzzz').subscribe({
      error: (err) => expect(err instanceof CityNotFoundError).toBe(true),
    });

    http
      .expectOne((r) => r.url.includes('zzzzz'))
      .flush(null, { status: 404, statusText: 'Not Found' });
  });
});
