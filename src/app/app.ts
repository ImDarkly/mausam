import { Component, DOCUMENT, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from './components/app-header/app-header';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppHeader],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('mausam');
  private document = inject(DOCUMENT);
  private settings = inject(SettingsService);

  constructor() {
    effect(() => {
      this.document.documentElement.classList.toggle('dark', this.settings.isDarkMode());
    });
  }
}
