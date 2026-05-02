import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { CityNotFoundError, WeatherData } from '../../models/weather.model';
import { WeatherCard } from '../../components/weather-card/weather-card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-result-page',
  imports: [WeatherCard, RouterLink],
  templateUrl: './result-page.html',
  styleUrl: './result-page.css',
})
export class ResultPage implements OnInit {
  weather = signal<WeatherData | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    const city = this.route.snapshot.paramMap.get('city');
    if (!city) {
      this.error.set('No city specified.');
      this.loading.set(false);
      return;
    }
    this.weatherService
      .getWeather(city)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.weather.set(data);
          this.loading.set(false);
        },
        error: (err) => {
          if (err instanceof CityNotFoundError) {
            this.error.set("We couldn't find that city. Try a different spelling.");
          } else {
            this.error.set('Something went wrong. Please try again.');
          }
          this.loading.set(false);
        },
      });
  }
}
