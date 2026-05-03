import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _unit = signal<'metric' | 'imperial'>('metric');
  unit = this._unit.asReadonly();

  toggle(): void {
    this._unit.update((u) => (u === 'metric' ? 'imperial' : 'metric'));
  }
}
