import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { CityNotFoundError, WeatherData } from '../../models/weather.model';
import { WeatherCard } from '../../components/weather-card/weather-card';

@Component({
  selector: 'app-result-page',
  imports: [WeatherCard, RouterLink],
  templateUrl: './result-page.html',
  styleUrl: './result-page.css',
})
export class ResultPage {
  weather = signal<WeatherData | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const city = this.route.snapshot.paramMap.get('city');
    this.weatherService.getWeather(city!).subscribe({
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
