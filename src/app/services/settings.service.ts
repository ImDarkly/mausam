import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _unit = signal<'metric' | 'imperial'>('metric');
  unit = this._unit.asReadonly();
  private _isDarkMode = signal(false);
  isDarkMode = this._isDarkMode.asReadonly();

  toggleUnit(): void {
    this._unit.update((u) => (u === 'metric' ? 'imperial' : 'metric'));
  }

  toggleDarkMode(): void {
    this._isDarkMode.update((v) => !v);
  }
}
