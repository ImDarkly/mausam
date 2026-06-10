import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _unit = signal<'metric' | 'imperial'>('metric');
  unit = this._unit.asReadonly();
  private _isDarkMode = signal(false);
  isDarkMode = this._isDarkMode.asReadonly();

  setUnit(unit: 'metric' | 'imperial'): void {
    this._unit.set(unit);
  }

  toggleDarkMode(): void {
    this._isDarkMode.update((v) => !v);
  }
}
