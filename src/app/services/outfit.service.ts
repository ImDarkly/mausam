import { Injectable } from '@angular/core';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root',
})
export class OutfitService {
  getRecommendations(weather: WeatherData): string[] {
    const items = [
      ...this.getBaseItems(weather.temperature),
      ...this.getRainItems(weather.condition),
      ...this.getSnowItems(weather.condition),
      ...this.getWindItems(weather.windSpeed),
    ];
    return Array.from(new Set(items));
  }

  private getBaseItems(temp: number): string[] {
    if (temp < 0) return ['heavy coat', 'thermal layers', 'gloves', 'hat'];
    if (temp < 10) return ['winter coat', 'scarf', 'warm shoes'];
    if (temp < 18) return ['light jacket', 'hoodie', 'jeans'];
    if (temp < 25) return ['t-shirt', 'light trousers'];
    return ['shorts', 't-shirt', 'sunglasses'];
  }

  private getRainItems(condition: string): string[] {
    return condition.toLowerCase().includes('rain') ? ['umbrella', 'raincoat'] : [];
  }

  private getSnowItems(condition: string): string[] {
    return condition.toLowerCase().includes('snow') ? ['boots', 'gloves'] : [];
  }

  private getWindItems(windSpeed: number): string[] {
    return windSpeed > 30 ? ['windbreaker'] : [];
  }
}
