export interface WeatherData {
  temperature: number;
  condition: string;
  windSpeed: number;
  humidity: number;
  illustrationKey: string;
}

export interface WeatherResult {
  weatherData: WeatherData;
  cityName: string;
}

export class CityNotFoundError extends Error {
  constructor(city: string) {
    super(`City not found: "${city}"`);
    this.name = 'CityNotFoundError';
    Object.setPrototypeOf(this, CityNotFoundError.prototype);
  }
}
