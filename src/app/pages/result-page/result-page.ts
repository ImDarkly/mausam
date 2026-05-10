import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WeatherService } from '../../services/weather.service';
import { CityNotFoundError, WeatherData } from '../../models/weather.model';
import { WeatherCard } from '../../components/weather-card/weather-card';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OutfitCard } from '../../components/outfit-card/outfit-card';
import { OutfitService } from '../../services/outfit.service';
import { RecentSearchesService } from '../../services/recent-searches.service';
import { SettingsService } from '../../services/settings.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-result-page',
  imports: [
    WeatherCard,
    RouterLink,
    OutfitCard,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatIcon,
    MatButtonModule,
  ],
  templateUrl: './result-page.html',
  styleUrl: './result-page.css',
})
export class ResultPage implements OnInit {
  weather = signal<WeatherData | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  settingsService = inject(SettingsService);
  private readonly route = inject(ActivatedRoute);
  private readonly weatherService = inject(WeatherService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly outfitService = inject(OutfitService);
  private readonly recentSearchesService = inject(RecentSearchesService);
  unit = this.settingsService.unit;

  outfit = computed(() => {
    const w = this.weather();
    return w ? this.outfitService.getRecommendations(w) : [];
  });

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const city = params.get('city');

      if (!city) {
        this.error.set('No city specified.');
        this.loading.set(false);
        return;
      }

      this.loading.set(true);
      this.error.set(null);
      this.weather.set(null);

      this.weatherService
        .getWeather(city)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (data) => {
            this.weather.set(data);
            try {
              this.recentSearchesService.add(city);
            } catch {
            } finally {
              this.loading.set(false);
            }
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
    });
  }
}
