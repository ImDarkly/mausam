import { Component, DOCUMENT, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AppHeader } from './components/app-header/app-header';
import { SettingsService } from './services/settings.service';
import { SearchPage } from './pages/search-page/search-page';
import { filter } from 'rxjs';
import { IpLocationService } from './services/ip-location.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeader, SearchPage],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('mausam');
  private document = inject(DOCUMENT);
  private settings = inject(SettingsService);
  isRootRoute = signal(true);
  private readonly ipLocation = inject(IpLocationService);

  constructor() {
    effect(() => {
      this.document.documentElement.classList.toggle('dark', this.settings.isDarkMode());
    });

    inject(Router)
      .events.pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.isRootRoute.set(e.urlAfterRedirects === '/');
      });

    this.ipLocation.detect();
  }
}
