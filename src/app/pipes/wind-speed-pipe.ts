import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'windSpeed',
})
export class WindSpeedPipe implements PipeTransform {
  transform(kmh: number, unit: 'metric' | 'imperial'): string {
    if (unit === 'imperial') {
      return `${(kmh * 0.621371).toFixed(1)} mph`;
    }
    return `${kmh.toFixed(1)} km/h`;
  }
}
